const express = require('express');
const app = express();

app.set('view engine', 'ejs');

// Course Data
const courses = [
  { id: 1, name: "MERN Stack", duration: "6 Months", fees: 25000 },
  { id: 2, name: "Python Full Stack", duration: "5 Months", fees: 20000 },
  { id: 3, name: "Java Development", duration: "4 Months", fees: 18000 }
];

// Home Page
app.get('/', (req, res) => {
  res.render('home', { total: courses.length });
});

// About Page
app.get('/about', (req, res) => {
  res.render('about');
});

// All Courses
app.get('/courses', (req, res) => {
  res.render('course', { courses });
});

// Single Course Details
app.get('/course/:id', (req, res) => {

  const id = parseInt(req.params.id); 
  const course = courses.find(c => c.id === id);

  res.render('course_details', { course });
});

// Server
const port = 3000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
