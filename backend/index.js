import express from 'express';
import {PORT,mongoDBurl} from "./config.js"
import mongoose from 'mongoose';
import cors from 'cors'
import booksRoute from './routes/booksRoute.js'
const app = express();
app.use(express.json());
app.use(cors());
app.get("/",async (req,res)=>
{
    res.send("hello world");
})
app.use('/books',booksRoute);
mongoose.connect(mongoDBurl).then(()=>
{
    app.listen(PORT,()=>
        {
            console.log(`app listening at port:${PORT}`);
        });
    console.log("connection successfull");
}).catch((err)=>
{
    console.log(err);
})