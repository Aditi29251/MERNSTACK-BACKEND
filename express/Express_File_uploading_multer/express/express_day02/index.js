const express = require('express')
const app = express();

// built in middleware to serve statci file 
app.use(express.static('public/'))

const menu = `
<ul>
<li><a href="/">Home</a> </li>
<li><a href="/about">About</a> </li>
<li><a href="/contact">Contact</a></li>

</ul>
`

app.get('/', (req, res) => {
    res.send(menu + "<h1>Home page</h1>")
})
app.get('/about', (req, res) => {
    res.send(`${menu}
        <h1>About page</h1>
        <img src="/wallppr.jpg" alt="wallpaper">
    `)
})


app.get('/contact', (req, res) => {
    const obj = {
        id: 1,
        name: "Aditi",
        email: "aditi@gmail.com"
    }
    res.json(obj)   
})

app.get('/contact/contact1', (req, res) => {
    res.send(menu + "<h1>Contact Page 1</h1>")

    
})

app.use((req, res) => {
    res.status(404).send("<h1>404 - Page Not Found</h1>")
})


const port = 3000
const host = '127.0.0.1'

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})

// template engine
// 
