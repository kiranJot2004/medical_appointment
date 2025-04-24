import Doctor from '../models/doctor.js'
// Create a new doctor
export const createDoctor = async (req, res) => {
  try {
    const { name, specialty, email, contactNumber, photo, description } = req.body;
    const newDoctor = new Doctor({ name, specialty, email, contactNumber, photo, description });
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a doctor by ID
export const updateDoctorById = async (req, res) => {
  try {
    const { name, specialty, email, contactNumber, photo, description } = req.body;
    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id,
      { name, specialty, email, contactNumber, photo, description },
      { new: true } // Return the updated document
    );
    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(updatedDoctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a doctor by ID
export const deleteDoctorById = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
