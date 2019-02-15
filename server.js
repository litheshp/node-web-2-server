const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  fs.appendFile('serverlog.log',log +'\n',(err)=>{
    if(err){
      console.log('Unable to update log file');
    }
  })
  next();
});
//app.use((req,res,next)=>{
//  res.render('maintenance.hbs',{
//    pageTitle:"We'll be right back",
//    maintenanceMsg:"the site is currently being updated"
//  })
//});

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
})
hbs.registerHelper('capsLock',(text)=>{
  return text.toUpperCase();
});
app.set('view engine','hbs');

app.get('/',(req,res) =>{
  //res.send("<h1>Welcome to My App</h1>")
  res.render('home.hbs',{
    pageTitle:"Home Page",
    welcomeMsg:'Welcome to my website'
  })
});
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:"About Page"
  });
});
app.get('/project',(req,res)=>{
  res.render('project.hbs',{
    pageTitle:"New Project",
    welcomeMsg:"Welcome to the protfolio"
  })
});
app.get('/bad',(req,res)=>{
  res.send({error:{errorMessage:'Bad request',
  code:400
  }})
});
app.listen(port,()=>{
  console.log(`Server is running, localhost: ${port}`)
});
app.use(express.static(__dirname+'/public'));
