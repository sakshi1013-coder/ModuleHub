const User = require('../models/User');
const Company = require('../models/Company');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper to generate "CMP-XXXXX"
const generateCompanyCode = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000); // 5 digit number
    return `CMP-${randomNum}`;
};

exports.register = async (req, res) => {
    try {
        // Fields from request
        const {
            accountType, // 'employee' | 'company'
            username,
            name, // User might send 'name' or 'username'. We'll map to 'username' model field.
            email,
            password,
            companyName,
            companyCode,
            domain,
            role
        } = req.body;

        const effectiveUsername = username || name || email.split('@')[0];

        // 1. Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        let company;
        let userRole = role || 'developer';

        if (accountType === 'company') {
            // --- CREATE COMPANY ---
            if (!companyName) return res.status(400).json({ msg: 'Company Name is required' });

            // Check overlap
            let existingCompany = await Company.findOne({ companyEmail: email });
            if (existingCompany) {
                return res.status(400).json({ msg: 'Company with this email already exists' });
            }

            // Generate unique code CMP-XXXXX
            let code = generateCompanyCode();
            while (await Company.findOne({ companyCode: code })) {
                code = generateCompanyCode();
            }

            // Determine Domain
            const finalDomain = domain || email.split('@')[1];

            company = new Company({
                companyName: companyName,
                companyEmail: email,
                companyCode: code,
                domain: finalDomain,
                members: []
            });

            // Save company first before creating user
            await company.save();

            userRole = 'admin';

        } else {
            // --- EMPLOYEE JOIN ---
            if (!companyCode) return res.status(400).json({ msg: 'Company Code is required' });

            company = await Company.findOne({ companyCode });
            if (!company) {
                return res.status(400).json({ msg: 'Invalid Company Code' });
            }
        }

        // 3. Create User
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username: effectiveUsername,
            email,
            password: hashedPassword,
            accountType,
            role: userRole,
            company: company._id
        });

        await newUser.save();

        // 4. Update Company Members
        company.members.push(newUser._id);
        await company.save();

        // 5. Token
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('ERROR: JWT_SECRET environment variable is not set');
            return res.status(500).json({ msg: 'Server configuration error' });
        }
        const payload = { user: { id: newUser.id } };
        jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({
                token,
                user: newUser,
                accountType: newUser.accountType,
                companyCode: company.companyCode
            });
        });

    } catch (err) {
        console.error('Registration error:', err);
        const errorMessage = err.message || 'Server Error';
        res.status(500).json({ msg: errorMessage, error: errorMessage });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email }).populate('company');
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('ERROR: JWT_SECRET environment variable is not set');
            return res.status(500).json({ msg: 'Server configuration error' });
        }
        const payload = { user: { id: user.id } };
        jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({
                token,
                user,
                accountType: user.accountType
            });
        });
    } catch (err) {
        console.error('Login error:', err);
        const errorMessage = err.message || 'Server Error';
        res.status(500).json({ msg: errorMessage, error: errorMessage });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password').populate('company');
        res.json(user);
    } catch (err) {
        console.error('GetMe error:', err);
        const errorMessage = err.message || 'Server Error';
        res.status(500).json({ msg: errorMessage, error: errorMessage });
    }
};
