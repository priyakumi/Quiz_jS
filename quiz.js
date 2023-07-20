 //declaration of objects in array.
var quizarray = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        question: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];

var score = 0; // initalizing score value to 0.
var qi = 0; //initalizing array index to 0.

// intializing the timer values

var secondsleft = 76; 
var holdinterval = 0; 
var penalty = 10;



var ctime = document.querySelector("#ctime");
var stimer = document.querySelector("#start");
var questions = document.querySelector("#questions");
var container = document.querySelector("#container");

//stimer  tiggers for the start button "click" event.

stimer.addEventListener("click", function () {
    
    if (holdinterval === 0) {
        holdinterval = setInterval(function () {
            secondsleft--;
            ctime.textContent = "Time: " + secondsleft;

            if (secondsleft <= 0) {
                clearInterval(holdinterval);
                done();
                ctime.textContent = "Time's up!";
            }
        }, 1000);
    }
    quiz_display(qi);
});


// render function : clear the old text and didplay the question 
//with answer choice in unordered list formate
function quiz_display(qi)
 {
    var createul = document.createElement("ul");
     //clear the content
    questions.innerHTML = "";
    createul.innerHTML = "";
    //display quiz question and answer choices and check the answer
    for (var i = 0; i < quizarray.length; i++) 
    {
        var userq = quizarray[qi].question;
        var userc = quizarray[qi].choices;
        questions.textContent = userq;
    }
    userc.forEach(function (newchoice) 
    {
        var newitem = document.createElement("li");
        newitem.textContent = newchoice;
        questions.appendChild(createul);
        createul.appendChild(newitem);
        newitem.addEventListener("click", (compare_answer));
    })
}


//compare function: this function  validation the answer

function compare_answer(event) 
{
    var element = event.target;

    if (element.matches("li")) 
    {
       var creatediv = document.createElement("div");
        creatediv.setAttribute("id", "creatediv");
        if (element.textContent == quizarray[qi].answer) 
           {
            score++;
            creatediv.textContent = "Correct! The answer is:  " + quizarray[qi].answer;
           } else
           {
            secondsleft = secondsleft - penalty;
            creatediv.textContent = "Wrong! The correct answer is:  " + quizarray[qi].answer;
           }
    }
    // This index for question array
    qi++;

    if (qi >= quizarray.length) 
    {
         done();
        creatediv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + quizarray.length + " Correct!";
        alert(" you got "+score+"/5 correct.")
    } else {
        quiz_display(qi);
    }
    questions.appendChild(creatediv);


}

// alldone funtion: display the quiz score ,store the data in the local storage  
// and redirect to score page.
function done() {
    // clear the text.
    questions.innerHTML = "";
    ctime.innerHTML = "";

    var createh1 = document.createElement("h1");
    createh1.setAttribute("id", "createh1");
    createh1.textContent = "All Done!"
    questions.appendChild(createh1);

    var createp = document.createElement("p");
    createp.setAttribute("id", "createp");
    questions.appendChild(createp);

    if (secondsleft >= 0) {
       var timeleft = secondsleft;
        //var createP2 = document.createElement("p");
        clearInterval(holdinterval);
        createp.textContent = "The time left is:" +secondsleft;
        //createP2.textContent = "Your total  score is: " + score ;
          //questionsDiv.appendChild(createP2);
    }

    var createlabel = document.createElement("label");
    createlabel.setAttribute("id", "createlabel");
    createlabel.textContent = "Enter your initials: ";
    questions.appendChild(createlabel);

    
    var createinput = document.createElement("input");
    createinput.setAttribute("type", "text");
    createinput.setAttribute("id", "initials");
    createinput.textContent = "";
    questions.appendChild(createinput);

    
    var sbtn = document.createElement("button");
    sbtn.setAttribute("type", "submit");
    sbtn.setAttribute("id", "submit");
    sbtn.textContent = "Submit";
    questions.appendChild(sbtn);

    sbtn.addEventListener("click", function () {
        var initials = createinput.value;

        if (initials === null) {
        } else {
            var fscore = {
                initials: initials,
                score: score,
                time: timeleft,
            }
            console.log(fscore);
            var allscores = localStorage.getItem("allscores");
            if (allscores === null) {
                allscores = [];
            } else {
                allscores = JSON.parse(allscores);
            }
            allscores.push(fscore);
            var newscore = JSON.stringify(allscores);
            localStorage.setItem("allscores", newscore);
            window.location.replace("./scorepage.html");
        }
    });

}