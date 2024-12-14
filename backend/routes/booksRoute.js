import express from 'express'
import { Book } from '../models/bookModel.js';
const router = express.Router();

router.post("/", async(req,response)=>
{
    try
    {
if(!req.body.title||!req.body.author||!req.body.publishYear)
{
  return response.sendStatus(400).send({
    message:'Send all required fields:title,author,publishYear',
  })  
}
const newBook = {
    title:req.body.title,
    author:req.body.author,
    publishYear:req.body.publishYear
};
const book = await Book.create(newBook);
response.send(book);
    }
    catch(error)
    {
        console.log(error.message);
        response.status(500).send({message:error.message})
    }
})

router.get("/", async(req,res)=>
    {
        try
        {
            const books = await Book.find();
        res.status(200).json(books);
        }
        catch(e)
        {
            console.log(e.message);
        }
    })
    router.put('/:id',async(req,res)=>
    {
     try{
        if(!req.body.title||!req.body.author||!req.body.publishYear)
            {
              return res.send(400).send({
                message:'Send all required fields:title,author,publishYear',
              })  
            }
            const {id} = req.params;
const result = await Book.findByIdAndUpdate(id,req.body);
if(!result)
{
  return res.status(404).json({message:"Book Not Found"});
}
return res.status(200).send({
    message:"Book updated Successfully"
})
     }  
     catch(error)
     {
        console.log(error.message);
        res.send(500).send({message:error.message})
     } 
    }
    )
    router.get("/:id", async(req,res)=>
        {
            
            try
            {
                const {id} = req.params;
                const books = await Book.findById(id);
            res.status(200).json(books);
            }
            catch(e)
            {
                console.log(e.message);
            }
        })
router.delete("/:id", async(req,res)=>
{
    try{
    const {id} = req.params;
    const result = await Book.findByIdAndDelete(id);
    if(!result)
    {
      return res.status(404).json({message:"Book Not Found"});
    }
    return res.status(200).send({
        message:"Book deleted Successfully"
    })
         }  
         catch(error)
         {
            console.log(error.message);
            res.send(500).send({message:error.message})
         } 
        }
)
export default router;