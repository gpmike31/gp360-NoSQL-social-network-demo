const {Schema, model} = require('mongoose');

const reactionSchema = require('./Reaction');

const ThoughtSchema = new Schema({
    thoughtText:{
        type:String,
        trim:true,
        required:'Thought text required',
        maxLength : 280
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    //The user that created this thought
    username:{
        type:String,
        required:'Username required'
    },
    //Array of nested documents created with the reactionSchema
    reactions:[
        reactionSchema
    ]
});

ThoughtSchema.virtual('reactionCount',function(){
    console.log(this.reactions);
    return this.reactions.length
});

const Thought = model('Thought',ThoughtSchema);

module.exports = Thought;