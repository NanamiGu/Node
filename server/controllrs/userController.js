const User = require("../models/User");


const getUserByEmail = async (req, res) => {
    try {
        const email  = req.query.email;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user by email", error: error.message });
    }
};

const createUser = async (req, res) => {
   try {
    const {name,email,age}=req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: "User with this email already exists" });
    }
    const newUser = new User({
        name , 
        email,
        age
    })
    const saveUser = await newUser.save();
    res.status(201).json({ message: "User created successfully", data: saveUser });
   }
   catch (error) {
    res.status(500).json({meesage:"Error creating user",error:error.message});
   }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, age },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};
const deleteUser = async (req, res) => {
    const {id}=req.params;
    try{
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            return res.status(404).json({message:"User not found"});
        }    
        res.status(200).json({message:"User deleted successfully", data: deletedUser});
    }catch(error){
        res.status(500).json({message:"Error deleting user", error: error.message});
    }
};






const getUsers=async (req,res)=>{
    try{
        const users=await User.find();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message:"Error fetching users",error:error.message});
    }

};

const  getUserById = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(user);   
    }catch(error){
        res.status(500).json({message:"Error fetching user by id",error:error.message});
    }
};
module.exports = { createUser, getUsers, getUserByEmail, getUserById, updateUser, deleteUser };