const request = require('supertest');
const mongoose = require('mongoose');

// ACTION: Point to Test DB before loading server to prevent wiping dev DB
process.env.MONGODB_URI = 'mongodb://localhost:27017/modulehub_test';

const app = require('../server');
const User = require('../models/User');
const Company = require('../models/Company');

describe('Auth API', () => {
    beforeAll(async () => {
        // Connect to a test database or use existing (be careful with existing)
        // ideally use process.env.MONGODB_URI_TEST
        // For now, we will assume the environment is set up or we mock. 
        // But integration tests usually need real DB. 
        // We will connect if not connected
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/modulehub_test'); // Use separate DB for tests
        }
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        // CLEANUP: Reset DB state
        await User.deleteMany({});
        await Company.deleteMany({});
    });

    describe('POST /api/auth/register', () => {
        it('should register a new company correctly', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    accountType: 'company',
                    companyName: 'Test Corp',
                    email: 'admin@testcorp.com',
                    password: 'password123',
                    domain: 'testcorp.com'
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
            expect(res.body.user).toHaveProperty('role', 'admin');
            expect(res.body.user).toHaveProperty('companyId');

            // Verify DB
            const company = await Company.findOne({ companyEmail: 'admin@testcorp.com' });
            expect(company).toBeTruthy();
            expect(company.members).toHaveLength(1); // The admin
            expect(company.companyCode).toMatch(/^CMP-/);
        });

        it('should auto-generate domain if missing in company registration', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    accountType: 'company',
                    companyName: 'AutoDomain Inc',
                    email: 'admin@autodomain.com',
                    password: 'password123'
                    // domain missing
                });

            expect(res.statusCode).toEqual(200);
            const company = await Company.findOne({ companyEmail: 'admin@autodomain.com' });
            expect(company.domain).toBe('autodomain.com');
        });

        it('should fail if user already exists', async () => {
            // Register once
            await request(app).post('/api/auth/register').send({
                accountType: 'company',
                companyName: 'Duplicate Corp',
                email: 'dup@corp.com',
                password: 'pass'
            });

            // Register again
            const res = await request(app).post('/api/auth/register').send({
                accountType: 'company',
                companyName: 'Duplicate Corp 2',
                email: 'dup@corp.com', // Duplicate email
                password: 'pass'
            });

            expect(res.statusCode).toEqual(400);
            expect(res.body.msg).toMatch(/User already exists/);
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login valid user', async () => {
            // Setup
            await request(app)
                .post('/api/auth/register')
                .send({
                    accountType: 'company',
                    companyName: 'Login Corp',
                    email: 'login@corp.com',
                    password: 'password123'
                });

            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'login@corp.com',
                    password: 'password123'
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
        });
    });
});
