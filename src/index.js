const express = require('express');
const app= express()
const port =3000;
require('./db/mongoose');
const userRouter=require('./routers/users');
const articleRouter=require('./routers/article')
app.use(express.json());
app.use(userRouter);
app.use(articleRouter);
app.listen(port,()=>{
    console.log("The server is running in the port"+port);
})

