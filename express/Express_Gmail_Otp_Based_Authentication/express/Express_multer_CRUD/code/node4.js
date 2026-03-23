const http = require('http')

const app = http.createServer((req, res) => {

    // Set header for HTML response with status code
    res.writeHead(200, { 'Content-Type': 'text/html' })

    // Write HTML content
    res.write("<input type='text' placeholder='Enter your name'><br><br>")
    res.write("<h1 style='color:red; background-color:aqua; padding:30px;'>Hello</h1>")

    // End response
    res.end()
})

const PORT = 3000
const HOST = '127.0.0.1'

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})
