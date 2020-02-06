// Middleware functions can perform the following tasks:

// Execute any code.
// Make changes to the request and the response objects.
// End the request-response cycle.
// Call the next middleware function in the stack.

const express = require('express');
const hbs = require('hbs'); //handlebars
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next) => {  // used for middleware 
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log',log + '\n');
    next();
});

// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public' )); 
// this is used after the maintenace.hbs rendering beacuse the help.html which is present will not show us the maintenance page, to avoid this all we do is print the express.static after the maintenance.hbs


hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear() // it gets the actuall date of the javascript constructor
});  

hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
});

app.get('/',(req,res) =>{
    res.render('home.hbs', {
        pageTitle : 'Home Page',
        WelcomeMessage: 'Hey there! Welcome to our web  page'
    })
});



// app.get('/',(req,res) => {
//     // res.send('Hello Express');
//     // res.send('<h1>Hello Express</h1>');
//     res.send({
//         name:'izuku',
//         likes : [
//             'Almight',
//             'Hero'
//         ]
//     });
// });

app.get('/about',(req,res) => {
    res.render('About.hbs',{
        pageTitle : 'About Page'
    }); // Render is gonna let you render any of the templates you have set up with your current view engine
}); 

app.get('/projects',(req,res) => {
    res.render('projects.hbs', {
        pageTitle:'Projects'
    });
});

app.get('/bad',(req,res) => {
    res.send({
        errorMessage : 'Unable to handle request'
    });
});

app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
});