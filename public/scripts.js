function dateTime(){
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var now = new Date();

    var date = "Today is: " + days[now.getDay()] + ", " + now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear() + " " + now.getHours() +":" + now.getMinutes() + ":" + now.getSeconds();
    document.getElementById("date").innerHTML = date;
}
setInterval(dateTime, 1000);

function findAnimal(){
 
    dom = document.getElementById("findAnimal");
    petType = dom.petType.value;
    breed1 = dom.breed1.value;
    breed2 = dom.breed2.checked;
    age = dom.age.value;
    gender = dom.gender.value;
     
    if (!petType || !(breed1||breed2) || !age || !gender) {
        alert("Please fill every option.");
        return false;
      }
    return true;
}
function findAnimalRequest(){
    document.getElementById("findAnimal").onsubmit = findAnimal;
}

function giveAway(){
    dom = document.getElementById("giveAway");
    petType = dom.petType.value;
    breed1 = dom.breed1.value;
    breed2 = dom.breed2.checked;
    age = dom.age.value;
    gender = dom.gender.value;
    compatibility = dom.compatibility.value;
    comments = dom.comments.value;
    ownerName = dom.ownerName.value;
    ownerEmail = dom.ownerEmail.value;

    if (!petType || !(breed1||breed2) || !age || !gender || !comments || !ownerName) {
        alert("Please fill every option.");
        return false;
      }
      if(!"\w+@\w+.\w+"){
        alert("Please enter a valid email.");
        return false;
      }
    return true;
}

function giveAwayRequest(){
    document.getElementById("giveAway").onsubmit = giveAway;
}

function userValidation(){
  dom = document.getElementById("user");
  username = dom.username.value;
  password = dom.password.value;
  userRegex = /^[a-zA-Z0-9]+$/;
  if (!username.match(userRegex)) {
    alert("Your username can only contain letters and numbers.");
    return false;
  }
  passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{4,}$/;
  if (!password.match(passwordRegex)) {
    alert("Your password can only contain letters and numbers and must be at least 4 characters long.");
    return false;
  }
  return true;
}

function userValidationRequest(){
  document.getElementById("user").onsubmit = userValidation;
}