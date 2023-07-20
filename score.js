



var highscore = document.querySelector("#highscore");
var clear = document.querySelector("#clear");
var goHome = document.querySelector("#gohome");

clear.addEventListener("click", function () 
{
    localStorage.clear();
    location.reload();
});

var allscores = localStorage.getItem("allscores");
allscores = JSON.parse(allscores);

// display the quiz results.

if (allscores !== null) {

    for (var i = 0; i < allscores.length; i++) {
        var createli = document.createElement("li");
        createli.textContent = "Initial:" +allscores[i].initials+ "   Correct:" 
        + allscores[i].score+"   Timeleft:"  + allscores[i].time;
        highscore.appendChild(createli);
    }
}

 goHome.addEventListener("click", function () {
    window.location.replace("./index.html");
 });
