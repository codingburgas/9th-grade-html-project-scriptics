document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quiz-form');

    // Check if the form exists before adding an event listener
    if (quizForm) {
        quizForm.addEventListener('submit', (event) => {
            // Prevent the form from actually submitting and reloading the page
            event.preventDefault();
            gradeHouseQuiz();
        });
    }
});

function gradeHouseQuiz() {
    let score = 0;

    const answers = {
        q1: "b", // Правилен отговор: навеждане и излизане
        q2: "c", // Правилен отговор: евакуация и предупреждение
        q3: "b", // Правилен отговор: да останете в стаята и да сигнализирате
    };

    // Loop through questions to check answers and provide feedback
    for (const [questionId, correctAnswer] of Object.entries(answers)) {
        const questionElement = document.getElementById(questionId);
        const userAnswer = questionElement.value;
        const feedbackElement = questionElement.nextElementSibling; // The <span> tag for feedback

        // Reset previous feedback
        feedbackElement.textContent = "";
        feedbackElement.className = "feedback";

        if (userAnswer === correctAnswer) {
            score++;
            feedbackElement.textContent = "✔ Правилно";
            feedbackElement.classList.add("correct");
        } else if (userAnswer !== "") { // Only mark as incorrect if an answer was chosen
            feedbackElement.textContent = "✖ Грешно";
            feedbackElement.classList.add("incorrect");
        }
    }

    // Display the final score
    const resultElement = document.getElementById("final-result");
    resultElement.textContent = `Вашият резултат: ${score} от 3 верни отговора.`;

    // Style the final score based on performance
    if (score === 3) {
        resultElement.style.color = 'var(--correct-answer)';
    } else if (score === 2) {
        resultElement.style.color = 'var(--neutral-answer)';
    } else {
        resultElement.style.color = 'var(--incorrect-answer)';
    }
}