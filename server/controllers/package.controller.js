const Package = require('../models/Package');
const Company = require('../models/Company');
const Notification = require('../models/Notification');
const User = require('../models/User');

// --- COMPANY ACTIONS ---

exports.publishPackage = async (req, res) => {
    try {
        console.log('[publishPackage] Start');
        const { name, description, version, documentation, dependencies } = req.body;
        const io = req.app.get('io');
        console.log('[publishPackage] IO instance:', !!io);

        // Ensure user is company admin
        const user = await User.findById(req.user.id).populate('company');
        console.log('[publishPackage] User found:', user._id);

        if (!user.company) {
            console.error(`Publish Failed: User ${req.user.id} has no company attached.`);
            return res.status(401).json({ msg: 'Not authorized as company.' });
        }

        const newPackage = new Package({
            company: user.company._id,
            name,
            description,
            currentVersion: version,
            versions: [{
                version: version,
                changelog: 'Initial Release',
                publishedBy: req.user.id
            }],
            documentation,
            dependencies
        });

        await newPackage.save();
        console.log('[publishPackage] Package saved:', newPackage._id);

        // NOTIFICATIONS - Only notify employees, not company admins
        const employees = await User.find({ 
            company: user.company._id, 
            accountType: 'employee',
            _id: { $ne: req.user.id } 
        });
        console.log('[publishPackage] Employees to notify:', employees.length);

        const notifications = employees.map(emp => ({
            recipient: emp._id,
            type: 'new-package',
            title: `New Package: ${name}`,
            message: `${name} v${version} has been published.`,
            relatedPackage: newPackage._id
        }));

        if (notifications.length > 0) {
            await Notification.insertMany(notifications);
            console.log('[publishPackage] Notifications inserted');
        }

        // 2. Emit Socket Event
        const room = user.company._id.toString();
        console.log('[publishPackage] Emitting to room:', room);
        io.to(room).emit('notification', {
            type: 'new-package',
            title: `New Package: ${name}`,
            message: `${name} v${version} has been published.`
        });
        console.log('[publishPackage] Emitted');

        res.json(newPackage);

    } catch (err) {
        console.error('[publishPackage] CRASH ERROR:', err);
        res.status(500).send('Server Error: ' + err.message);
    }
};

exports.publishVersion = async (req, res) => {
    try {
        const { packageId, version, changelog } = req.body;
        const io = req.app.get('io');

        const pkg = await Package.findById(packageId);
        if (!pkg) return res.status(404).json({ msg: 'Package not found' });

        const user = await User.findById(req.user.id).populate('company');
        if (pkg.company.toString() !== user.company._id.toString()) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Update package
        pkg.currentVersion = version;
        pkg.versions.push({
            version,
            changelog,
            publishedBy: req.user.id
        });
        await pkg.save();

        // Notify Subscribers - Only notify employees, not company admins
        // Find employees who have subscribed to this package
        const subscribers = await User.find({ 
            subscriptions: pkg._id,
            accountType: 'employee'
        });

        const notifications = subscribers.map(sub => ({
            recipient: sub._id,
            type: 'version-update',
            title: `Update: ${pkg.name}`,
            message: `${pkg.name} updated to v${version}.`,
            relatedPackage: pkg._id
        }));

        if (notifications.length > 0) await Notification.insertMany(notifications);

        // Emit to specific user rooms (if they are online)
        subscribers.forEach(sub => {
            io.to(sub._id.toString()).emit('notification', {
                type: 'version-update',
                title: `Update: ${pkg.name}`,
                message: `${pkg.name} updated to v${version}.`,
                relatedPackage: pkg._id
            });
        });

        res.json(pkg);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.subscribePackage = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const pkg = await Package.findById(req.params.id);

        if (!pkg) return res.status(404).json({ msg: 'Package not found' });

        if (user.subscriptions.includes(pkg._id)) {
            return res.status(400).json({ msg: 'Already subscribed' });
        }

        user.subscriptions.push(pkg._id);
        await user.save();

        res.json(user.subscriptions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.unsubscribePackage = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        user.subscriptions = user.subscriptions.filter(
            sub => sub.toString() !== req.params.id
        );

        await user.save();

        res.json(user.subscriptions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getSubscribedPackages = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: 'subscriptions',
            populate: { path: 'company', select: 'companyName' }
        });
        res.json(user.subscriptions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getCompanyStats = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('company');
        if (!user.company) return res.status(400).json({ msg: 'No company found' });

        const companyId = user.company._id;

        // 1. Total Packages
        const totalPackages = await Package.countDocuments({ company: companyId });

        // 2. Total Employees
        // We can get this from Company members array length or User query
        // Company members array might be just IDs, let's use that if up to date, else query Users
        const totalEmployees = await User.countDocuments({ company: companyId });

        // 3. Recent Updates (e.g., versions published in last 7 days)
        // This is complex as versions are inside packages. 
        // Simpler: Just get count of Packages updated recently? Or just return a hardcoded/simple metric for now and refine if needed.
        // Let's count packages updated in last 7 days.
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentUpdates = await Package.countDocuments({
            company: companyId,
            updatedAt: { $gte: sevenDaysAgo }
        });

        res.json({
            totalPackages,
            totalEmployees,
            recentUpdates
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// --- EMPLOYEE ACTIONS ---

exports.getCompanyPackages = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        console.log(`[getCompanyPackages] User: ${user._id}, Company: ${user.company}`);

        if (!user.company) {
            console.log('[getCompanyPackages] No company found for user');
            return res.status(400).json({ msg: 'No company found' });
        }

        const packages = await Package.find({ company: user.company }).sort({ updatedAt: -1 });
        console.log(`[getCompanyPackages] Found ${packages.length} packages`);
        res.json(packages);
    } catch (err) {
        console.error('[getCompanyPackages] Error:', err);
        res.status(500).send('Server Error');
    }
};

exports.getPackageDetails = async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.id).populate('versions.publishedBy', 'name');
        if (!pkg) return res.status(404).json({ msg: 'Not found' });
        res.json(pkg);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
