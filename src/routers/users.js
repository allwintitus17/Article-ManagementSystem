const express=require('express')
const User=require('../models/users')
const auth=require('../middleware/auth')
const router=new express.Router();


router.post('/users',async(req,res)=>{
    const user = new User(req.body)

    try{
        await user.save()
        const token=await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/login',async (req,res)=>{
      try{  
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()

        res.send({user,token})
      }catch(e){
         res.status(400).send()
      }
})

router.get('/users/me',auth,async(req,res)=>{

    res.send(req.user)
})
router.post('/users/logout',auth,async(req,res)=>{
    try{
         req.user.token= req.user.tokens.filter((token)=>{
             return token.token!==req.token
         })
         await req.user.save()
         res.send()
    }catch(e){
        res.send(500).send()
    }
})

router.post('/users/logoutAll',auth,async(req,res)=>{

    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }catch(e){
        res.send(500).send()
    }
})
router.get('/users/:id',async(req,res)=>{
      
    const _id=req.params.id
    try{
        const user=await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }

})

// router.patch('/users/me', auth ,async(req,res)=>{
//     const updates=Object.keys(req.body);
//     const allowedUpdates=['name','email','password','age']
//     const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))

//     if(!isValidOperation){
//         return res.status(400).send({error:'invalidUpdates'})
//     }try{
//         const user=await User.findById(req.params.id)
//         updates.forEach((update)=>user[update]=req.body[update])
//         await user.save()
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//         console.log("Users details Got Updated");
//     }catch(e){
//         res.status(400).send(e)
//     }
// })
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        // `auth` middleware should attach the user information to the `req` object.
        const user = req.user;

        if (!user) {
            return res.status(404).send();
        }

        // Apply updates to the user object
        updates.forEach((update) => user[update] = req.body[update]);

        // Save the updated user object
        await user.save();

        res.send(user);
        console.log("User details updated");
    } catch (e) {
        res.status(400).send(e);
    }
});


router.delete('/users/me', auth, async (req, res) => {
    try {
        // `auth` middleware should attach the user information to the `req` object.
        const user = await User.findOneAndDelete({ _id: req.user._id });

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports=router;