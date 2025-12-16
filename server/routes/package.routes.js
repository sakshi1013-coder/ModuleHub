const express = require('express');
const router = express.Router();
const packageController = require('../controllers/package.controller');
const auth = require('../middleware/auth.middleware');

// Company Actions
router.post('/publish', auth, packageController.publishPackage);
router.post('/version', auth, packageController.publishVersion);
router.get('/stats', auth, packageController.getCompanyStats); // NEW


// Employee/General Actions
router.get('/', auth, packageController.getCompanyPackages); // This might need a rename if getting ALL packages? No, this was getCompanyPackages.
router.get('/subscribed', auth, packageController.getSubscribedPackages); // NEW
router.get('/:id', auth, packageController.getPackageDetails);
router.post('/:id/subscribe', auth, packageController.subscribePackage); // NEW
router.delete('/:id/subscribe', auth, packageController.unsubscribePackage); // NEW

module.exports = router;
