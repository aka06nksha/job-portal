import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Configuration
const ADZUNA_APP_ID = 'cb0cca60';
const ADZUNA_APP_KEY = 'dcc7279638a2473e82b4312ddb0cf0a7';
const JWT_SECRET = 'your-very-secure-secret-key'; // In production, use environment variables
const USERS_FILE = path.join(__dirname, 'users.json');
const APPLICATIONS_FILE = path.join(__dirname, 'applications.json');

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app
const frontendPath = path.join(__dirname, 'frontend', 'dist');
app.use(express.static(frontendPath));

// Helper to read/write JSON files
const readJSON = async (file) => {
  try {
    const data = await fs.readFile(file, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const writeJSON = async (file, data) => {
  await fs.writeFile(file, JSON.stringify(data, null, 2));
};

// Initialize files if they don't exist
const initFiles = async () => {
  try {
    await fs.access(USERS_FILE);
  } catch {
    await writeJSON(USERS_FILE, []);
  }
  try {
    await fs.access(APPLICATIONS_FILE);
  } catch {
    await writeJSON(APPLICATIONS_FILE, []);
  }
};
initFiles();

// API Endpoints

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Root route
app.get('/', (req, res) => {
  res.send('Job Portal Backend is running. Please use the frontend at http://localhost:5173');
});

// Health check for deployment platforms
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// 1. Job Search (Adzuna)
app.get('/api/jobs/search', async (req, res) => {
  try {
    const { keyword = 'developer', location = 'india', experience = '' } = req.query;
    
    // Map experience levels to keywords
    let expKeywords = '';
    if (experience === 'freshers') expKeywords = ' junior graduate entry-level 0-2 years';
    else if (experience === 'intermediate') expKeywords = ' intermediate mid-level 3-5 years';
    else if (experience === 'senior') expKeywords = ' senior lead manager 5+ years';

    const fullKeyword = `${keyword}${expKeywords}`;
    const url = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&results_per_page=12&what=${encodeURIComponent(fullKeyword)}&where=${encodeURIComponent(location)}&content-type=application/json`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (!data.results) {
      return res.json([]);
    }

    const jobs = data.results.map(job => ({
      id: job.id,
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      salary: job.salary_min ? `₹${job.salary_min} - ₹${job.salary_max}` : 'Not Specified',
      description: job.description,
      url: job.redirect_url,
      created: job.created
    }));

    res.json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// 2. User Registration
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  const users = await readJSON(USERS_FILE);

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { name, email, password: hashedPassword };
  users.push(newUser);
  await writeJSON(USERS_FILE, users);

  const token = jwt.sign({ email: newUser.email, name: newUser.name }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ success: true, token, user: { name: newUser.name, email: newUser.email } });
});

// 3. User Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const users = await readJSON(USERS_FILE);

  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ success: true, token, user: { name: user.name, email: user.email } });
});

// 4. Submit Application
app.post('/api/applications', authenticateToken, async (req, res) => {
  const { jobTitle, company } = req.body;
  const { email } = req.user;
  const applications = await readJSON(APPLICATIONS_FILE);

  const newApp = { 
    id: Date.now().toString(),
    email, 
    jobTitle, 
    company, 
    status: 'Applied',
    appliedAt: new Date().toISOString() 
  };
  
  applications.push(newApp);
  await writeJSON(APPLICATIONS_FILE, applications);

  res.json({ success: true, application: newApp });
});

// 5. Get My Applications
app.get('/api/applications/my', authenticateToken, async (req, res) => {
  const { email } = req.user;
  const applications = await readJSON(APPLICATIONS_FILE);

  const userApps = applications.filter(app => app.email === email);
  res.json(userApps);
});

// Catch-all route to serve the frontend index.html for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
