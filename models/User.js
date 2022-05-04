const { Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema({
    username:{
        type: String,
        trim: true,
        required: 'Username is required',
        unique: true
    },
    email:{
        type: String,
        required: 'Email is required',
        unique: true,
        match: [/.+@.+\..+/]
    },
    //array of _id values referencing the Thought Model
    thoughts:[
        {
            type:Schema.Types.ObjectId,
            ref:'Thought'
        }
    ],
    //array of _id values referencing the User Model
    friends:[
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ]
});

UserSchema.virtual('friendCount').get(function(){
    console.log(this.friends);
    return this.friends.length
});


const User = model('User', UserSchema);

module.exports = User;