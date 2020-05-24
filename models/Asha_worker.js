const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const AshaWorkerSchema=new Schema({
    _id:Schema.Types.ObjectId,
    name: String,
    subcenter:String,
    Village:String
   
},{collection:"Asha_worker"});

module.exports=mongoose.model('Asha_worker',AshaWorkerSchema);