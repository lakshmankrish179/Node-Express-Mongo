import express from "express";
import user from "../models/User.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";


const router = express.Router()

//UPDATE USER INFO
router.put("/:id", async(req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
            } catch (error) {
                return res.status(500).json(error)
            }
            try {
                const user = await User.findByIdAndUpdate(req.params.id, {$set:req.body})
                res.status(200).json("Account has been updated")
            } catch (err) {
                return res.status(500).json(err)
            }
        }
    }else{
        return res.status(403).json("You can only update your account")
    }
});

// DELETE A USER 
router.delete("/:id", async(req,res) => {
    if(req.body.userId === req.params.id){
            try {
                const user = await User.findByIdAndDelete(req.params.id)
                res.status(200).json("Account has been deleted")
            } catch (err) {
                return res.status(500).json(err)
            }
        }else{
        return res.status(403).json("You can only delete your account")
    }
});

// GET A USER

router.get("/:id", async(req,res) => {
    try {
        const user = await User.findById(req.params.id);
        const{password, ...other} = await user._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(400).json(error)
    }
})


export default router;