/*Metodo para detectar la pagina cargada y que ejecute el codigo en el archivo 
de javaScript que esta codificado para esa pagina especifica.

por que?
Si en app.js tienes código que intenta acceder a elementos que no existen en todas 
las páginas, tendrás errores.
*/

document.addEventListener("DOMContentLoaded", () =>{
    const page = document.body.id
    switch(page){
        case "home":
            initHome();
            break;
        case "lab1":
            initLab1();
            break;
        case "lab2":
            initLab2();
            break;
        case "practice1":
            practice1();
            break;
        case "practice2":
            practice2();
            break;
    }    
});


/******* Home Page Functions *******/


function initHome(){
    document.getElementById("btnWelcome").addEventListener("click",()=>{
        document.getElementById("helloWorld").innerHTML = "<h2>Hello World!</h2>";        
    })
}

/******* Lab1 Page Functions *******/


function initLab1(){
    document.getElementById("btnBMI").addEventListener("click",function funtBMI(){
    let weight = parseFloat(document.getElementById("numWeight").value);
    let height = parseFloat(document.getElementById("numHeight").value);
    let bmi = weight/(height ** 2);
    alert(`The IMB calculated is ${bmi.toFixed(2)}`);
});
}


/******* Lab2 Page Functions *******/


function initLab2(){
    document.getElementById("btnTryLuck").addEventListener("click",function(){
    let guessNumber = parseInt(document.getElementById("numGuess").value);
    let selectedRangeState = document.querySelector('input[name=radRangeNumber]:checked');
    let min = 1;
    let max;
    if(!checkNumGuestField(guessNumber,selectedRangeState)){
        max = parseInt(selectedRangeState.value);
        randomNumber(min,max,guessNumber);
        }
    });
}

function checkNumGuestField(guessNumber,rangeState){
    let error =0;
    if(!rangeState){
        alert('You must choose a range first')
        error = 1
    }else{
        if(guessNumber == ""){
            alert('Please type a value into the range that you choose ')
            error = 1

        }else{
            if(guessNumber > parseInt(rangeState.value)){
                alert(`your guess is out of the rage you selected, change range or your guess, and try it again.`)
                error = 1
            }
        }
    }
    return error;
}
 
function randomNumber(min,max,guessNumber){
    theNumber = Math.floor((Math.random() * max) +min); 
    if(guessNumber == theNumber){
        alert(`You guessed, the number is ${theNumber}.`)
    }else{
        alert(`The number was ${theNumber}, sorry. Try it again!`)
    }
}


/******* Practice1 Page Functions *******/

function practice1(){
    document.getElementById("btnReg").addEventListener("click",()=>{
        let name = document.getElementById("txtName").value;
        let age = document.getElementById("txtAge").value;
        let race = document.getElementById("cboRace").value;
        if(checkRaceFields(name,age)==""){
            raceTarif(race,age,name);
        }
    });
}


function checkRaceFields(name,age){
    let msgError ="";
    if(!name){
        msgError += "Please type name. <br>"
    }
    if(!age){
        msgError += "Age is required."
    }else if(!parseInt(age)){
           msgError += "Age should be a numeric value."
    }else if(parseInt(age) < 21){
        msgError += "You must be 21, or older to register."
        }
    document.getElementById("msgError").innerHTML=msgError;   
    return msgError;
}

function raceTarif(race,age,name){
    let cost;
    let discount = "";

    switch(race){
        case "5KM":
            cost = parseFloat(10+(age/2));
            break;
        case "10KM":
            cost = parseFloat(18+(age/3));
            break;
    }
    if(document.querySelector('input[id=chkIsMember]:checked')){
        cost -= 5;
        discount = "<br>The cost alredy has an special discount of $5.00 for our club members. <br>Thank you to participate."
    }
    document.getElementById("results").innerHTML = `${name}, your registration cost for the ${race} race is $${cost.toFixed(2)}${discount} `
}

/* Things to improve in the Practice 1 exercise code and from now on.

    - use ternary it is possible
    - coding less while is possible
    - present intputs first, then  validates and calcs, at the end outputs
    - try to set codition base on negative thinks,  
    for example what happend if a var is empty like:  if(var =""){do this};

*/

/******* Practice2 Page Functions *******/
function practice2(){
    document.getElementById("btnScore").addEventListener("click",()=>{
        let parHole = parseInt(document.getElementById("cboPar").value);
        let score = parseInt(document.getElementById("txtScore").value);
        let error = "";
        error = chkScoreValue(score);
        ( error != "")? 
            document.getElementById("msgError").innerHTML = chkScoreValue(score) : 
            document.getElementById("results").innerHTML = rating(parHole,score);         
    });
}

function chkScoreValue(score){
    let msgError ="";
        if(isNaN(score)==true){
            msgError='type a numeric score between 1- 10'
        }
        if(score < 1 || score > 10){
            msgError='Score must be between 1 to 10'
        }
    return msgError;
}

function rating(par,score){
    let rate = "";
    let diffRating = score - par;
    alert(diffRating);
    switch(diffRating){
        case 2:
            rate = `${diffRating} strokes less than par mean your rating is Eagle`;
            break;
        case 1:
            rate = `${diffRating} stroke less than par mean your rating is Birdie`;
            break;
        case 0:
            rate = `Same number of strokes as a par mean your rating is a par`;
            break;
        case -1:
            rate = `${diffRating} strokes more than par mean your rating is Bogie`;
            break;
        case (diffRating <= -2):
            rate = `${diffRating} strokes less than par mean you ned to take some Golf Lessons`;
            break;
    }
    return rate;
}