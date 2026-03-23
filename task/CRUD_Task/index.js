const express=require('express')
const app=express()


app.use(express.urlencoded({extended:true}))
app.use(express.static('public/'))
app.use(express.json())


const connection=require('./config/db') 

const sliderSchema=require('./model/sliderSchema')

const multer=require('multer')

const storage=multer.diskStorage({

    destination:"public/upload",
    filename:(req,file,cb)=>{

        cb(null,Date.now()+"_"+file.originalname)
    }
})

const upload=multer({storage:storage})



app.get('/',(req,res)=>{
    res.render('home.ejs')
})

app.post('/saveform',(req,res)=>{
    res.send(req.body)
})







const port=3000
const host='127.0.0.1'

app.listen(port,host,()=>{
    console.log(`server is running on http://${host}:${port}`)
})