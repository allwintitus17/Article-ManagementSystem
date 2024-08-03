const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://allwintitus491:bMGpwyEfp4E6SW01@cluster0.6qkkc0b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
  useNewUrlParser:true,
  useUnifiedTopology:true  
});

console.log("Database Connected Sucessfully");