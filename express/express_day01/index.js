const http=require('http')
const url=require('url')

const app=http.createServer((req,res)=>{

    res.write("Hello")

    res.end;
})

const port=3000
const host='127.0.1'

app.listen(req,res,()=>{
    console.log(`server is running ${host}:${port}`)
})