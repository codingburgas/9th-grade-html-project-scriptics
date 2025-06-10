document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quiz-form');

    if (quizForm) {
        quizForm.addEventListener('submit', (event) => {
            event.preventDefault();
            gradeForestQuiz();
        });
    }
});

function gradeForestQuiz() {
    let score = 0;

    // Correct answers for the FOREST fire quiz
    const answers = {
        q1: "b", // Correct answer: Да се отдалечите
        q2: "b", // Correct answer: Да се придвижите... срещу вятъра
        q3: "a", // Correct answer: Да се криете в колата
    };

    for (const [questionId, correctAnswer] of Object.entries(answers)) {
        const questionElement = document.getElementById(questionId);
        const userAnswer = questionElement.value;
        const feedbackElement = questionElement.nextElementSibling;

        feedbackElement.textContent = "";
        feedbackElement.className = "feedback";

        if (userAnswer === correctAnswer) {
            score++;
            feedbackElement.textContent = "✔ Правилно";
            feedbackElement.classList.add("correct");
        } else if (userAnswer !== "") {
            feedbackElement.textContent = "✖ Грешно";
            feedbackElement.classList.add("incorrect");
        }
    }

    const resultElement = document.getElementById("final-result");
    resultElement.textContent = `Вашият резултат: ${score} от 3 верни отговора.`;

    if (score === 3) {
        resultElement.style.color = 'var(--correct-answer)';
    } else if (score === 2) {
        resultElement.style.color = 'var(--neutral-answer)';
    } else {
        resultElement.style.color = 'var(--incorrect-answer)';
    }
}