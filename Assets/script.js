var quizQuestionEl = document.getElementById('#quizQuestions-Container');
var mainQuizContainer = document.getElementById('#quizMain-Container');
var containerHighScoresEl = document.getElementById('#container-high-score');
var viewHighScore = document.getElementById('#viewHighScores');

//page buttons
var buttonStartQuizEl = document.querySelector('#start');
var backButton = document.querySelector('#back');
var clearHighScores = document.querySelector('#clear')

//to start game
var startQuiz = function() {

}

//stored high scores
var highScoresScreen = function () {
    var StoredHighScores = localStorage.getItem('HighScores')
    if (!StoredHighScores) {
        return false;
    }
}

var displayHighScores = function () {

}

HighScores = [];

// button to start quiz
buttonStartQuizEl.addEventListener('click', startQuiz)

// event listener for view high scores
highScore.addEventListener('click', displayHighScores)