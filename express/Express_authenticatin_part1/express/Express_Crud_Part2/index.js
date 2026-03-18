const express=require('express')
const app=express()

const port=3000
const host='127.0.0.1'

// middlewar
app.use(express.static('public/'))

app.use(express.urlencoded({extended:true}))

// json data parse
app.use(express.json())

const connection=require('./config/db')

const  productSchema=require('./model/product_Schema')

app.get('/',(req,res)=>{
       res.render("home.ejs")
        // res.send("Hello")
})

app.post('/saveform',async(req,res)=>{

     let data = req.body

    // convert checkbox value to boolean
    data.productInStock = data.productInStock === "on"

    try{

        const result=new productSchema(req.body)
        await result.save()
        console.log("product added successfully")
        // res.send("<h1>Product Added</h1>")

        res.redirect("/view_products")

    }catch(err){

        console.log("Product server error",err)
        res.send("Internal server error")

    }
  
})

app.get('/view_products', async(req,res)=>{

    try{

        const result = await productSchema.find()
        console.log("Product data fetch successfully")

        const obj = { data: result }

        res.render('view_products.ejs', obj)

    }catch(err){
        console.log("Internal error")
    }

})

app.get('/deleteProduct/:id',async(req,res)=>{
    try{

        var id=req.params.id

        await productSchema.findByIdAndDelete(id)

        // res.send("Delete product" +id)

        console.log("product deleted successfully")
        res.redirect('/view_products')


    }catch(err){

        console.log("Internal server error")
        console.log(err)
    }
})

// edit operation
app.get('/edit/:id',async(req,res)=>{

    // req.body.productInStock = req.body.productInStock ? true : false;
        try{

            let id=req.params.id
            // res.send("product id "+id)

            // read operation

            const result=await productSchema.findById(id)
            // res.send(result)

            const obj={data:result}
            res.render('edit.ejs',obj)

        }catch(err){

        }
})

app.post('/updateform/:id', async (req, res) => {

    try{

        let id = req.params.id

        // convert checkbox value to boolean
        req.body.productInStock = req.body.productInStock ? true : false

        await productSchema.findByIdAndUpdate(id, req.body)

        res.send("Product updated successfully")

        // res.redirect("/view_products")

    }catch(err){

        console.log("Internal err",err)
    }

})



app.listen(port,host,()=>{
    console.log(`server is running on http://${host}:${port}`)
})