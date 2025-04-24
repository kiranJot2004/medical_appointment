import express from 'express';
import { 
    updateUser, 
    deleteUser, 
    getSingleUser, 
    getAllUser,
    uploadFile
    } from '../controllers/userController.js';

const router = express.Router();

import {verifyUser,verifyAdmin} from '../utils/verifyToken.js'

//update user
router.put('/:id',  updateUser)

//delete user
router.delete('/:id',  deleteUser)

//get single user
router.get('/:id',  getSingleUser)

//get all user
router.get('/',  getAllUser)

// upload profile picture

export default router; 