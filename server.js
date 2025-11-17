// CONTEXT7 SOURCE: /payloadcms/payload - Express server for Payload CMS standalone deployment
// ARCHITECTURE REASON: Railway requires explicit Express server, not Next.js API routes

const express = require('express');
const payload = require('payload');
const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '.env.local'),
});

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy (required for Railway)
app.set('trust proxy', true);

// Redirect root to admin panel
app.get('/', (req, res) => {
  res.redirect('/admin/cms');
});

// Health check endpoint for Railway
app.get('/api/health', async (req, res) => {
  try {
    // Check Payload initialisation
    const collections = Object.keys(payload.collections || {});

    // Check database connection
    const dbConnected = payload.db?.connection?.readyState === 1;

    const health = {
      status: dbConnected ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      database: dbConnected ? 'connected' : 'disconnected',
      collections: collections.length,
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      },
    };

    res.status(dbConnected ? 200 : 503).json(health);
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Metrics endpoint for monitoring (optional)
app.get('/api/metrics', async (req, res) => {
  try {
    const metrics = {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage(),
      environment: process.env.NODE_ENV,
    };

    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const start = async () => {
  console.log('🚀 Starting Payload CMS server...');

  // Initialise Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      payload.logger.info(`Payload API URL: ${process.env.PAYLOAD_PUBLIC_SERVER_URL || `http://localhost:${PORT}`}`);
    },
  });

  // Start Express server
  app.listen(PORT, async () => {
    payload.logger.info(`✅ Server listening on port ${PORT}`);
    payload.logger.info(`📍 Admin panel: http://localhost:${PORT}/admin/cms`);
    payload.logger.info(`🔍 Health check: http://localhost:${PORT}/api/health`);
    payload.logger.info(`📊 Metrics: http://localhost:${PORT}/api/metrics`);
  });

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    payload.logger.info('SIGTERM received, closing server...');
    await payload.db.disconnect();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    payload.logger.info('SIGINT received, closing server...');
    await payload.db.disconnect();
    process.exit(0);
  });
};

start().catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});
