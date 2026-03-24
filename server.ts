import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory store for resumes (simulating a database)
  const resumes: Record<string, any> = {};

  // --- API Routes ---

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Save resume
  app.post('/api/resumes', (req, res) => {
    const { id, data } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    resumes[id] = { ...data, updatedAt: new Date().toISOString() };
    res.json({ success: true, id });
  });

  // Get resume
  app.get('/api/resumes/:id', (req, res) => {
    const { id } = req.params;
    const resume = resumes[id];
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.json(resume);
  });

  // AI Suggestions Route
  app.post('/api/ai/suggest', async (req, res) => {
    try {
      const { type, content, context } = req.body;
      
      let prompt = '';
      if (type === 'bullet_point') {
        prompt = `Improve the following resume bullet point to make it more professional, action-oriented, and impactful. Use strong action verbs and quantify results if possible. Return ONLY the improved bullet point text, nothing else.\n\nOriginal: ${content}\nContext (Role/Industry): ${context || 'General'}`;
      } else if (type === 'summary') {
        prompt = `Write a professional resume summary (3-4 sentences) based on the following details. Make it compelling and highlight key strengths. Return ONLY the summary text.\n\nDetails: ${content}`;
      } else if (type === 'grammar') {
        prompt = `Correct any grammar or spelling errors in the following text and make it sound more professional. Return ONLY the corrected text.\n\nText: ${content}`;
      } else if (type === 'skills') {
        prompt = `Suggest 5-8 relevant professional skills (hard and soft) based on the following job title or industry. Return them as a comma-separated list.\n\nRole/Industry: ${content}`;
      } else {
        return res.status(400).json({ error: 'Invalid suggestion type' });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-preview',
        contents: prompt,
      });

      res.json({ suggestion: response.text?.trim() });
    } catch (error) {
      console.error('AI Error:', error);
      res.status(500).json({ error: 'Failed to generate suggestion' });
    }
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
