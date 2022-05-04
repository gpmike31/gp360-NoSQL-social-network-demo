const router = require('express').Router()
const Thought = require('../../models/Thought')
const User = require('../../models/User')
router.get("/",async(req,res)=>{
    try {
        var AllThoughts = await Thought.find({})
        res.status(200).json(AllThoughts)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

router.get("/:id",async(req,res)=>{
    try {
        var SingleThought = await Thought.findById(
            {_id:req.params.id}
        )
        res.status(200).json(SingleThought)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

router.post("/",async({body},res)=>{
    try {
        Thought.create(body).then(async(dbthought)=>{
            console.log(dbthought._id);
            var UpdatedUser=await User.updateOne(
                {username:body.username},
                {$addToSet:{thoughts:dbthought._id}})
            res.status(200).json(UpdatedUser)
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

router.delete("/all",async(req,res)=>{
    try {
        var emptydoc = await Thought.deleteMany({})
        res.status(200).json(emptydoc)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})
router.put("/:id",async({params,body},res)=>{
    try {
        var UpdatedThought=await Thought.findByIdAndUpdate(
            {_id:params.id},
            body,
            {new:true}
        )
        res.status(200).json(UpdatedThought)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

router.delete("/:id",async({params},res)=>{
    try {
        var DeletedThought = await Thought.findByIdAndDelete({_id:params.id})
        res.status(200).json(DeletedThought)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

router.post("/:thoughtId/reactions",async({params,body},res)=>{
    try {
        var UpdatedThought = await Thought.findByIdAndUpdate(
            {_id:params.thoughtId},
            {$addToSet:{reactions:body}}
        )
        res.status(200).json(UpdatedThought)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

router.delete("/:thoughtId/reactions/:reactionId",async({params},res)=>{
    try {
        var UpdatedThought = await Thought.findByIdAndUpdate(
            {_id:params.thoughtId},
            {$pull:{reactions:{_id:params.reactionId}}}
        )
        res.status(200).json(UpdatedThought)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

module.exports=router