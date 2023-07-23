import { UserModel } from "../models/user.js";
import { TagModel } from "../models/tag.js";

const addTagToUser = async (req, res, next) => {
    try {
      const { userId, tagName } = req.body; // Assuming user ID and tag name are passed as route parameters
      // Find the user by ID
      const user = await UserModel.findById({_id:userId});
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Check if the tag already exists for the user
      const existingTag = await TagModel.findOne({ tag: tagName });
      if (existingTag) {
        // If the tag already exists, increase the weight and click count
        existingTag.weight += 100;
        existingTag.clickCount += 1;
        existingTag.date = Date.now(); 
        await existingTag.save();
      } else {
        // If the tag doesn't exist, create a new tag and add it to the user's tags array
        const newTag = await TagModel.create({
          tag: tagName,
          weight: 0,
          clickCount: 0,
          date: Date.now() 
        });
        await newTag.save();
        user.tags.push(tagName);
      }
  
      // Save the updated user object
      await user.save();
  
      res.status(200).send('Tag added to user successfully');
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  
  const getAllTags = async (req, res, next) => {
    try {
      // Retrieve all tags from the TagModel
      const tags = await TagModel.find();
      // Extract the tag names and weights
      const tagWeights = tags.map(tag => ({
        name: tag.tag,
        weight: tag.weight,
        clickCount:tag.clickCount
      }));
  
      res.status(200).json(tagWeights);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  

export {
    addTagToUser,
    getAllTags
}