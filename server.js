var express = require("express");
 
const bodyParser = require('body-parser');



//use the application off of express.
var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var names_easy =[];
var names_medium= [];
var names_hard = [];
var easy_marks = 0;
var medium_marks = 0;
var hard_marks = 0;
var all = [];


app.get("/", function (request, response){
  names_easy = [];
  names_hard = [];
  names_medium = [];
  all = [];
    response.sendFile(__dirname+"/views/addq.html");
});


app.post('/objects', (req, res) => {
  
    var object = req.body;
    var a = object.user_question;
    var b = object.user_subject;
    var c = object.user_topic;
    var d = object.user_marks;
    var e = object.user_difficulty;
    // var e = object.id;
    try{
    if ((a != "") && ( b == "") && (c != "") || (d != null && d != 0)) {
      all.push(object);
      if(e === "Easy") {
        names_easy.push(object);
      }
      
      if(e === "Medium") {
        names_medium.push(object);
      }
      
      if(e === "Hard") {
        names_hard.push(object);
      }
      
    }
  }
  catch(error) {
    console.log(error);
  }
    res.sendFile(__dirname+"/views/addq.html");
  });
  
  app.post('/show', (req, res) => {

    res.render('all', { questions: all }); 
  });

  app.post('/create', (req, res) => {

    res.sendFile(__dirname+"/views/createq.html");

  });

  app.post('/clear', (req, res) => {
    
    names_easy = [];
    names_hard = [];
    names_medium = [];
    all = [];
    res.sendFile(__dirname+"/views/addq.html");
  });

  app.post('/qpapers', (req, res) => {
    try {
      var object = req.body;
    var a = object.user_totalMarks;
    var b = object.Easy;
    var c = object.Medium;
    var d = object.Hard;
    easy_marks = object.user_EasyMarks;
    medium_marks = object.user_MediumMarks;
    hard_marks = object.user_HardMarks;
    // var e = object.id;
    if( b === null || c === null || d === null || easy_marks === null || medium_marks === null || hard_marks === null )
    res.send("no value entered for any one or more than one of the field");
    if(b < 0 || c < 0 || d < 0 || hard_marks < 0 || easy_marks < 0 || medium_marks < 0)
    res.send("Field value less than 0");
    // if( b + c + d  !== 100 )
    // res.send("sum of Percentages is not equal to 100%");

  //random number generator
    function randomNumbers(n) {
      const numbers = Array.from({ length: n }, (_, i) => i + 0);
      numbers.sort(() => Math.random() - 0.5);
      return numbers.slice(0, n);
    }

    var names = [];
    if(easy_marks != 0) {
      var es = ((a*b)/100)/easy_marks;

      var rd = randomNumbers(names_easy.length);
      for( var i = 0 ; i < es ; i++ ) {
        names.push(names_easy[rd[i]]);
      }
    }
    if(medium_marks != 0) {
      var es = ((a*c)/100)/medium_marks;
      // if(es > names_medium.length)
      // res.send("Low number of Medium questions");

      var rd = randomNumbers(names_medium.length);
      for( var i = 0 ; i < es ; i++ ) {
        names.push(names_medium[rd[i]]);
      }
    }
    if(hard_marks != 0) {
      var es = ((a*d)/100)/hard_marks;
      // if(es > names_hard.length)
      // res.send("Low number of easy questions");

      var rd = randomNumbers(names_hard.length);
      for( var i = 0 ; i < es ; i++ ) {
        names.push(names_hard[rd[i]]);
    }
    }
    } catch(err) {
      console.log(err);
    };
    res.render('StudentQuestionsPage', { questions: names }); 
    
  });

  // Start the server
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });