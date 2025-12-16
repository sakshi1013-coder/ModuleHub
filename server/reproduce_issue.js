const mongoose = require('mongoose');
const User = require('./models/User');
const Company = require('./models/Company');
const Package = require('./models/Package');
const request = require('supertest');
const { app } = require('./server'); // Ensure server.js exports app
require('dotenv').config();

const runTest = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('DB Connected');

        // Cleanup
        const testEmail = 'debug_company@test.com';
        await User.deleteMany({ email: testEmail });
        await Company.deleteMany({ companyEmail: testEmail });
        await Package.deleteMany({ name: 'DebugPackage' });

        // 1. Register Company
        console.log('Attempting Register...');
        const regRes = await request(app).post('/api/auth/register').send({
            accountType: 'company',
            username: 'debugadmin',
            email: testEmail,
            password: 'password123',
            companyName: 'Debug Corp'
        });

        if (regRes.status !== 200) {
            console.error('Register Failed:', regRes.body);
            return;
        }
        console.log('Register Success:', regRes.body.user.email);
        const token = regRes.body.token;

        // 2. Publish Package
        console.log('Attempting Publish...');
        const pubRes = await request(app).post('/api/packages/publish')
            .set('x-auth-token', token)
            .send({
                name: 'DebugPackage',
                description: 'A test package',
                version: '1.0.0',
                documentation: '# Doc',
                dependencies: []
            });

        if (pubRes.status !== 200) {
            console.error('Publish Failed:', pubRes.body);
        } else {
            console.log('Publish Success:', pubRes.body.name);
        }

        // 3. Verify DB
        const pkg = await Package.findOne({ name: 'DebugPackage' });
        console.log('DB Verification: Package exists?', !!pkg);

    } catch (err) {
        console.error('Test Error:', err);
    } finally {
        await mongoose.disconnect();
    }
};

runTest();
