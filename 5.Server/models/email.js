const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const emailSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }


},{timestamps:true});

const Email = mongoose.model('Email',emailSchema);

module.exports=Email;