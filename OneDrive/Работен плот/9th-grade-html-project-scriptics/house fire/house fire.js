function gradeHouseQuiz() {
  let score = 0;

  const q1 = document.getElementById("q1").value;
  const q2 = document.getElementById("q2").value;
  const q3 = document.getElementById("q3").value;

  if (q1 === "b") score++;
  if (q2 === "c") score++;
  if (q3 === "b") score++;

  const result = document.getElementById("house-result");
  result.textContent = `Резултат: ${score} от 3 верни отговора.`;

  if (score === 3) {
    result.style.color = "green";
  } else if (score === 2) {
    result.style.color = "orange";
  } else {
    result.style.color = "red";
  }
}
