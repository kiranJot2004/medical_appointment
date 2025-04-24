

import express from 'express';
import {
  createMedicineSchedule,
  getAllMedicineSchedules,
  getMedicineScheduleById,
  updateMedicineScheduleById,
  deleteMedicineScheduleById,
} from '../controllers/medicineScheduleController.js';

const router = express.Router();

// Create a new medicine schedule
router.post('/', createMedicineSchedule);

// Get all medicine schedules
router.get('/', getAllMedicineSchedules);

// Get a single medicine schedule by ID
router.get('/:id', getMedicineScheduleById);

// Update a medicine schedule by ID
router.put('/:id', updateMedicineScheduleById);

// Delete a medicine schedule by ID
router.delete('/:id', deleteMedicineScheduleById);

export default router;
