const http=require('http')
const url=require('url')
const app=http.createServer((req,res)=>{

    res.writeHead(200,{'content-type': 'text/html'})

    var urldata=url.parse(req.url,true)
    console.log(urldata)

    const menu=`
    
    <ul>
    <li><a href='/'>Home</a></li>
    <li><a href='/about'>About</a></li>
    <li><a href='/contact'>About</a></li>
    </ul>
    `

    if(urldata.pathname==='/'){
        res.write(menu)
        res.write("<h1>Home page </h1>")
    }

    else if(urldata.pathname==='/about'){
        res.write(menu)
        res.write("<h1>About page</h1>")
    }

    else if(urldata.pathname==='/contact'){
    res.write(menu)
    res.write("<h1>Contact page </h1>")
    }

    else{
        res.write(menu)
        res.write("<h1>404 page not found</h1>")
    }
})

const port=3000
const host='127.0.0.1'

app.listen(port,host,()=>{
    console.log(`server is running on http://${host}:${port}`)
})