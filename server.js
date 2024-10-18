const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fs = require('node:fs');
const path = require('path');
const port = 5499;
const app = express();
app.use(
	express.json(),
	express.urlencoded({
		extended: true,
  }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({secret:'secret-key'}));

const loginPath = path.join(__dirname, 'data','users.txt');
const availablePath = path.join(__dirname, 'data','available.txt');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  console.log("GET /");
  res.render('pages/home');
});

app.get('/sign', (req, res) => {//displays sign ejs page
  console.log("GET /");
  res.render('pages/sign');
});

app.post('/sign', (req, res) => {//verifies if user input is in file, if username and password are good, session starts, if no username, add username/password to file and session starts, if username but not password, no session
  console.log('POST sign');
  const {username,password} = req.body;
  fs.readFile(loginPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('opened txt file');
    const userPairs = data ? data.split('\n'):[];
    console.log('got userPairs');
    const users = userPairs.map(line=>line.split(':'));
    var output;
    for (i=0;i<userPairs.length;i++){
      if(users[i][0]===username){//if username matches somehting in file
        if(users[i][1].trim()===password){//if password matches corresponding username
          output = {user:username,message:"Logged in successfully!"};
          console.log('found user/pass');
          req.session.username = username;
          res.render('pages/signed_res',output);
          return;
        }
        else{//if password doesn't correspond to username
          output = {user:username,message:"Expected a different password."};
          res.render('pages/signed_res',output);
          return;
        }
      }
    }
    info = username + ':' + password;
    fs.appendFile(loginPath, info, function (err) {//if no user found, add user to file
      if (err) throw err;
      console.log(`Appended file ${loginPath}`);
    });
    output = {user:username,message:"Successfully registered! Logged in successfully!"};
    console.log('added user');
    req.session.username = username;
    res.render('pages/signed_res',output);
  });
});

app.get('/logout', (req, res) => {//terminates user session
  console.log("GET logout");
  req.session.destroy(err => {
    if(err) {
        console.log('Error terminating session');
        return;
    }
    console.log('Session ended');
});
  res.render('pages/logout');
});

app.get('/catcare', (req, res) => {//displays catcare ejs page
  console.log("GET catcare");
  res.render('pages/catcare');
});

app.get('/contact', (req, res) => {//displays contact ejs page
  console.log("GET  contact");
  res.render('pages/contact');
});

app.get('/dogcare', (req, res) => {//displays dogcare ejs page
  console.log("GET  dogcare");
  res.render('pages/dogcare');
});

app.get('/findcatdog', (req, res) => {//displays dogcare ejs page
  console.log("GET findcatdog");
  res.render('pages/findcatdog');
});


app.post('/search', (req, res) => {
  console.log('POST search');
  if(req.body.breed1){
    breed = req.body.breed1;
  }
  else{
    breed = req.body.breed2;
  }
  var info = req.body.petType + ':' + breed + ':' + req.body.age + ':' + req.body.gender + ':' + req.body.compatibility;
  var resultArr = [];
  fs.readFile(availablePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    dataArr = data.split('\n');
    for(i = 0;i<dataArr.length;i++){
      if(dataArr[i].includes(info)){
        resultArr.push(dataArr[i]);
        //console.log(dataArr[i]);
        continue;
      }
      entry = dataArr[i].split(':');
      condition = true;
      for(j = 2;j<6;j++){//2 to 6 because 0-1 are useless and 7-9 are also useless for the search, and 6 should be the other way around
        if(!info.includes(entry[i])){
          condition = false;
          break;
        }
      }
      if(condition && entry[6].includes(req.body.compatibility)){
        resultArr.push(dataArr[i]);
      }
    }
    console.log(resultArr[0]);
    var outputArr = [];
    //console.log('Started producing outputArr');
    //console.log(resultArr.length);
    length = resultArr.length;
    for(k = 0;k<length;k++){
      //console.log('Inside last loop');
      //console.log(resultArr[k]);
      entry = resultArr[k].split(':');
      //console.log(entry);
      tmp = 'Pet type: ' + entry[2] + '\n'
       + 'Breed: ' + entry[3]  +  '\n'
       + 'Age: ' + entry[4] + '\n'
       + 'Gender: ' + entry[5] + '\n'
       + 'Compatibility: ' + entry[6] + '\n'
       + 'Comments: ' + entry[7] + '\n'
       + 'Current owner\'s name: ' + entry[8] + '\n'
       + 'Current owner\'s email: ' + entry[9] + '\n';
      outputArr.push(tmp);
    }
    res.render('pages/catdogsearch',{outputArr:outputArr});
  });
  
});

/*This first verifies if the user has started a session. If not, displays sign ejs page.
If there is a session, displays givepet ejs page */
app.get('/givepet', (req, res) => {
  console.log("GET givepet");
  if(req.session.username==null){
    res.render('pages/sign');
    return;
  }
  res.render('pages/givepet');
});

app.get('/home', (req, res) => {//displays home ejs page
  console.log("GET home");
  res.render('pages/home');
});

/*This receives information from the form in givepet, formats form data and writes it to corresponding txt file */
app.post('/giveAway', (req, res) => {
  console.log('POST giveAway');
  fs.readFile(availablePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    dataArr = data.split('\n');
    lines = dataArr.length;
    if(req.body.breed1){
      breed = req.body.breed1;
    }
    else{
      breed = req.body.breed2;
    }
    info =lines + ':' + req.session.username + ':' + req.body.petType + ':' + breed + ':' + req.body.age + ':' + req.body.gender + ':' + req.body.compatibility + ':' + req.body.comments + ':' + req.body.ownerName + ':' + req.body.ownerEmail + '\n';

    fs.appendFile(availablePath, info, function (err) {//if no user found, add user to file
      if (err) throw err;
      console.log(`Appended file ${availablePath}`);
    });
});
  res.render('pages/givepet');
});

app.get('/privacydisclaimer', (req, res) => {//displays home ejs page
  console.log("GET privacydisclaimer");
  res.render('pages/privacydisclaimer');
});


app.post('/', (req, res) => {
  console.log('Got body:', req.body.form);
  res.send("Received your request! Name: " + req.body.username);
});

app.listen(port, () => {
  console.log(`A3Q4 listening on port ${port}`);
});

