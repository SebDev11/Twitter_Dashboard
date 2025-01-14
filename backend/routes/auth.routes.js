const express = require("express");
const AuthRouter = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const { 
    RegisterUser,
    LoginUser,
    GetUser,
 } = require("../controller/auth.controller");

AuthRouter.post('/register', RegisterUser);
AuthRouter.post('/login', LoginUser);
AuthRouter.get('/user', authMiddleware, GetUser);

module.exports = AuthRouter;