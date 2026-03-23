const express = require('express')
const app = express()

const PORT = 3000
const HOST = '127.0.0.1'

const bcrypt = require('bcryptjs')
const session = require('express-session')

// EJS setup
app.set('view engine', 'ejs')

// Middleware
app.use(express.static('public/'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// import gmail
const sendGmail=require('./gamilOTP')

//  Session (IMPORTANT FIX)
app.use(session({
    secret: "Aditi",
    resave: false,
    saveUninitialized: true   
}))

// DB
require('./config/db')

// Model
const userSchema = require('./model/userSchema')

// ================= ROUTES =================

//  Login Page
app.get('/', (req, res) => {
    return res.render('login.ejs')
})

//  Signup Page
app.get('/signup', (req, res) => {
    return res.render('signup.ejs')
})

// ================= SIGNUP =================
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

        //  Generate OTP
        let otp = Math.floor(1000 + Math.random() * 9000)

        console.log("Generated OTP:", otp)

        // Store in session
        req.session.OTP = otp
        req.session.userDetails = req.body

        // Redirect to OTP page
        // res.send(`<script>
        //     alert("Your OTP is ${otp}");
        //     window.location.assign('/otppage')
        // </script>`)

         sendGmail(userEmail,otp)
         res.redirect('/otppage')

    } catch (err) {
        console.log("Signup Error:", err)
        return res.send("Error")
    }
})

// ================= OTP PAGE =================
app.get('/otppage', (req, res) => {
    console.log("Session OTP:", req.session.OTP)
    res.render('otppage.ejs')
})

// ================= VERIFY OTP =================
app.post('/verify-otp', async (req, res) => {
    try {

        console.log("Body Data:", req.body)

        let otp = req.body.userotp
        let actualOTP = req.session.OTP

        console.log("User OTP:", otp)
        console.log("Actual OTP:", actualOTP)

        if (!otp) {
            return res.send(`<script>
                alert("Enter OTP");
                window.location.href='/otppage'
            </script>`)
        }

        if (otp == actualOTP) {

            const { userName, userEmail, userPass, userPhone } = req.session.userDetails

            const hashpassword = await bcrypt.hash(userPass, 10)

            const result = new userSchema({
                userName,
                userEmail,
                userPass: hashpassword,
                userPhone
            })

            await result.save()

            console.log("User Registered")

            // Clear session
            req.session.OTP = null
            req.session.userDetails = null

            return res.send(`<script>
                alert("Happy to onboard you 🎉");
                window.location.href='/'
            </script>`)

        } else {
            return res.send(`<script>
                alert("Invalid OTP ");
                window.location.href='/otppage'
            </script>`)
        }

    } catch (err) {
        console.log("OTP verification error:", err)
        return res.send("Error")
    }
})

// ================= LOGIN =================
app.post('/login', async (req, res) => {
    try {
        const { userName, userPass } = req.body

        if (!userName || !userPass) {
            return res.send(`<script>
                alert("All fields required");
                window.location.href='/'
            </script>`)
        }

        const user = await userSchema.findOne({ userName })

        if (!user) {
            return res.send(`<script>
                alert("User not exists !!");
                window.location.assign("/")
            </script>`)
        }

        const isPasswordMatch = await bcrypt.compare(userPass, user.userPass)

        if (!isPasswordMatch) {
            return res.send(`<script>
                alert("Invalid password !!");
                window.location.assign("/")
            </script>`)
        }

        // Create session
        req.session.loginId = user._id

        console.log("Session ID:", req.session.loginId)

        return res.send(`<script>
            alert("Login Successfully");
            window.location.assign("/dashboard")
        </script>`)

    } catch (err) {
        console.error("Login Error:", err)
        return res.send("Error")
    }
})

// ================= DASHBOARD =================
app.get('/dashboard', (req, res) => {
    if (req.session.loginId) {
        return res.render('dashboard.ejs')
    } else {
        res.redirect('/')
    }
})

// ================= MSG =================
app.get('/msg', (req, res) => {
    if (req.session.loginId) {
        res.send("<h1>Msg page open</h1>")
    } else {
        res.redirect('/')
    }
})

// ================= LOGOUT =================
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