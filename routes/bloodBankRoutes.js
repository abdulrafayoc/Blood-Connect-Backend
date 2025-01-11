import express from 'express';
import { getInventory, addToInventory, getRequests, updateRequest } from '../controllers/bloodBankController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, authorize('staff'));

router.route('/inventory')
  .get(getInventory)
  .post(addToInventory);

router.get('/requests', getRequests);
router.patch('/requests/:id', updateRequest);

export default router;

