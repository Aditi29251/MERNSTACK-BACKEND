const express=require('express')
const app=express()


app.use(express.static('public/'))

var url=require('url')


app.get('/',(req,res)=>{

    res.render('home.ejs')
})

app.get('/signup',(req,res)=>{

    res.render('signup.ejs')
})

app.get('/saveform',(req,res)=>{

    var urldata=url.parse(req.url,true)
    // res.send(urldata.query)
    // res.send("form is successfully submited")

    const obj={data:urldata.query}

    res.render('dashboard.ejs',obj)
})

app.use((req,res)=>{
    res.send("<h1>page not found</h1>")
})

const port=3000
const host='127.0.0.1'


app.listen(port,host,()=>{

    console.log(`server is running in http://${host}:${port}`)
})