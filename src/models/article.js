const mongoose=require('mongoose')
const validator=require('validator')
const Article=mongoose.model('Article',{
     
   Name:{
    type:String,
    required:true,
    trim:true,
   },Description:{
    type:String,
    required:true,
    maxLength:100,
    trim:true,
    validate(value){
        if(value.length>100){
            throw new Error('it should be under 100 charecters only')
        }
    }
   },Author:{
          type:String,
          required:true,
          trim:true
   },
   owner:{
     type: mongoose.Schema.Types.ObjectId,
     required:true,
     ref:"User"
   }


});
module.exports=Article;