import Donor from '../models/Donor.js';
import Blood from '../models/Blood.js';

export const getDonations = async (req, res) => {
  try {
    const donations = await Blood.find({ donorId: req.user._id }).sort({ donationDate: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createDonation = async (req, res) => {
  try {
    const { bloodType, units } = req.body;

    const donor = await Donor.findOne({ userId: req.user._id });
    if (!donor) {
      return res.status(404).json({ message: 'Donor profile not found' });
    }

    const donation = await Blood.create({
      donorId: donor._id,
      bloodType,
      units,
      donationDate: new Date(),
      expiryDate: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000), // 42 days from now
    });

    donor.donationCount += 1;
    donor.donationDate = new Date();
    await donor.save();

    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getEligibility = async (req, res) => {
  try {
    const donor = await Donor.findOne({ userId: req.user._id });
    if (!donor) {
      return res.status(404).json({ message: 'Donor profile not found' });
    }

    const lastDonation = await Blood.findOne({ donorId: donor._id }).sort({ donationDate: -1 });
    
    let eligibility = 'Eligible';
    let nextEligibleDate = null;

    if (lastDonation) {
      const timeSinceLastDonation = Date.now() - lastDonation.donationDate.getTime();
      const daysSinceLastDonation = timeSinceLastDonation / (1000 * 60 * 60 * 24);

      if (daysSinceLastDonation < 56) { // 8 weeks
        eligibility = 'Not Eligible';
        nextEligibleDate = new Date(lastDonation.donationDate.getTime() + 56 * 24 * 60 * 60 * 1000);
      }
    }

    res.json({
      eligibility,
      nextEligibleDate,
      healthStatus: donor.healthStatus,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

