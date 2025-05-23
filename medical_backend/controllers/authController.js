import User from "../models/User.js"
import bcrypt from "bcryptjs" 
import jwt from "jsonwebtoken" 

//User registration
// export const register = async (req, res) => {
//     try{
//         // hashing the password
//         const salt = bcrypt.genSaltSync(10)
//         const hash = bcrypt.hashSync(req.body.password, salt)

//         const newUser = new User({
//             name: req.body.name,
//             dob: req.body.dob,
//             email: req.body.email,
//             password: hash,  
//             role: req.body.role,
//             photo: req.body.photo,
//         })
    
//         await newUser.save()

//         res.status(200).json({
//             success: true,
//             message: "Successfully created"
//         })
//     }catch(err){
//         res.status(500).json({
//             success: false,
//             message: "Failed to create. Try again"
//         })
//     }
// }


export const register = async (req, res) => {
    console.log("req.body", req.body);
    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Hashing the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            name: req.body.name,
            dob: req.body.dob,
            email: req.body.email,
            password: hash,
            photo: req.body.photo,
        });

        await newUser.save();

        res.status(200).json({
            success: true,
            message: "Successfully created"
        });
    } catch (err) {
        console.error('Error during user registration:', err); // Improved logging
        res.status(500).json({
            success: false,
            message: "Failed to create. Try again"
        });
    }
}


//User login
export const login = async (req, res) => {

    const email = req.body.email
    const password = req.body.password

    try{

        const user = await User.findOne({email})

        //if user doesnt exist
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        //if user exist then check the password or compare the password
        const checkCorrectPassword = await bcrypt.compare(
            req.body.password, 
            user.password
        )

        //if password is wrong
        if(!checkCorrectPassword){
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password"
            })
        }

        const {password: hashedPassword, role, ...rest} = user._doc

        //create jwt token
        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET_KEY,
            {expiresIn: "15d"}
        )

        // set token in the browser cookies and send the response to the client
        res
        .cookie("accessToken", token, {
            httpOnly: true,
            expires: token.expiresIn,
        })
        .status(200)
        .json({
            token,
            data:{...rest},
            role,
        })

    }catch(err){
        console.error(err);  // log the error
        res
        .status(500)
        .json({success: false, message: "Failed to log in"})
    }
}

