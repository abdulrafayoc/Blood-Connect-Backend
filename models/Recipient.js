import mongoose from 'mongoose';

const recipientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bloodType: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  diagnosis: {
    type: String,
    required: true
  },
  hospitalName: {
    type: String,
    required: true
  },
  emergencyContact: {
    name: String,
    phoneNo: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Recipient = mongoose.model('Recipient', recipientSchema);

export default Recipient;

