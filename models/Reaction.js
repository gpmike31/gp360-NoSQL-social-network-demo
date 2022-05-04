const { Schema, model } = require('mongoose');

const ReactionSchema= new Schema({
    reactionId:{
        type:Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    reactionBody:{
        type:String,
        required:'Reaction body is required',
        max:280,
    },
    username:{
        type:String,
        required:'Username is required'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Reaction = model('Reaction', ReactionSchema);
module.exports = Reaction;