const http = require('http')
const url=require('url')


const app = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write("<h1>Node Js Server Up</h1>")

    const url_link="https:www.google.com/search?q=amazon&rlz=1C1RXQR_enIN1120IN1120&oq=amaz&gs_lcrp=EgZjaHJvbWUqEAgAEAAYgwEY4wIYsQMYgAQyEAgAEAAYgwEY4wIYsQMYgAQyEwgBEC4YgwEYxwEYsQMY0QMYgAQyBggCEEUYOTINCAMQABiDARixAxiABDIKCAQQABixAxiABDINCAUQABiDARixAxiABDINCAYQABiDARixAxiABDIGCAcQBRhA0gEIMjI1OWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8"
    const result=url.parse(url_link,true)
    // res.write(JSON.stringify(result))
    console.log(result)

    res.end()
})

const PORT = 3000
const HOST = '127.0.0.1'

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})

// to pass or to fetch url data we use 'url'