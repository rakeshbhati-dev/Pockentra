const User = require('../models/user.model');

const getParticularUser = async (req, res) => {
    try {
        const { userId } = req.user;
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: "No User Exist" });
        }
        return res.status(200).json({ message: 'User fetch successfully', data: existingUser })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }

}

const updateParticularUser = async (req, res) => {
    try {
        const { userId } = req.user;
        const { firstName, lastName, email } = req.body

        const updatedUser=await User.findByIdAndUpdate(userId,{firstName:firstName,lastName:lastName,email:email},{new:true,runValidators:true})
        if(!updatedUser){
            return res.status(400).json({ message: "Unable to update user" });
        }
        return res.status(200).json({message:"User updated successfully",data:updatedUser})

    } catch (error) {
         return res.status(500).json({ message: "Something went wrong", error: error.message });
    }

}

module.exports = { getParticularUser,updateParticularUser }