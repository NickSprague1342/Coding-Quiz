var quizQuestionEl = document.getElementById('quizQuestions-Container');
var mainQuizContainer = document.getElementById('quizMain-Container');
var containerHighScoresEl = document.getElementById('container-high-score');
var viewHighScoreEl = document.getElementById('viewHighScores');
var endOfQuizContainerEl = document.getElementById('end-of-quiz-container')
var formPlayerInitialsEl = document.getElementById('initials-form')
var containerScoreEl = document.getElementById('scores')
var listHighScoresEL = document.getElementById('list-high-score')
var correctEl = document.getElementById('correctAnswer')
var wrongEl = document.getElementById('wrongAnswer')


//page buttons
var buttonStartQuizEl = document.querySelector('#start');
var backButton = document.querySelector('#back');
var clearHighScores = document.querySelector('#clear')

// questions and answers
var quizQuestionsEl = document.getElementById('questions')
var answerButtonEl = document.getElementById('answer-buttons')
var timeEl = document.querySelector('#timer')
var score = 0
var timeRemaining;
var GAMEOVER;
timeEl.innerText = 0;

var HighScores = [];

var arrayRandomQuestions
var QuestionsIndex = 0

//questions
var quizQuestions = [
{Q: 'The Crusades were _________________________',
A: 'A series of religious wars which took place between 1095 and 1291'
choices: [{choice: '1. A deadly curse typically cast by Death Eaters'},
            {choice: '2. A series of religious wars which took place between 1095 and 1291'}, 
            {choice: '3. A detalied painting of an alien abduction'},
            {choice: '4. A terrible ice cream flavor'}]}
];

var displayStartScreen = function() {
containerHighScoresEl.classList.add('hidden')
containerHighScoresEl.classList.remove('show')
mainQuizContainer.classList.remove('hidden')
mainQuizContainer.classList.add('show')
containerScoreEl.removeChild(containerScoreEl.lastChild)
QuestionsIndex = 0
GAMEOVER = ''
timeEl.textContent = 0
score = 0

if (correctAnswerEl.className = "show") {
    correctAnswerEl.classList.remove("show");
    correctAnswerEl.classList.add("hidden")
}
if (wrongAnswerEl.className = "show") {
    wrongAnswerEl.classList.remove("show");
    wrongAnswerEl.classList.add("hidden");
}

var setTime = function();
timeRemaining = 30;

var timeChecker = setInterval(function() {
    timeEl.innerText = timeRemaining;
    timeRemaining--

    if (gameover) {
        clearInterval(timeChecker)
    }

    if (timeRemaining < 0) {
        showScore()
        timeEl.innerText = 0
        clearInterval(timeChecker)
    }

}, 1000)

}

//to start game
var startQuiz = function() {
mainQuizContainer.classList.add(hidden);
mainQuizContainer.classList.remove(show);
quizQuestionEl.classList.remove(hidden);
quizQuestionEl.classList.add(show);
arrayRandomQuestions = quizQuestions.sort(() => Math.random() - .5)
setTime()
setQuestion()
}

// display the questions and answers
var displayQuestion = function(index) {
    quizQuestionEl.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {
        var answerButton = document.createElement('button')
        answerButton.classList.add('btn')
        answerButton.classList.add('answerbutton')
        answerButton.addEventListener('click', checkAnswer)
        answerButtonEl.appendChild(answerButton)
    }
};

// answer check
var checkAnswer = function(event) {
    var chosenAnswer = event.target
    if (arrayRandomQuestions[QuestionsIndex].a ===chosenAnswer.innerText) {
        answerCorrect()
        score = score + 5
    }

    else {
        answerWrong()
        score = score - 2
    }

    QuestionsIndex++
    if (arrayRandomQuestions.length > QuestionsIndex + 1) {
        setQuestion()
    }

    else {
        gameover = 'true'
        showScore()
    }
}

//stored high scores
var highScoresScreen = function () {
    var StoredHighScores = localStorage.getItem('HighScores')
    if (!StoredHighScores) {
        return false;
    }
}

var displayHighScores = function () {

    containerHighScoresEl.classList.remove('hide');
    containerHighScoresEl.classList.add('show');
}


displayHighScores()

// button to start quiz
buttonStartQuizEl.addEventListener('click', startQuiz)

// event listener for view high scores
highScoreEl.addEventListener('click', viewHighScore)

// event listener for submit button
formPlayerInitialsEl.addEventListener('submit', createScore)

// back from high scores
backButtonEl.addEventListener('click', returnHomePage)

// clear scores
clearHighScoresEl.addEventListener('click', clearScores)