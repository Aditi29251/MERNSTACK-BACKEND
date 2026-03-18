const express=require('express')
const app=express()

app.use(express.static('public/'))

app.get('/',(req,res)=>{

    res.send("Hello")

})

app.get('/user',(req,res)=>{

    res.render('user.ejs')
})

const port=3000
const host='127.0.0.1'

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})
