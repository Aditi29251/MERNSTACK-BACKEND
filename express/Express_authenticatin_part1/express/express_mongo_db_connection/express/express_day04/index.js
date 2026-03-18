const express=require('express')
const app=express()

app.get('/',(req,res)=>{

    res.render('home.ejs')
})

app.get('/about', (req, res) => {

    const skill = ["HTML", "CSS", "JS", "React", "Node"];
    const user = {
        email: "aditi@gmail.com",
        name: "Aditi"
    };

    const onboard = true;

    const obj = {
        skill,
        ...user,   // spread operator
        onboard
    };

    res.render('about.ejs', obj);
});

app.get('/contact',(req,res)=>{
    res.render('contact.ejs')
})

app.use((req,res)=>{
    // res.send("<h1>404 page not found</h1>")
    res.render('404.ejs')
})


const port=3000
const host='127.0.0.1'

app.listen(port,host,()=>{

    console.log(`server is running in http://${host}:${port}`)
})