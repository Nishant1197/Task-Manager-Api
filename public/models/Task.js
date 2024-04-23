const mongoose=require('mongoose')


const TaskSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is mandatory field'],
        maxlength:[20,'namw field can not be more than 20 characters'],
        trim:true        
    },
    
completed:{
    type:Boolean,
    default:false
}
})

module.exports=mongoose.model('Task',TaskSchema)