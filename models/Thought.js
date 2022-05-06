const {Schema, model}= require("mongoose")
const ReactionSchema=require("./Reaction")
const ThoughtSchema=new Schema(
    {
        thoughtText:{
            type:String,
            trim:true,
            required:"Thought text required"
        },
        createdAt:{
            type:Date,
            default:Date.now
        },
        username:{
            type:String,
            required:"Username required"
        },
        reactions:['${ReactionSchema}']
    }
)
ThoughtSchema.virtual("reactionCount").get(function(){
    console.log(this.reactions);
    return this.reactions.length
})

const Thought = model("Thought",ThoughtSchema)
module.exports=Thought