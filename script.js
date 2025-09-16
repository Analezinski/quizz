// script.js

// Array de perguntas do quiz (EXEMPLO - use suas próprias perguntas aqui)
const questions = [
    {
        question: "Qual a capital do Brasil?",
        options: ["Rio de Janeiro", "São Paulo", "Brasília", "Belo Horizonte"],
        correctAnswer: 2 // Índice da resposta correta (Brasília)
    },
    {
        question: "Qual o maior planeta do Sistema Solar?",
        options: ["Terra", "Júpiter", "Marte", "Vênus"],
        correctAnswer: 1 // Índice da resposta correta (Júpiter)
    },
    {
        question: "Quantos corações tem um polvo?",
        options: ["Um", "Dois", "Três", "Quatro"],
        correctAnswer: 2 // Índice da resposta correta (Três)
    },
    {
        question: "Quem pintou a Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        correctAnswer: 2 // Índice da resposta correta (Leonardo da Vinci)
    }
    // Adicione mais perguntas aqui!
];


// Variáveis para controlar o estado do quiz
let currentQuestionIndex = 0;
let answered = false; // Para evitar que o usuário clique em várias opções
let correctAnswersCount = 0; // Contador de acertos
let incorrectAnswersCount = 0; // Contador de erros

// Elementos do DOM (certifique-se de que estes IDs existam no seu HTML)
const questionTextElement = document.getElementById('question-text');
const optionsContainerElement = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const quizContainer = document.querySelector('.quiz-container');
const resultContainer = document.getElementById('result-container');

// Elementos para exibir os resultados
const finalScoreSpan = document.getElementById('final-score'); // Para a pontuação final (se quiser manter)
const correctCountSpan = document.getElementById('correct-count'); // Para o número de acertos
const incorrectCountSpan = document.getElementById('incorrect-count'); // Para o número de erros
const totalQuestionsResultSpan = document.getElementById('total-questions-result'); // Para o total de perguntas no resultado

const restartButton = document.getElementById('restart-button');


// --- FUNÇÕES DO QUIZ ---

// Função para iniciar ou reiniciar o quiz
function startQuiz() {
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    incorrectAnswersCount = 0;
    answered = false;

    quizContainer.style.display = 'block'; // Mostra o container do quiz
    resultContainer.style.display = 'none'; // Esconde o container de resultados
    nextButton.style.display = 'block'; // Garante que o botão "Próxima" esteja visível

    loadQuestion(); // Carrega a primeira pergunta
}

// Função para carregar uma pergunta
function loadQuestion() {
    answered = false; // Resetar para a nova pergunta
    nextButton.disabled = true; // Desabilita o botão "Próxima" até uma opção ser selecionada

    const currentQuestion = questions[currentQuestionIndex];
    questionTextElement.textContent = currentQuestion.question;
    optionsContainerElement.innerHTML = ''; // Limpa as opções anteriores

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.addEventListener('click', () => selectOption(index, button)); // Passa o botão para a função
        optionsContainerElement.appendChild(button);
    });
}

// Função para selecionar uma opção
function selectOption(selectedIndex, clickedButton) {
    if (answered) return; // Se já respondeu, não faz nada
    answered = true; // Marca como respondido
    nextButton.disabled = false; // Habilita o botão "Próxima"

    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = optionsContainerElement.querySelectorAll('.option-button');

    // Desabilita todos os botões de opção após a escolha
    optionButtons.forEach(button => {
        button.disabled = true;
    });

    // Adiciona feedback visual e ATUALIZA OS CONTADORES
    if (selectedIndex === currentQuestion.correctAnswer) {
        correctAnswersCount++; // Incrementa o contador de acertos
        clickedButton.classList.add('correct');
    } else {
        incorrectAnswersCount++; // Incrementa o contador de erros
        clickedButton.classList.add('incorrect');
        // Opcional: mostrar qual era a resposta correta
        optionButtons[currentQuestion.correctAnswer].classList.add('correct');
    }
}

// Função para avançar para a próxima pergunta ou finalizar o quiz
function nextQuestion() {
    if (!answered) {
        alert('Por favor, selecione uma opção antes de avançar!');
        return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults(); // Chama a função para mostrar os resultados
    }
}

// Função para mostrar os resultados finais (AGORA COMPLETA!)
function showResults() {
    quizContainer.style.display = 'none'; // Esconde o quiz
    resultContainer.style.display = 'block'; // Mostra a tela de resultados
    nextButton.style.display = 'none'; // Esconde o botão "Próxima"

    // Atualiza os textos com os resultados
    finalScoreSpan.textContent = correctAnswersCount; // Pontuação é o número de acertos
    correctCountSpan.textContent = correctAnswersCount;
    incorrectCountSpan.textContent = incorrectAnswersCount;
    totalQuestionsResultSpan.textContent = questions.length;
}

// --- EVENT LISTENERS ---
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', startQuiz);

// Inicia o quiz quando a página carrega
document.addEventListener('DOMContentLoaded', startQuiz);