const router = require("express").Router();
const User=require('../../models/User');
const Thought = require('../../models/Thought');

router.get("/",async (req,res)=>{
    try {
        var AllUsers= await User.find({})
        res.status(200).json(AllUsers)
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get("/:id", async(req,res)=>{
    try {
        var UserFound=await User.findById({_id:req.params.id})
        res.status(200).json(UserFound)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

router.post("/",async({body},res)=>{
    try {
        console.log(body);
        User.create(body).then(dbuser=>res.status(200).json(dbuser))
    } catch (error) {
        res.status(500).json(error)
    }
});

router.put("/:id",async({params,body},res)=>{
    try {
        var UpdatedUser=await User.findByIdAndUpdate(
            {_id:params.id},
            body,
            {new:true}
        )
        res.status(200).json(UpdatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
});

router.delete("/:id",async(req,res)=>{
    try {
        var deleted = await User.findByIdAndDelete({_id:req.params.id})
        // var deletedThoughts= await Thought.deleteMany()
        res.status(200).json(deleted)
    } catch (error) {
        res.status(500).json(error)
    }
});

router.post("/:id/friends/:friendid",async({params},res)=>{
    try {
        var UpdatedUser=await User.updateOne(
            {_id:params.id},
            {$addToSet:{friends:params.friendid}})
        res.status(200).json(UpdatedUser)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

router.delete("/:id/friends/:friendid",async({params},res)=>{
    try {
        var UpdatedUser = await User.updateOne(
            {_id:params.id},
            {$pull:{friends:params.friendid}}
        )
        res.status(200).json(UpdatedUser)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});


module.exports = router