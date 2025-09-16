// script.js

// Variáveis para controlar o estado do quiz
let currentQuestionIndex = 0;
let score = 0;
let answered = false; // Para evitar que o usuário clique em várias opções

// Elementos do DOM
const questionTextElement = document.getElementById('question-text');
const optionsContainerElement = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const quizContainer = document.querySelector('.quiz-container'); // Se precisar esconder/mostrar
const resultContainer = document.getElementById('result-container');
const scoreSpan = document.getElementById('score');
const totalQuestionsSpan = document.getElementById('total-questions');
const restartButton = document.getElementById('restart-button');


// Função para carregar uma pergunta
function loadQuestion() {
    answered = false; // Resetar para a nova pergunta
    const currentQuestion = questions[currentQuestionIndex];
    questionTextElement.textContent = currentQuestion.question;
    optionsContainerElement.innerHTML = ''; // Limpa as opções anteriores

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button'); // Adiciona uma classe para estilização, se tiver
        button.addEventListener('click', () => selectOption(index));
        optionsContainerElement.appendChild(button);
    });
}

// Função para selecionar uma opção
function selectOption(selectedIndex) {
    if (answered) return; // Se já respondeu, não faz nada
    answered = true; // Marca como respondido

    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = optionsContainerElement.querySelectorAll('.option-button');

    // Remove classes de feedback de todas as opções
    optionButtons.forEach(button => {
        button.classList.remove('correct', 'incorrect');
        button.disabled = true; // Desabilita botões após a escolha
    });

    // Adiciona feedback visual
    if (selectedIndex === currentQuestion.correctAnswer) {
        score++;
        optionButtons[selectedIndex].classList.add('correct');
    } else {
        optionButtons[selectedIndex].classList.add('incorrect');
        // Opcional: mostrar qual era a resposta correta
        optionButtons[currentQuestion.correctAnswer].classList.add('correct');
    }
}

// Função para avançar para a próxima pergunta ou finalizar o quiz
function nextQuestion() {
    if (!answered && currentQuestionIndex < questions.length) {
        alert('Por favor, selecione uma opção antes de avançar!');
        return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Função para mostrar os resultados finais
function showResults() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreSpan.textContent = score;
    totalQuestionsSpan.textContent = questions.length;
}

// Função para reiniciar o quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    loadQuestion();
}

// Event Listeners
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);

// Inicia o quiz carregando a primeira pergunta
loadQuestion();
// script.js

// Variáveis para controlar o estado do quiz
let currentQuestionIndex = 0;
let score = 0; // Já conta os acertos, mas vamos ter uma variável mais explícita também
let answered = false; // Para evitar que o usuário clique em várias opções

// NOVAS VARIÁVEIS PARA CONTAR ACERTOS E ERROS
let correctAnswersCount = 0;
let incorrectAnswersCount = 0;

// Elementos do DOM (certifique-se de que estes IDs existam no seu HTML)
const questionTextElement = document.getElementById('question-text');
const optionsContainerElement = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const quizContainer = document.querySelector('.quiz-container');
const resultContainer = document.getElementById('result-container');
const scoreSpan = document.getElementById('score'); // Exibe a pontuação (acertos)
const totalQuestionsSpan = document.getElementById('total-questions'); // Exibe o total de perguntas

// NOVOS ELEMENTOS DO DOM PARA ACERTOS E ERROS
const correctCountSpan = document.getElementById('correct-count');
const incorrectCountSpan = document.getElementById('incorrect-count');

const restartButton = document.getElementById('restart-button');


// Função para carregar uma pergunta
function loadQuestion() {
    answered = false; // Resetar para a nova pergunta
    const currentQuestion = questions[currentQuestionIndex];
    questionTextElement.textContent = currentQuestion.question;
    optionsContainerElement.innerHTML = ''; // Limpa as opções anteriores

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.addEventListener('click', () => selectOption(index));
        optionsContainerElement.appendChild(button);
    });
}

// Função para selecionar uma opção
function selectOption(selectedIndex) {
    if (answered) return; // Se já respondeu, não faz nada
    answered = true; // Marca como respondido

    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = optionsContainerElement.querySelectorAll('.option-button');

    // Remove classes de feedback de todas as opções
    optionButtons.forEach(button => {
        button.classList.remove('correct', 'incorrect');
        button.disabled = true; // Desabilita botões após a escolha
    });

    // Adiciona feedback visual e ATUALIZA OS CONTADORES
    if (selectedIndex === currentQuestion.correctAnswer) {
        score++; // Pontuação geral
        correctAnswersCount++; // Incrementa o contador de acertos
        optionButtons[selectedIndex].classList.add('correct');
    } else {
        incorrectAnswersCount++; // Incrementa o contador de erros
        optionButtons[selectedIndex].classList.add('incorrect');
        // Opcional: mostrar qual era a resposta correta
        optionButtons[currentQuestion.correctAnswer].classList.add('correct');
    }
}

// Função para avançar para a próxima pergunta ou finalizar o quiz
function nextQuestion() {
    if (!answered && currentQuestionIndex < questions.length) {
        alert('Por favor, selecione uma opção antes de avançar!');
        return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Função para mostrar os resultados finais
function showResults() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    // ATUALIZA OS TEXTOS