const express=require('express')
const app=express()
app.set('view engine','ejs')

var url=require('url')

// middleware for post method
app.use(express.urlencoded({extended:true}))

app.use(express.static('public/'))

app.get('/',(req,res)=>{

    res.render('home.ejs')

})

app.get('/saveform',(req,res)=>{

 

    var urldata=url.parse(req.url,true)

    const obj={data:urldata.query}
    res.render('profile.ejs',obj)
})


app.post('/saveform',(req,res)=>{

    const obj={ data: req.body }

    res.render('profile.ejs',obj)
})



const port=3000
const host='127.0.0.1'


app.listen(port,host,()=>{

    console.log(`server is running in http://${host}:${port}`)
})