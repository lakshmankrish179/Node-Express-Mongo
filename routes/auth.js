import express from "express";
import User from "../models/User.js"
import bcrypt from "bcrypt";


const router = express.Router();

//REGISTER

router.post('/register', async (req, res) => {
    
    try {
        // GENERATE PASSWORD
        const salt  = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        // CREATE NEW USER
        const newUser = new User({
            username: req.body.username ,
            email:req.body.email,
            password: hashedPassword,
        })
        // SAVE USER
        const user = await newUser.save();
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
    }
})

router.post("/login", async (req,res) => {
    try {
        // CHECK USERS EMAIL ID and USER EXISTS.
        const user = await User.findOne({
            email:req.body.email
        })
        !user && res.status(404).send("user not found")

        // CHECK USER PASSWORD IS CORRECT

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).send("Invalid Password")

        res.send(200).json(user)
        
    } catch (error) {
        console.log(error);
    }
})

export default router;