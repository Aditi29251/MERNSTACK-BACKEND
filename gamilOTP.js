const nodemailer = require("nodemailer");

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "adudhaktode29@gmail.com",
    pass: "furt mgvz njxk qnfg",
  },
});

// Send an email using async/await
const sendGmail=async(mail,otp) => {
  const info = await transporter.sendMail({
    from: 'additiddhaktode@gmail.com',
    to: mail,
    subject: "verify user account",
    text: "Testing Email", // Plain-text version
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>OTP Verification</title>
<style>
  body {
    margin: 0;
    padding: 0;
    background: #f4f6fb;
    font-family: 'Segoe UI', sans-serif;
  }

  .container {
    max-width: 500px;
    margin: 40px auto;
    background: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }

  .header {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    text-align: center;
    padding: 25px;
  }

  .header h1 {
    margin: 0;
    font-size: 22px;
  }

  .content {
    padding: 30px;
    text-align: center;
  }

  .content p {
    color: #555;
    font-size: 15px;
    margin-bottom: 20px;
  }

  .otp-box {
    display: inline-block;
    background: #f1f3ff;
    padding: 15px 25px;
    font-size: 28px;
    letter-spacing: 8px;
    font-weight: bold;
    color: #333;
    border-radius: 8px;
    margin: 20px 0;
  }

  .footer {
    text-align: center;
    font-size: 12px;
    color: #999;
    padding: 15px;
    border-top: 1px solid #eee;
  }

  .btn {
    display: inline-block;
    margin-top: 15px;
    padding: 10px 20px;
    background: #667eea;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-size: 14px;
  }

  .btn:hover {
    background: #5a67d8;
  }
</style>
</head>

<body>

  <div class="container">
    
    <div class="header">
      <h1>🔐 OTP Verification</h1>
    </div>

    <div class="content">
      <p>Hello,</p>
      <p>Your One-Time Password (OTP) for verification is:</p>

      <div class="otp-box">
        ${otp}
      </div>

      <p>This OTP is valid for <b>5 minutes</b>. Please do not share it with anyone.</p>

      <a href="#" class="btn">Verify Now</a>
    </div>

    <div class="footer">
      If you didn’t request this, you can safely ignore this email.
    </div>

  </div>

</body>
</html>`, // HTML version
  });

  console.log("Message sent:", info.messageId);
};

// sendGmail("aditiddhaktode29@gmail.com",1234)

module.exports=sendGmail