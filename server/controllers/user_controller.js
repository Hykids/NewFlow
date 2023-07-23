import { UserModel } from "../models/user.js";
import bcrypt from 'bcrypt';

const getAllUsers = async (req, res, next)=>{
    try {
        const users = await UserModel.find({}).limit(req.query._end);
        console.log(users)
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUsers = async (req, res, next)=>{
    try {
        let { username,password,role } = req.body;

        console.log(role,'role')
        if(!role)
        {
            role='user'
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userExists = await UserModel.findOne({username});

        if(userExists) return res.status(200).json(userExists);

    const newUser = await UserModel.create({
        username,
        password:hashedPassword,
        role: role || 'user',
    })

    res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};

const deleteUsers = async (req, res, next)=>{
    try {
        const { id } = req.params;
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', data: deletedUser });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

const getUsersInfoByID = async (res,req)=>{
    try {
        const { id } = req.params;

        const user = await UserModel.findOne({ _id: id }).populate("allProperties");

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 修改用户权限
const toggleUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = user.role === 'admin' ? 'user' : 'admin';
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
    getAllUsers,
    deleteUsers,
    getUsersInfoByID,
    createUsers,
    toggleUserRole
}