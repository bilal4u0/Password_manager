import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose";

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

let conn = "mongodb://localhost:27017/dataBase"

const connected = async () => {
  await mongoose.connect(conn)
  console.log("MONGO_DB conneted successfully")
}
connected()
const MyUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true
})

const MyUser = mongoose.model('Myusers', MyUserSchema)

app.get('/', (req, res) => {
  res.send('Hello Bilal!')
})

app.post('/registered', async (req, res,) => {
  try {
    const { email, password } = req.body;
    const USERS = new MyUser({ email, password })
    await USERS.save()

    res.status(200).json({
      success: true,
      message: "User registered successfully ✅",
    });

  } catch (error) {
    console.error("Error saving user:", error.message);

    if (error.name === "ValidationError") {
      // send a friendly error message to frontend
      return res.status(400).send({
        success: false,
        message: "password length should be minimun 6 characters"
      });
    }

    if (error.code === 11000) {
      return res.status(400).send({
        success: false,
        message: "User with this email already exist."
      });
    }
 

    res.status(500).send({
      success: false,
      message: "Something went wrong on the server."
    });

  }

})


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await MyUser.findOne({ email, password });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password."
      });
    } 

    res.status(200).send({
      success: true,
      message: "Login successfully ✅"
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({
      success: false,
      message: "Something went wrong on the server."
    });
  }
})
app.get('/users', async (req, res) => {
 try{
  const users=await MyUser.find()
  res.status(200).send({
    success: true,
    message: "Users fetched successfully ✅",
    users: users
  })
 } catch (error) {
  console.error("Error fetching users:", error);
  res.status(500).send({
    success: false,
    message: "Something went wrong on the server."
  });
 }
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})