import Recipient from '../models/Recipient.js';
import Blood from '../models/Blood.js';

export const getRequests = async (req, res) => {
  try {
    const recipient = await Recipient.findOne({ userId: req.user._id });
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient profile not found' });
    }

    const requests = await Blood.find({ recipientId: recipient._id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createRequest = async (req, res) => {
  try {
    const { bloodType, units, urgency } = req.body;

    const recipient = await Recipient.findOne({ userId: req.user._id });
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient profile not found' });
    }

    const request = await Blood.create({
      recipientId: recipient._id,
      bloodType,
      units,
      status: 'requested',
      urgency,
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await Blood.findById(id);
    if (!request) {
      return res.status(404).json({ message: 'Blood request not found' });
    }

    if (request.recipientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this request' });
    }

    request.status = status;
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

