import express, { Router, Request, Response } from 'express';
import path from 'node:path';

const router = Router();

// Serve static files from client/dist in production
if (process.env.NODE_ENV === 'production') {
  // Use process.cwd() to get project root, then navigate to client/dist
  const clientDistPath = path.join(process.cwd(), 'client', 'dist');
  
  router.use(express.static(clientDistPath));

  // SPA fallback: serve index.html for all non-API routes
  // Express 5 / path-to-regexp requires a named wildcard (e.g. *path), not bare *
  router.get('*path', (req: Request, res: Response) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith('/api')) {
      res.status(404).json({
        success: false,
        message: 'API route not found',
      });
      return;
    }

    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

export default router;
