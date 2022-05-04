const {Schema,model}=require("mongoose")

const UserSchema=new Schema({
    username:{
        type:String,
        trim:true,
        required:"Username is required",
        unique:true
    },
    email:{
        type:String,
        required:"Email is required",
        unique:true,
        match: [/.+@.+\..+/]
    },
    thoughts:[//one to many
        {
            type:Schema.Types.ObjectId,
            ref:"Thought"
        }
    ],
    friends:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ]
})
UserSchema.virtual("friendCount").get(function(){
    console.log(this.friends);
    return this.friends.length
})


const User=model("User",UserSchema)
module.exports=User