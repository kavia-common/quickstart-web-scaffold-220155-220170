const express = require('express');
const healthController = require('../controllers/health');

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint
 *     description: Basic service health check used by monitoring and quickstart setup.
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/', healthController.check.bind(healthController));

/**
 * @swagger
 * /api/retro:
 *   get:
 *     summary: Retro-themed example payload
 *     description: Returns a small JSON payload that the Next.js frontend displays in a retro UI card.
 *     tags: [Example]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *           example: Ada
 *         description: Optional name to personalize the message.
 *     responses:
 *       200:
 *         description: A retro payload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Greetings, Ada. Your modem handshake is immaculate.
 *                 accent:
 *                   type: string
 *                   example: "#3b82f6"
 *                 success:
 *                   type: boolean
 *                   example: true
 */
router.get('/api/retro', (req, res) => {
  const name = typeof req.query.name === 'string' ? req.query.name.trim() : '';
  const who = name.length > 0 ? name : 'traveler';

  res.json({
    message: `Greetings, ${who}. Your modem handshake is immaculate.`,
    accent: '#3b82f6',
    success: true,
  });
});

/**
 * @swagger
 * /api/time:
 *   get:
 *     summary: Server time
 *     description: Returns the server time as ISO string; used by the frontend to demonstrate live data refresh.
 *     tags: [Example]
 *     responses:
 *       200:
 *         description: Current server time
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 now:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-02-16T00:00:00.000Z"
 */
router.get('/api/time', (req, res) => {
  res.json({ now: new Date().toISOString() });
});

module.exports = router;
