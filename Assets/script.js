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
    {
        Q: 'The Crusades were _________________________',
        A: 'A series of religious wars which took place between 1095 and 1291'
choices: [{ choice: '1. A deadly curse typically cast by Death Eaters' },
        { choice: '2. A series of religious wars which took place between 1095 and 1291' },
        { choice: '3. A detalied painting of an alien abduction' },
        { choice: '4. A terrible ice cream flavor' }]
    },

    {
        Q: 'Sociology is the study of what?',
        A: 'Social life, human interaction, and society'
choices: [{ choice: '1. Social life, human inteaction, and society' },
        { choice: '2. Spiders and how they influence society' },
        { choice: '3. Becoming a better adult learner' },
        { choice: '4. A terrible ice cream flavor' }]
    }
];

var displayStartScreen = function () {
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
}
var setTime = function () {
    timeRemaining = 30;

    var timeChecker = setInterval(function () {
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
var startQuiz = function () {
    mainQuizContainer.classList.add(hidden);
    mainQuizContainer.classList.remove(show);
    quizQuestionEl.classList.remove(hidden);
    quizQuestionEl.classList.add(show);
    arrayRandomQuestions = quizQuestions.sort(() => Math.random() - .5)
    setTime()
    setQuestion()
}

var setQuestion = function () {
    resetAnswers()
    displayQuestion(arrayRandomQuestions[QuestionsIndex])
}

var resetAnswers = function () {
    while (answerButton.firstChild) {
        answerButtonEl.removeChild(answerButtonEl.firstChild)
    }
}

// display the questions and answers
var displayQuestion = function (index) {
    quizQuestionEl.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {
        var answerButton = document.createElement('button')
        answerButton.classList.add('btn')
        answerButton.classList.add('answerbutton')
        answerButton.addEventListener('click', checkAnswer)
        answerButtonEl.appendChild(answerButton)
    }
};

var answerCorrect = function () {
    if (correctEl.className = 'hidden') {
        correctEl.classList.remove('hidden')
        correctEl.classList.add('banner')
        wrongEl.classList.remove('banner')
        wrongEl.classList.add('hidden')
    }
}

var answerWrong = function () {
    if (wrongEl.className = 'hidden') {
        wrongEl.classList.remove('hidden')
        wrongEl.classList.add('banner')
        correctEl.classList.remove('banner')
        correctEl.classList.add('hidden')
    }
}

// answer check
var checkAnswer = function (event) {
    var chosenAnswer = event.target
    if (arrayRandomQuestions[QuestionsIndex].a === chosenAnswer.innerText) {
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

var showScore = function () {
    quizQuestionEl.classList.add('hidden');
    endOfQuizContainerEl.classList.remove('hidden')
    endOfQuizContainerEl.classList.add('show')

    var displayHighScores = document.createElement('p')
    displayHighScores.innerText = ('Your final score is' + score + '!!')
    containerScoreEl.appendChild(displayHighScores)
}

var createHighScores = function (event) {
    event.preventDefault()
    var initials = document.querySelector('#initials').value;
    if (!initials) {
        alert('Enter your initials!')
        return
    }

    var highScores = {
        initials: initials,
        score: score
    }

    createHighScores.push(highScores);
    createHighScores.sort((a, b) => { return b.score - a.score });

    while (listHighScoresEL.firstChild) {
        listHighScoresEL.removeChild(listHighScoresEL.firstChild)
    }

    for (var i = 0; i < highScores.length; i++) {
        var highScoreEl = document.createElement('li')
        highScoreEl.className = 'high-score';
        highScoreEl.innerText = StoredHighScores[i].initials + ' - ' + StoredHighScores[i].score;
        listHighScoresEL.appendChild(highScoreEl);

        highScores.push(StoredHighScores[i])
    }

}

//stored high scores
var highScoresScreen = function () {
    var StoredHighScores = localStorage.getItem('HighScores')
    if (!StoredHighScores) {
        return false;
    }

    StoredHighScores = JSON.parse(StoredHighScores);
    StoredHighScores.sort((a, b) => {return b.score-a.score})

    for (var i = 0; i < StoredHighScores.length; i++) {
        var highScoreEl = document.createElement('li');
        highScoreEl.className = 'high-score';
        highScoreEl.appendChild(highScoreEl)

        highScores.push(StoredHighScores[i]);
    }
}

var displayHighScores = function () {

    containerHighScoresEl.classList.remove('hide');
    containerHighScoresEl.classList.add('show');
    gameover = 'true'

    if (endOfQuizContainerEl.className = 'show') {
        endOfQuizContainerEl.classList.remove('show');
        endOfQuizContainerEl.classList.add('hide')
    }

    if (mainQuizContainer.className = 'show') {
        mainQuizContainer.classList.remove('show');
        mainQuizContainer.classList.add('hide')
    }

    if (quizQuestionsEl.className = 'show') {
        quizQuestionEl.classList.remove('show');
        quizQuestionsEl.classList.add('hide')
    }

    if (correctAnswerEl.className = 'show') {
        correctAnswerEl.classList.remove('show');
        correctAnswerEl.classList.add('hide');
    }

    if (wrongAnswerEl.className = 'show') {
        wrongAnswerEl.classList.remove('show');
        wrongAnswerEl.classList.add('hide');
    }

}

var clearScores = function() {
    HighScores = [];

    while (listHighScoresEL.firstChild) {
        listHighScoresEL.removeChild(listHighScoresEL.firstChild)
    }
    localStorage.clear(HighScores)
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