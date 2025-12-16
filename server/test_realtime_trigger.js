const axios = require('axios');

const API_URL = 'http://localhost:5001/api';

const run = async () => {
    try {
        // 1. Login
        console.log('Logging in...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: 'admin@alphacorp.com',
            password: 'password123'
        });
        const token = loginRes.data.token;
        console.log('Logged in. Token acquired.');

        // 2. Publish Package
        console.log('Publishing package...');
        const pkgData = {
            name: `@alphacorp/realtime-test-${Math.floor(Math.random() * 1000)}`,
            version: '1.0.0',
            description: 'Testing real-time socket updates',
            documentation: '# Hello World',
            dependencies: []
        };

        const pubRes = await axios.post(`${API_URL}/packages/publish`, pkgData, {
            headers: { 'x-auth-token': token }
        });

        console.log('Package published:', pubRes.data.name);

    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
    }
};

console.log('Waiting 30 seconds before triggering...');
setTimeout(() => {
    run();
}, 30000);
