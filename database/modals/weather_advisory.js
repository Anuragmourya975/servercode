import mongoose from "mongoose";

const Weather_Advisory = new mongoose.Schema({
  temprature: { type: Array, required: true },
  rainfall: { type: Array, required: true },
  humidity: { type: Array, required: true },
  wind: { type: Array, required: true },
  severe: { type: Array, required: true },
});

const weather_advisorySchema = mongoose.model("weather_advisory", Weather_Advisory);

export default weather_advisorySchema;
