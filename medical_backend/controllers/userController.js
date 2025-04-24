
import upload from '../config/multer-config.js'
import User from '../models/User.js'

// create new User
export const createUser = async (req, res) => {

    const newUser = new User(req.body)
    try{
        const savedUser = await newUser.save() 
        res 
        .status(200)
        .json({
            success: true,
            message: 'User created successfully',
            data: savedUser,
        })
    }catch (err) {
        res
      .status(500)
      .json({
        success: false,
        message: "Failed to create. Try again",
      })
    }
} 


// update User
export const updateUser = async (req, res) => {

  const id=req.params.id

  try{
    const updatedUser = await User.findByIdAndUpdate(id,
      {
        $set : req.body
      }, {new: true})

      res 
        .status(200)
        .json({
            success: true,
            message: 'Successfully updated User', 
            data: updatedUser,
        })

  }catch(err){
    res
     .status(500)
     .json({
        success: false,
        message: "Failed to update.",
      })
  }
}

// delete User
export const deleteUser = async (req, res) => {
  const id=req.params.id

  try{
     await User.findByIdAndDelete(id)

      res 
        .status(200)
        .json({
            success: true,
            message: 'Successfully deteled', 
        })

  }catch(err){
    res
     .status(500)
     .json({
        success: false,
        message: "Failed to update.",
      })
  }
}

// getSingle User
export const getSingleUser = async (req, res) => {
  const id=req.params.id

  try{
     const user = await User.findById(id)

      res 
        .status(200)
        .json({
            success: true,
            message: 'Successfull', 
            data: user
        })

  }catch(err){
    res
     .status(404)
     .json({
        success: false,
        message: "Not found",
      })
  }
}

// geetAllUser User 
export const getAllUser = async (req, res) => {

  try{

    const users = await User.find({})

    res.status(200).json({
      success: true,
      message: 'Successfull', 
      data: users
    })
  }catch(err){
    res.status(404)
    .json({
       success: false,
       message: "Not found",
     })
  }
}

// Upload File
export const uploadFile = async (req, res, id) => {
  console.log('ididid', id)
  upload(req, res, async (err) => {
    // console.log('on upload ', res.user)


    if (err) {
      return res.status(400).json({ message: err });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file selected' });
    }
    try {
      const user = await User.findById(req.user.id); 
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.photo = `uploads/${req.file.filename}`;
      await user.save();
      res.status(200).json({
        success: true,
        message: 'File uploaded successfully',
        data: user,
      });
    } catch (error) {
      console.log('Error updating user photo:', error); // Log the error
      res.status(500).json({ message: 'Failed to update user photo' });
    }
  });
};
