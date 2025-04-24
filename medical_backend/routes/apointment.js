// routes/appointmentRoutes.js
import express from 'express';
import {
    updateAppointment,
    deleteAppointment,
    getSingleAppointment,
    getAllAppointments,
    createAppointment
} from '../controllers/appointmentController.js';

const router = express.Router();

// Create appointment
router.post('/', createAppointment);

// Update appointment
router.put('/:id', updateAppointment);

// Delete appointment
router.delete('/:id', deleteAppointment);

// Get single appointment
router.get('/:id', getSingleAppointment);

// Get all appointments
router.get('/', getAllAppointments);

export default router;
