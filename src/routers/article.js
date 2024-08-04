const express=require('express')
const Articles=require('../models/article');
const auth=require('../middleware/auth')
const router= new express.Router();


router.post('/article',auth,async(req,res)=>{

   // const article=new Articles(req.body);
   const article =new Articles({

        ...req.body,
        owner:req.user._id
   })
    try{
        await article.save()
        res.status(200).send(article)
    }catch(e){
        res.status(400).send(e)
    }
})
router.get('/article', auth, async (req, res) => {
    try {
        // Ensure that the 'articles' virtual field is correctly defined and populated
        await req.user.populate('articles');
        res.send(req.user.articles);
    } catch (e) {
        console.error('Error:', e.message);
        res.status(500).send(e.message);
    }
});


// router.get('/article',auth,async(req,res)=>{
  
//      try{
//         // const article=await Articles.find({owner:req.user._id})
//         await req.user.populate('articles').execPopulate()
//         res.send(req.user.articles)

//      }catch(e){
//         res.status(500).send()
//      }
// })

router.get('/article/:id',auth,async(req,res)=>{
    const _id=req.params.id
    try{
        //const article=await Articles.findById(_id)
        const article=await Articles.findOne({_id,owner:req.user._id})
        if(!article){
            return res.status(404).send()
        }
        res.send(article)
    }catch(e){
        res.status(500).send()
    }
})
// 
router.patch('/article/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['Name', 'Description', 'Author'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        const article = await Articles.findOne({ _id: req.params.id, owner: req.user._id });

        if (!article) {
            return res.status(404).send();
        }

        updates.forEach((update) => article[update] = req.body[update]);
        await article.save();
        
        res.send(article);
        console.log("Article Got Updates");
    } catch (e) {
    
        res.status(400).send(e);
    }
});


router.delete('/article/:id',auth,async(req,res)=>{
    try{
        //  const article=await Articles.findByIdAndDelete(req.params.id)
                const article = await Articles.findOneAndDelete({_id:req.params.id,owner:req.user._id})
         if(!article){
            return res.status(404).send()
         }
        console.log("Article deleted Sucessfully");
    }catch(e){
          res.send(500).send()
    }  
})
module.exports=router;