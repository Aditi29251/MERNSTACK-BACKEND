const http = require('http')
const url=require('url')


const app = http.createServer((req, res) => {
   
    res.write("Welcome to node js")

    
    const result=url.parse(req.url,true)
    console.log(result)

    res.end()
})

const PORT = 3000
const HOST = '127.0.0.1'

app.listen(PORT, HOST, () => {
    
    console.log(`Server is running on http://${HOST}:${PORT}`)
})
