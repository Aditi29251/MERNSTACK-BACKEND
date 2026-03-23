const { fileLoader } = require('ejs')
const express=require('express')
const app=express()

// middleware to serve static files 
app.use(express.static('public/'))

app.get('/',(req,res)=>{
    // res.send("<h1>Home page </h1>")

    // use to render html page
    res.render('home.ejs')
})

app.get('/about',(req,res)=>{

    const obj={
        "id":1,
        "name":"Aditi",
        "email":"aditi@gmail.com"
    }
        //data traversing
        // passing data to ejs file   
        // data must be in a object while passing 
        
        // result act as a wrapper
        const result={data:obj}

        res.render('about.ejs',result)
    // res.send("<h1>About page </h1>")
})

app.get('/contact',(req,res)=>{
    res.render('contact.ejs')
})

// fallback routing 
app.use((req,res)=>{
    res.send("<h1>401 page not found</h1>")
})

const port=3000
const host='127.0.0.1'

app.listen(port,host,()=>{

    console.log(`server is running http://${host}:${port}`)

})









// *******************************************************************************************
    // <!-- syntax
    // logical code - if for looping conditon
    
    // <% if () %>

    // <% } %>


    // 2- as a html content 
    //  <%- html %>

    
    // 3- as text content

    // <%= text content  %>

    // 4- import one ejs into another 

    // <%- include('home.ejs') %>



