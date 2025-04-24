import nodemailer from 'nodemailer';
import User from '../models/User.js'; 
import Appointment from '../models/apointment.js'; 
import Doctor from '../models/doctor.js';
import dotenv from 'dotenv';






// Function to send email using nodemailer
const sendEmail = async (to, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sahil47521@gmail.com',
        pass: 'dlgp zaay pmgs qrxl',
      },
    });

    let mailOptions = {
      from: 'sahil47521@gmail.com',
      to: to,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent:', mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email'); 
  }
};

// Create new Appointment
export const createAppointment = async (req, res) => {
  const { doctor, user, ...appointmentData } = req.body;

  // Validate user and doctor IDs
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

  if (!doctor) {
    return res.status(400).json({
      success: false,
      message: "Doctor ID is required",
    });
  }

  try {
    // Check if user exists
    const foundUser = await User.findById(user);
    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if doctor exists
    const foundDoctor = await Doctor.findById(doctor);
    if (!foundDoctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Create new appointment
    const newAppointment = new Appointment({ doctor, user, ...appointmentData });
    const savedAppointment = await newAppointment.save();

    // Send email to user
    const subject = 'Appointment Scheduled';
    const text = `Hello ${foundUser.name},\n\nYour appointment with our doctor ${foundDoctor.name} has been scheduled successfully for ${appointmentData.firstName} ${appointmentData.lastName} on ${appointmentData.appointmentDate}.\n\nThank you.`;

    await sendEmail(foundUser.email, subject, text);

    res.status(200).json({
      success: true,
      message: "Appointment created successfully",
      data: savedAppointment,
    });
  } catch (err) {
    // console.error('Error creating appointment:', err);
    res.status(500).json({
      success: false,
      message: "Failed to create appointment. Try again",
    });
  }
};

// Update Appointment
export const updateAppointment = async (req, res) => {
  const id = req.params.id;
  const { doctor, user, ...appointmentData } = req.body;

  try {
    if (user) {
      const foundUser = await User.findById(user);
      if (!foundUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    }

    if (!doctor) {
      const foundUser = await User.findById(user);
      if (!foundUser) {
        return res.status(404).json({
          success: false,
          message: "Doctor not found",
        });
      }
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { $set: { doctor, user, ...appointmentData } },
      { new: true }
    ).populate("user").populate("doctor");

    res.status(200).json({
      success: true,
      message: "Successfully updated appointment",
      data: updatedAppointment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update appointment.",
    });
  }
};

// Delete Appointment
export const deleteAppointment = async (req, res) => {
  const id = req.params.id;
  try {
    await Appointment.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted appointment",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete appointment.",
    });
  }
};

// Get Single Appointment
export const getSingleAppointment = async (req, res) => {
  const id = req.params.id;
  try {
    const appointment = await Appointment.findById(id).populate("user");
    res.status(200).json({
      success: true,
      message: "Successfully retrieved appointment",
      data: appointment,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Appointment not found",
    });
  }
};

// Get All Appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({}).populate("doctor").populate("user");
    res.status(200).json({
      success: true,
      message: "Successfully retrieved all appointments",
      data: appointments,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Appointments not found",
    });
  }
};
