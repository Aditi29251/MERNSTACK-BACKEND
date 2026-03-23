const express=require('express')
const app=express()

const host='127.0.0.1'
const port=3000

app.use(express.static('public/'))
app.use(express.urlencoded({extended:true}))

const connection=require('./config/db')

const userSchema=require('./model/userSchema')

app.use(express.json())

// multer
const multer=require('multer')

// multer config code
// Returns a StorageEngine implementation configured to store files on the local file system.

const storage=multer.diskStorage({
    destination:'public/upload/',
    filename:(req,file,cb)=>{

        cb(null,Date.now()+"_"+file.originalname)


    }
})

// middle to connect
// config storage
const upload=multer({storage:storage})

app.get('/',(req,res)=>{
        res.render('home.ejs')
})

app.post('/signup',upload.single('userProfile'),async(req,res)=>{

    try{
            // res.send(req.body)
            // res.send(req.file)
            const {userName,userEmail,userPassword,userPhone}=req.body
            const userProfile=req.file.filename
            const result=new userSchema({userName,userEmail,userPassword,userPhone,userProfile})

                result.save()

                res.send("Profile created")

    }catch(err){

            console.log("internal err")
    }


})

app.listen(port,host,()=>{
    console.log(`server is running on http://${host}:${port}`)
})