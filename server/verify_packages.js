const axios = require('axios');

const API_URL = 'http://localhost:5001/api';

const verify = async () => {
    try {
        // 1. Login
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: 'admin@alphacorp.com',
            password: 'password123'
        });
        const token = loginRes.data.token;

        // 2. Get Packages
        const pkgRes = await axios.get(`${API_URL}/packages`, {
            headers: { 'x-auth-token': token }
        });

        console.log('Packages found:', pkgRes.data.length);
        pkgRes.data.forEach(p => console.log(`- ${p.name} (v${p.currentVersion})`));

    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
    }
};

verify();
