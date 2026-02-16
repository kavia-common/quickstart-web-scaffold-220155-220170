const request = require('supertest');

const app = require('../app');

describe('backend_api endpoints', () => {
    test('GET / responds with service health payload', async () => {
        const res = await request(app).get('/');

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/application\/json/);

        // Contract assertions (shape + a couple stable values)
        expect(res.body).toEqual(
            expect.objectContaining({
                status: 'ok',
                message: 'Service is healthy',
                environment: expect.any(String),
                timestamp: expect.any(String),
            })
        );

        // Ensure timestamp is ISO-parseable
        expect(Number.isNaN(Date.parse(res.body.timestamp))).toBe(false);
    });

    test('GET /api/retro uses default name when query param missing', async () => {
        const res = await request(app).get('/api/retro');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            message: 'Greetings, traveler. Your modem handshake is immaculate.',
            accent: '#3b82f6',
            success: true,
        });
    });

    test('GET /api/retro trims and uses provided name', async () => {
        const res = await request(app).get('/api/retro').query({ name: '  Ada  ' });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            message: 'Greetings, Ada. Your modem handshake is immaculate.',
            accent: '#3b82f6',
            success: true,
        });
    });

    test('GET /api/time responds with current server time in ISO format', async () => {
        const res = await request(app).get('/api/time');

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/application\/json/);

        expect(res.body).toEqual({
            now: expect.any(String),
        });

        // Ensure now is ISO-parseable
        expect(Number.isNaN(Date.parse(res.body.now))).toBe(false);
    });
});
