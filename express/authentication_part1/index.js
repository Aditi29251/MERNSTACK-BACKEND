const express = require('express')
const app = express()

const PORT = 3000
const HOST = '127.0.0.1'

const bcrypt = require('bcryptjs')
const session = require('express-session')

// Middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Session
app.use(session({
    secret: "Aditi",
    resave: false,
    saveUninitialized: false
}))

// DB
require('./config/db')

// Model
const userSchema = require('./model/userSchema')


// ================= ROUTES =================

// 🔹 Login Page
app.get('/', (req, res) => {
    return res.render('login.ejs')
})


// 🔹 Signup Page
app.get('/signup', (req, res) => {
    return res.render('signup.ejs')
})


// 🔹 Signup
app.post('/signup', async (req, res) => {
    try {
        const { userName, userEmail, userPass, userPhone } = req.body

        // Validation
        if (!userName || !userEmail || !userPass || !userPhone) {
            return res.send(`<script>
                alert("All fields required");
                window.location.href='/signup'
            </script>`)
        }

        // Hash password
        const hashpassword = await bcrypt.hash(userPass, 10)

        // Save user
        const result = new userSchema({
            userName,
            userEmail,
            userPass: hashpassword,
            userPhone
        })

        await result.save()

        console.log(" User Registered")

        return res.send(`<script>
            alert("Profile created");
            window.location.href='/'
        </script>`)

    } catch (err) {
        console.log(" Signup Error:", err)
        return res.send("Error")
    }
})


// 🔹 Login
app.post('/login', async (req, res) => {
    try {

        const { userName, userPass } = req.body

        // Validation
        if (!userName || !userPass) {
            return res.send(`<script>
                alert("All fields required");
                window.location.href='/'
            </script>`)
        }

        // Check user
        const user = await userSchema.findOne({ userName })

        if (!user) {
            return res.send(`<script>
                alert("User not exists !!");
                window.location.assign("/")
            </script>`)
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(userPass, user.userPass)

        if (!isPasswordMatch) {
            return res.send(`<script>
                alert("Invalid password !!");
                window.location.assign("/")
            </script>`)
        }

        // Create session
        req.session.loginId = user._id

        console.log(" Session:", req.session.loginId)

        // Redirect
        return res.send(`<script>
            alert("Login Successfully");
            window.location.assign("/dashboard")
        </script>`)

    } catch (err) {
        console.error(" Login Error:", err)
        return res.send("Error")
    }
})


//  Dashboard (Protected)
// app.get('/dashboard', (req, res) => {

//     // Not logged in
//     if (!req.session.loginId) {
//         return res.send(`<script>
//             alert("Session expired, please login");
//             window.location.href="/"
//         </script>`)
//     }

//     // Logged in
//     return res.render("dashboard.ejs")

//     // OR if you want session id only:
//     // return res.send(req.session.loginId)
// })

app.get('/dashboard',(req,res)=>{
    if(req.session.loginId)
    {
        return res.render('dashboard.ejs')
    }
    else{
        res.redirect('/')
    }
})

app.get('/msg',(req,res)=>{

    if(req.session.loginId)
    {
        res.send("<h1>Msg page open</h1>")
    }
    else{
            res.redirect('/')
    }
   
})


// Logout
app.get('/logout', (req, res) => {

    req.session.destroy(() => {
        return res.send(`<script>
            alert("Log out successfully");
            window.location.assign("/")
        </script>`)
    })
})

// ================= SERVER =================
app.listen(PORT, HOST, () => {
    console.log(` Server running at http://${HOST}:${PORT}`)
})