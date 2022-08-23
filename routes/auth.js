import express from "express";


const router = express.Router()

router.get('/', (req, res) => {
    res.send("Welcome from auth page")
})

export default router;