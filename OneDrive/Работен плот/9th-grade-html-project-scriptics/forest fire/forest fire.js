function gradeForestQuiz() {
  const answers = {
    q1: "b",
    q2: "b",
    q3: "a"
  };

  let score = 0;
  for (let q in answers) {
    const userAnswer = document.getElementById(q).value;
    if (userAnswer === answers[q]) {
      score++;
    }
  }

  const result = document.getElementById("forest-result");
  result.textContent = `Вашият резултат е ${score} от 3.`;
  result.style.fontWeight = "bold";
  result.style.marginTop = "15px";

  if (score === 3) {
    result.style.color = "green";
  } else if (score === 2) {
    result.style.color = "orange";
  } else {
    result.style.color = "red";
  }
}
