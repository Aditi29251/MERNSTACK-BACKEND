const express=require('express')

const app=express()

// middleware 

app.use(express.urlencoded({extended:true}))

app.use(express.static('public/'))

var url=require('url')

const connection=require('./config/db_connection')


const empSchema=require('./model/empSchema')

const host='127.0.0.1'
const port=3000


app.get('/',(req,res)=>{
    res.render('home.ejs')
    
})

app.post('/saveform',async(req,res)=>{

    try{
        // if succed
        const result=new empSchema(req.body)
        await result.save()
         res.send("Registration done")
        
    }catch(err){
        // if server error
        res.send("Internal server error")
        console.log(err)
    }

    //  res.send(req.body)
})

app.listen(port,host,(req,res)=>{
    console.log(`server is running on http://${host}:${port}`)
})