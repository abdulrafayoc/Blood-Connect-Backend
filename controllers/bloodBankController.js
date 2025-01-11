import Blood from '../models/Blood.js';

export const getInventory = async (req, res) => {
  try {
    const inventory = await Blood.aggregate([
      { $match: { status: 'available' } },
      {
        $group: {
          _id: '$bloodType',
          totalUnits: { $sum: '$units' },
          donations: { $push: '$$ROOT' }
        }
      }
    ]);

    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const addToInventory = async (req, res) => {
  try {
    const { bloodType, units, donorId } = req.body;

    const blood = await Blood.create({
      donorId,
      bloodType,
      units,
      status: 'available',
      donationDate: new Date(),
      expiryDate: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000), // 42 days from now
    });

    res.status(201).json(blood);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getRequests = async (req, res) => {
  try {
    const requests = await Blood.find({ status: 'requested' })
      .populate('recipientId', 'name bloodType')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, units } = req.body;

    const request = await Blood.findById(id);
    if (!request) {
      return res.status(404).json({ message: 'Blood request not found' });
    }

    request.status = status;
    if (units) {
      request.units = units;
    }
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

