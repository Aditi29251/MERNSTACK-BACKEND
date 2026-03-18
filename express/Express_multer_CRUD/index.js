const express=require('express')
const app=express()

const host='127.0.0.1'
const port=3000

app.use(express.static('public/'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// db connection config
const connection=require('./config/db')

// schema config

const profileSchema=require('./model/profileSchema')

// multer config

const multer=require('multer')


const storage=multer.diskStorage({
    destination:"public/upload",
    filename:(req,file,cb)=>{

        cb(null,Date.now()+"_"+file.originalname)
    }
})

const upload=multer({storage:storage})


// form handlin
app.post('/saveform', upload.single("userProfile"), async (req,res)=>{
    try{

        // res.send(req.body)
        // res.send(req.file)
  
        const{userName,userEmail,userPass}=req.body
        // const userProfile=req.file.filename
        const userProfile = req.file ? req.file.filename : null;


        const result=new profileSchema({userName,userEmail,userPass,userProfile})
        await result.save()
    //    return res.send("<h1>Profile created</h1>")

    // return res.redirect("profiles")

    return res.send(` <script>
        alert("profile created successfully");
        window.location.href='/profiles'
        </script>`)

    }catch(err){

        res.send("Internal error",err)
        console.log("internal error",err)
    }
})

// Read operation

app.get('/profiles', async (req, res) => {

    try {

        const result = await profileSchema.find()

        console.log(result)   // check MongoDB data
        const obj={data:result}

        res.render("profiles.ejs",obj)

      

    } catch (err) {
        console.log(err)
    }

})



app.get('/',(req,res)=>{

    res.render('signup.ejs')
})

app.get('/delete/:id',async(req,res)=>{
    try{

        const id=req.params.id
        await profileSchema.findByIdAndDelete(id)

        res.redirect('/profiles')

    }catch(err){

        console.log("err",err)
    }
})

app.listen(port,host,()=>{

    console.log(`server is up on http://${host}:${port}`)
=======
const { urlencoded } = require('body-parser')
const express=require('express')
const app=express()

const port=3000
const host='127.0.0.1'

var url=require('url')

// import db connection

const connection=require('./config/Db_connection')

// post method middleware
app.use(express.urlencoded({extended:true}))

app.use(express.static('public/'))

app.get('/',(req,res)=>{
    // res.send("Welcome to the mongoDb")
    res.render('home.ejs')

})

app.get('/signup',(req,res)=>{

    res.render('signup.ejs')

})

// app.get('/saveform',(req,res)=>{

//     var urldata=url.parse(req.url,true)
//     console.log(urldata.query)

//     // res.send(urldata.query)

//     const obj={data:urldata.query}
//     res.render('userData.ejs',obj)


    
// })

app.post('/saveform',(req,res)=>{

    const obj={data:req.body}

    // database



    res.render('userData.ejs',obj)
})

app.listen(port,host,()=>{
    console.log(`server is running http://${host}:${port}`)
>>>>>>> 8fc1dee6d4ddd7f1ce2ef3419f39d57d5e1c4d7f
})