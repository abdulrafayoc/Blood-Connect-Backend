import express from 'express';
import { getRequests, createRequest, updateRequest } from '../controllers/recipientController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, authorize('recipient'));

router.route('/requests')
  .get(getRequests)
  .post(createRequest);

router.patch('/requests/:id', updateRequest);

export default router;

