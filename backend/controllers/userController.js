const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
    
    if (user && (await user.matchPassword(password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,  
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400)
        throw new Error("Failed to create the User")
    }
})

// /api/user?search=kousik
const allUsers = asyncHandler(async (req, res) => {
  // I have used Regex Here
  // here as i have written i refers to case sensitivity
  // and we are specifying to return results either searched by name
  //  or searched by email
  const keyword = req.query ? {
    $or: [
      { name: { $regex: req.query.search, $options: "i" }, },
      { email: { $regex: req.query.search, $options: "i" }, },
    ]
  } :
    {};
  
  //  we are telling that return all the users except the current user 
  //  who is searching
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })

  res.send(users);
})

module.exports = { registerUser , authUser , allUsers };