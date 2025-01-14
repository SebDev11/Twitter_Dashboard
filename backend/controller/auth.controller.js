const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

//Register | Create User Router controller
const RegisterUser = async (req, res) => {
    console.log(req.body)
    try{
        const { email, username, password } = req.body;
        // Check if user already exists
        let user =  await UserModel.findOne({email});
        if(user){
            return res.status(400).send({
                message: '⚠️ :: User Already Exists!',
            })
        }

        const newUserData = {
            email: email,
            username: username,
            password: password,
        }

        // Create new user
        newUser = new UserModel(newUserData);

        // Hash password
        const salt = await bcrypt.genSalt(10);
        console.log("🔑 :: Generated Salt: ", salt);
        newUser.password = await bcrypt.hash(password, salt);
        console.log("👁️ :: Hashed Password: ", newUser.password);

        // User save to DB
        await newUser.save();

        // Generate JWT
        const payload = {
            user: {
                id: newUser._id
            }
        };

        jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: 3600 }, (err, token) => {
            if (err) {
                throw err;
            }
            // Send token in response upon successful registration
            res.status(200).json({
                status: true,
                user: { id: newUser._id, username: newUser.username, email: newUser.email },
                token: token,
                message: "✨ :: User registered successfully!",
            });
        });

    }catch(err){
        return res.status(500).send({
            status: false,
            message: "☠️ :: Server Error: " + err.message,
        })
    }

}

//Login | Create User Router controller
const LoginUser = async (req, res) => {

    try{

        const { email, password } = req.body;

        // Check if user exists
        let user = await UserModel.findOne({ email: email });
        if(!user){
            return res.status(400).send({
                messageEmail: "⚠️ :: Invalid credentials, Email is not match!", 
            })
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).send({
                messagePw: "⚠️ :: Invalid credentials, Password is not match!",
            })
        }

        // Generate JWT
        const payload = { //This payload typically contains information about the user. In this case, it includes the user's id.
            user: {
                id: user._id
            }
        }
                
        jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: 3600 }, (err, token) => { //jwt.sign() library takes three main parameters: payload(The data to be included in the token.), secretToken(This is a secret key used to sign the token.), expiresIn(This is an optional parameter specifying the expiration time of the token.)
            if(err){
                throw err;
            }
            return res.json({
                token: token,
                user: { id: user._id, username: user.username, email: user.email },
                message: "🔓 :: Access Granted!"
            })
        })

    } catch(err) {
        return res.status(500).send({
            status: false,
            message: "☠️ :: Server Error: " + err.message,
        })
    }

}

const GetUser = async(req, res) => {
    console.log(req.user);
    try {
        const user = await UserModel.findById(req.user.id).select('-password');
        if(!user) {
            return res.statue(404).json({msg: 'User not found'})
        }
        res.json({user})
    } catch(err) {
        res.status(500).json({msg: 'Server error'})
    }
}

module.exports = {
    RegisterUser,
    LoginUser,
    GetUser,
}