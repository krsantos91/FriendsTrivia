var database = [
	{question:"How many Babies did Phoebe carry for her brother?", choices:["1","2","4","3"], answer:"3"},
	{question:"Who does Ross Marry in Las Vegas?", choices:["Rachel","Sarah","Carol","Denise"], answer:"Rachel"},
	{question:"How did Chandler meet Ross?", choices:["As children","At the coffee shop, 'Central Perk'","During college","At a toga party"], answer:"During college"},
	{question:"What instrument does Phoebe play?", choices:["Guitar","Flute","Ukulele","Kazoo"], answer:"Guitar"},
	{question:"Where did Chandler and Monica first get together?", choices:["Las Vegas","Central Perk","Chandler's apartment","London"], answer:"London"},
	{question:"What is Ross's son's name?", choices:["David","Alex","Joey Jr.","Ben"], answer:"Ben"},
	{question:"How many babies are born on the show?", choices:["4","8","7","5"], answer:"7"},	
	{question:"What is Monica's job?", choices:["Chef","Actress","Accountant","Crazy Lady"], answer:"Chef"},
	{question:"Why does Carol(Ross's wife) leave Ross?", choices:["He cheated","Money issues","She is lesbian","Bad sex"], answer:"She is lesbian"},	
	{question:"What is Rachel's surname?", choices:["David","Geller","Aniston","Green"], answer:"Green"},
	{question:"Where is Chandler forced to work after falling asleep during a meeting?", choices: ["Tulsa", "Reno", "Antlantic City", "San Fransisco"], answer:"Tulsa"},
	{question:"What is the name of Chandler's roommate after Joey moves Out?", choices: ["Paul", "Ross", "David", "Eddie"], answer:"Eddie"},
	{question:"What basketball team do Ross, Joey and Chandler support?", choices: ["New York Knicks", "Chicago Bulls", "New York Bucks", "Brooklyn Nets"], answer:"New York Knicks"},
	{question:"The 'Geller Cup' is a prize in which sport?", choices: ["Hockey", "Basketball", "Football", "Tennis"], answer:"Football"},	
	{question:"Where is Rachel leaving for in 'The Last One'?", choices: ["Los Angeles", "Paris", "Italy", "London"], answer:"Paris"},
	{question:"Whose catchphrase is 'Oh my God'?", choices: ["Janet", "Alice", "Janice", "Jennie"], answer:"Janice"},
	{question:"Where does Rachel work before her job in fashion?", choices: ["Law firm", "Coffee shop", "Restaurant", "She was unemployed"], answer:"Coffee shop"},
	{question:"Which friend lived on the street when they were younger", choices: ["Joey", "Chandler", "Phoebe", "Monica"], answer:"Phoebe"},		
	{question:"Where does Chandler's father live?", choices: ["Los Angeles", "Las Vegas", "Chicago", "New York"], answer:"Las Vegas"},
	{question:"What does Joey wear to Chandler and Monica's wedding?", choices: ["A suit", "A priest outfit", "A robe", "An army uniform"], answer:"An army uniform"},	
	{question:"Where do Phoebe and Mike get married?", choices: ["Central Perk", "Jamaica", "On the street", "Church wedding"], answer:"On the street"},
	{question:"What is the name of Bruce Willis' character?", choices: ["David", "Paul", "Allen", "Bruce"], answer:"Paul"},	
	{question:"What is Chandler's mother's job?", choices: ["Divorce lawyer", "Erotic novelist", "Special needs teacher", "Bank teller"], answer:"Erotic novelist"},
	{question:"Who is the youngest friend?", choices: ["Ross", "Rachel", "Joey", "Phoebe"], answer:"Rachel"},	
	{question:"How many sisters does Joey have?", choices: ["7", "0", "3", "6"], answer:"7"},
	{question:"What is Rachel's father's job?", choices: ["Erotic novelist", "Lawyer", "Banker", "Doctor"], answer:"Doctor"},	
	{question:"What park of New York is Rachel originally from?", choices: ["Brooklyn", "Long Island", "Manhattan", "Ithaca"], answer:"Long Island"},
	{question:"Where does Mike originally attempt to propose to Phoebe?", choices: ["London", "Paris", "Jamaica", "Barbados"], answer:"Barbados"},	
	{question:"Who plays 'Will', an old friend of Monica and Ross' from high school who hates Rachel?", choices: ["Tom Cruise", "Brad Pitt", "Bruce Willis", "George Clooney"], answer:"Brad Pitt"},
	{question:"How many siblings does Chandler have?", choices: ["0", "1", "2", "3"], answer:"0"},	
	{question:"What was the name of Monica's boyfriend who tried to become the 'Ultimate Fighting Champion'?", choices: ["Jared", "Ollie", "John", "Pete"], answer:"Pete"}
];
var questionNumber = 1;

// data base variables
var usedIndices = [];
var index;
do{
	index = Math.floor(Math.random()*31);
}while(usedIndices.indexOf(index) != -1)
usedIndices.push(index);

// score variables
var score = 0;
var maxscore = 300;
var highscore = 0;
var scoreIntervalId;
correct = 0;


// timer variables
var intervalId;
var timer;

// Create and display start button to initiate the game
var button = $("<div>")
button.addClass("btn btn-success");
button.attr("id", "startbutton");
button.text("Press to Start");
$("#messagebox").append(button);

// When start button is clicked, initiate the game
$(document).on("click","#startbutton", function(){
	$("#startbutton").remove();
	displayNextQuestion()
})

// CLICK FUNCTIONS ----------------------------------------------------------

// When a choice button is clicked, check it against the corresponding answer 
$(document).on("click",".choicebutton", function(){
	clearInterval(scoreIntervalId);
	var selection = $(this).attr("data-value");
	$("#timer").empty();
	$("#questions").empty();
	$("#choices").empty();
	$("#myscore").empty();
	$("#possiblescore").empty();
	var message = $("<div>")
	message.addClass("jumbotron bg-info");
	message.attr("id", "myMessage")
	var nextButton = $("<div>");
	nextButton.addClass("btn btn-danger");
	nextButton.attr("id","nextButton")
	nextButton.text("Next");
	if (selection === database[index].answer){
		score +=maxscore;
		message.text("CORRECT! You increased your score by " + maxscore + " to " + score);
		correct ++;
	}
	else{
		message.text("INCORRECT! The answer was " + database[index].answer);
	}
	$("#messagebox").append(message);
	$("#messagebox").append(nextButton);
	clearInterval(intervalId);
	return;
});

// When the next button is clicked, increase the  index and display next question
$(document).on("click","#nextButton", function(){
	$("#messagebox").empty();
	do{
		index = Math.floor(Math.random()*31);
	}while(usedIndices.indexOf(index) != -1)
	usedIndices.push(index);
	questionNumber++;
	displayNextQuestion();
})

// When the reset button is clicked, reset index,score and display question
$(document).on("click", "#reset",function(){
	$("#messagebox").empty();
	usedIndices = [];
	do{
		index = Math.floor(Math.random()*31);
	}while(usedIndices.indexOf(index) != -1)
	usedIndices.push(index);	
	score = 0;
	correct = 0;
	questionNumber = 1;
	displayNextQuestion();
})

// FUNCTIONS --------------------------------------------------

// Displays the next question and choices
function displayNextQuestion(){
	$("#highscore").text("Highscore: " + highscore);
	$("#myscore").text("Score: " + score);
	if (questionNumber > 10){
		endGame()
		return;
	}
	timer = 20;
	maxscore = 300;
	intervalId = setInterval(timeCount,1000);
	scoreIntervalId = setInterval(scoreCount,66);
	$(".choices").empty();
	// display the timer, question, and choices		
	$("#timer").text(timeConverter(timer));
	$("#questions").text(database[index].question);
	for (i =0; i<4;i++){
		var buttontext = database[index].choices[i];
		var button = $("<div>")
		button.addClass("btn-info btn choicebutton");
		button.attr("data-value",database[index].choices[i])
		button.text(buttontext);
		$("#choices").append(button);
		$("#choices").append("<br>");
	}
};

// Reset game parameters 
function endGame(){
	$("#timer").empty();
	$("#questions").empty();
	$("#choices").empty();
	$("#myscore").empty();
	if (score > highscore)highscore = score;
	var message = $("<div>")
	message.addClass("jumbotron bg-info");
	message.attr("id", "myMessage")
	var nextButton = $("<div>");
	nextButton.addClass("btn btn-danger");
	nextButton.attr("id","reset")
	nextButton.text("Click to try again");
	message.text("Your Final Score was " + score + " with " + correct + " answers of out 10.")
	$("#messagebox").append(message).append(nextButton);
}

// Timer countdown function
function timeCount(){
    timer--;
    if (timer == -1){
    	clearInterval(intervalId);
    	clearInterval(scoreIntervalId)
    	$("#timer").empty();
    	$("#questions").empty();
    	$("#choices").empty();
    	$("#myscore").empty();
    	$("#possiblescore").empty();
		var message = $("<div>")
		message.addClass("jumbotron bg-info");
		message.attr("id", "myMessage")
		message.text("Time Ran Out! the correct answer was " + database[index].answer)
		var nextButton = $("<div>");
		nextButton.addClass("btn btn-danger");
		nextButton.attr("id","nextButton")
		nextButton.text("Next");
		$("#messagebox").append(message);
		$("#messagebox").append(nextButton);
    	return;
    }
    var currentTime = timeConverter(timer);
    $("#timer").text(currentTime);	
}
function scoreCount(){
	maxscore --;
	if(maxscore == 10){
		clearInterval(scoreIntervalId);
	}
	$("#possiblescore").text(maxscore);
}

//  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
function timeConverter(t) {
  var minutes = Math.floor(t / 60);
  var seconds = t - (minutes * 60);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes === 0) {
    minutes = "00";
  }
  else if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return minutes + ":" + seconds;
}