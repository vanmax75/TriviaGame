var triviaQuestions = [{
	question: "What boxing class is heaviest?",
	answerList: ["Fly weight", "Bantam weight", "Feather weight", "Cruiser weight"],
	answer: 2
},{
	question: "What heavyweight champion was nicknamed Real Deal?",
	answerList: ["Evander Holyfield", "Mike Tyson", "Lennox Lewis", "Mohammed Ali"],
	answer: 0
},{
	question: "What Mexican boxing champ lost for the first time to little know Frankie Randall?",
	answerList: ["Canelo Alvarez", "Julio Cesar Chavez", "Miguel Cotto", "Pedro Morales"],
	answer: 1
},{
	question: "What boxing promoter was indicted for filing a false insurance claim with Lloyds of London?",
	answerList: ["Tom Loeffler", "Bob Arum", "Lou Di Bella", "Don King"],
	answer: 3
},{
	question: "Who received a reported $25 million for a 1995 boxing match that lasted 89 seconds?",
	answerList: ["Evander Holyfield", "Mike Tyson", "Lennox Lewis", "Paulie Malignaggi"],
	answer: 1
},{
	question: "What boxing weight class is limited to 190 pounds?",
	answerList: ["HeavyWeight", "CruiserWeight", "MiddleWeight", "WelterWeight"],
	answer: 1
},{
	question: "Q: How old was George Foreman when he became the oldest heavyweight champ in history?",
	answerList: ["39", "40", "50", "45"],
	answer: 3
},{
	question: "What pro sport gives its participants an 87 percent chance of suffering brain damage??",
	answerList: ["Muay Thai", "Boxing", "KickBoxing", "MMA"],
	answer: 1
},{
	question: "What had to occur for a round to end when John L. Sullivan beat Jake Killrain in 75 rounds, in 1889?",
	answerList: ["A Knockdown", "A Knockout", "A Death", "A Riot"],
	answer: 0
},{
	question: "Who reigned as heavyweight boxing champ of Uganda from 1951-1960?",
	answerList: ["Idi Amin", "Mohammed Ali", "Evander Holyfield", "Mike Tyson"],
	answer: 0

}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//New questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//answer click time pause + answer page 
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	// timer 
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}