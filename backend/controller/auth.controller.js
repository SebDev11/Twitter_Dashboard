const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

//Register | Create User Router controller
const RegisterUser = async (req, res) => {

    try{

        const { email, password } = req.body;

        // Check if user already exists
        let user =  await UserModel.findOne({email});
        if(user){
            return res.status(400).send({
                message: '⚠️ :: User Already Exists!',
            })
        }

        const newUserData = {
            email: email,
            password: password,
        }

        // Create new user
        user = new UserModel(newUserData);

        // Hash password
        const salt = await bcrypt.genSalt(10);
        console.log("🔑 :: Generated Salt: ", salt);
        user.password = await bcrypt.hash(password, salt);
        console.log("👁️ :: Hashed Password: ", user.password);

        // User save to DB
        await user.save();

        return res.status(200).send({
            status: true,
            message: "✨ :: User registered successfuly!",
        })

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
                id: user.id
            }
        }
                
        jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: 3600 }, (err, token) => { //jwt.sign() library takes three main parameters: payload(The data to be included in the token.), secretToken(This is a secret key used to sign the token.), expiresIn(This is an optional parameter specifying the expiration time of the token.)
            if(err){
                throw err;
            }
            return res.json({
                token: token,
                message: "🔓 :: Access Granted!"
            })
        })

    }catch(err){
        return res.status(500).send({
            status: false,
            message: "☠️ :: Server Error: " + err.message,
        })
    }

}


module.exports = {
    RegisterUser,
    LoginUser,
}