// routes/doctorRoutes.js
import express from 'express';
import { createDoctor, deleteDoctorById, getAllDoctors, getDoctorById, updateDoctorById } from '../controllers/doctorController.js';

const router = express.Router();

// Create doctor
router.post('/', createDoctor);

// Update doctor
router.put('/update/:id', updateDoctorById);

// Delete doctor
router.delete('/delete/:id', deleteDoctorById);

// Get single doctor
router.get('/getById/:id', getDoctorById );

// Get all doctors
router.get('/getAll/', getAllDoctors);

export default router;
