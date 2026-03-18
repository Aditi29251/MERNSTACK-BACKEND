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
})