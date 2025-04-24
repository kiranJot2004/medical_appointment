
import mongoose from 'mongoose';

const medicineScheduleSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    medicineName: {
      type: String,
      required: true,
    },
    dosage: {
      type: String,
      required: false,
    },
    timesPerDay: {
      type: Number,
      required: true,
      default: 1,
    },
    amountPerDose: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    scheduleTimes: {
      type: [String], 
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const MedicineSchedule = mongoose.model('MedicineSchedule', medicineScheduleSchema);

export default MedicineSchedule;
