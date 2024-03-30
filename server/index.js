const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const StudentModel = require('./models/Students');

const app = express();

app.use(express.json());
app.use(cors())

const connect = mongoose.connect("mongodb://localhost:27017/students");


//check database connected or not
connect.then(() => {
    console.log("Database successfully connected");
})
.catch(() => {
    console.log("Database cannot be connected");
});

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    StudentModel.findOne({email: email})
    .then((user) => {
        if(user){
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("Incorrect Password entered")
            }
        } else{
            res.json("Records don't exist")
        }
    })
    .catch((err) => {
        res.json(err);
    })
});


app.post('/register', (req, res) => {
    StudentModel.create(req.body)
    .then((students) => (
        res.json(students)
    ))
    .catch((err) => (
        res.json(err)
    ))
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port, ${port}`);
})