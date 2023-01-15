var express = require('express')
var app = express()
const cors = require ("cors");
const path = require("path");
const mongoose = require("mongoose");
const Waitlist = require('./models/waitlist.model.js')
require('dotenv').config()

mongoose.set('strictQuery', false);
mongoose.connect(`${process.env.MONGOOSE_URL}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true
  }, () => {
	console.log("Connected to mongoose successfully")
});


app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public/dist'))


app.get('/', (req, res) => {
	return res.sendFile(path.join(__dirname, "./public/dist", "index.html"));
})
app.post("/waitlist", async (req,res) => {
    await Waitlist.create({email: req.body.email});
    res.json({status: 200})
})


app.listen(process.env.PORT || 8000, function(){console.log("Server started")});