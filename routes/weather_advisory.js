import express from "express";
import dotenv from 'dotenv'
import Weather_Advisory from "../database/modals/weather_advisory.js";

dotenv.config();

const router = express.Router();

router.route('/').get(async (req,res) =>{
    try{
        const weather_advisory = await Weather_Advisory.find({});
        console.log('Weather Advisory Length:', weather_advisory.length);
        console.log('Weather Advisory Data:', weather_advisory);        
        res.status(200).json({success: true, data: weather_advisory});
        console.log(weather_advisory);
    }catch(err){
        res.status(500).json({success : false, message:'Fetching Weathe Failed, please try again'})
    }
});

export default router;