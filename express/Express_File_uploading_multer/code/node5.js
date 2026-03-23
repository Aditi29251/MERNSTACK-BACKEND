const http = require('http')

const app = http.createServer((req, res) => {
   
    res.write("Welcome to node js")

    // console.log(undefine + 1)
    
    // console.log(null + 1)

    console.log(true + false)

    console.log("5"+ 3)
    console.log("5" * 3)
    console.log("5" / 0)
    console.log("5"-3)
    console.log(NaN+1)
    console.log(typeof null)
    console.log("10" === 10)
    console.log("10" == 10)
    console.log(false == "0");
    console.log(false === "0");
    
    res.end()
})

const PORT = 3000
const HOST = '127.0.0.1'

app.listen(PORT, HOST, () => {
    
    console.log(`Server is running on http://${HOST}:${PORT}`)
})
