const router = require("express").Router();
const User = require("../models/user");
const post = require("../models/post");
const bcrypt = require("bcrypt");

//update
router.put("/:id",async (req,res)=>{
    if(req.body.userId ===req.params.id){
        if(res.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt);
        }
        try{
            const updateUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body},{new:true});
            res.status(200).json(updateUser);
        }catch(err){
            res.status(500).json(err)
        }
    }
    else{
        res.status(401).json("You can update only you have am account")
    }
});

//Delete
router.delete("/:id",async (req,res)=>{
    if(req.body.userId ===req.params.id){
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            try{
                await post.deleteMany({username:user.username});
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User Deleted");
            }catch(err){
                res.status(500).json(err)
            }
        }
        catch(err){
            res.status(404).json("User not found");
        }
    }
    else{
        res.status(401).json("You can delete only you have am account")
    }
});

// GET USER
router.get("/:id",async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
});
module.exports = router