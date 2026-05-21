const mongoose=require('mongoose');

const categorySchema= new mongoose.Schema({
    title:{type:String,required:true},
    icon:{type:String,required:true},
    color:{type:String,required:true},
    isDefault:{type:Boolean,default:false},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
})

categorySchema.index(
  { userId: 1, title: 1 },
  { unique: true }
)

module.exports=mongoose.model('Category',categorySchema);