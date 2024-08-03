const express = require('express');
const app= express()
const port =3000;
require('./db/mongoose');
// const User=require('./models/users');
// const Article=require('./models/article');
// const jwt=require('jsonwebtoken');
const userRouter=require('./routers/users');
const articleRouter=require('./routers/article')
app.use(express.json());
app.use(userRouter);
app.use(articleRouter);




app.listen(port,()=>{
    console.log("The server is running in the port"+port);
})

// const Article =require('./models/article')
// const User=require('./models/users')

// const main=async()=>{

//      const user=await User.findById("66ae0ae57549dd2aa0e9481d")
//      await user.populate('articles').execPopulate()
//      console.log(user.articles);
// }
// main()