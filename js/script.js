const questions = [
    {
        question: "Você tem um orçamento mensal?",
        options: ["Sim", "Não"],
        answer: 0 // "Sim"
    },
    {
        question: "Você economiza regularmente?",
        options: ["Sim", "Não"],
        answer: 0 // "Sim"
    },
    {
        question: "Você investe parte da sua renda?",
        options: ["Sim", "Não"],
        answer: 0 // "Sim"
    },
    {
        question: "Você tem dívidas de cartão de crédito?",
        options: ["Sim", "Não"],
        answer: 1 // "Não"
    },
    {
        question: "Você possui uma reserva de emergência?",
        options: ["Sim", "Não"],
        answer: 0 // "Sim"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-button");
const resultContainer = document.getElementById("result");
const resultText = document.getElementById("result-text");
const restartButton = document.getElementById("restart-button");

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    nextButton.classList.remove("hidden");
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.innerHTML = `<h3>${question.question}</h3>`;
    question.options.forEach((option, index) => {
        questionContainer.innerHTML += `
            <button class="option-button" data-index="${index}">${option}</button>
        `;
    });

    document.querySelectorAll('.option-button').forEach(button => {
        button.addEventListener('click', selectOption);
    });
}

function selectOption(e) {
    const selectedOptionIndex = parseInt(e.target.getAttribute('data-index'));
    if (selectedOptionIndex === questions[currentQuestionIndex].answer) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResult();
    }
}

function showResult() {
    questionContainer.classList.add("hidden");
    nextButton.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) {
        resultText.textContent = "Ótimo! Você está gerenciando bem suas finanças.";
    } else if (percentage >= 50) {
        resultText.textContent = "Bom trabalho! Mas ainda há espaço para melhorias.";
    } else {
        resultText.textContent = "Você precisa direcionar seu gerenciamento financeiro.";
    }
}

restartButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion(questions[currentQuestionIndex]);
});

// Iniciar o jogo ao carregar a página
startGame();
