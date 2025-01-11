import express from 'express';
import { getDonations, createDonation, getEligibility } from '../controllers/donorController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, authorize('donor'));

router.route('/donations')
  .get(getDonations)
  .post(createDonation);

router.get('/eligibility', getEligibility);

export default router;

