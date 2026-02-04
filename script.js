let questions = JSON.parse(localStorage.getItem("questions")) || [];

/* ---------- Teacher ---------- */

function addQuestion() {
  const q = question.value;
  const o1 = o1Input.value;
  const o2 = o2Input.value;
  const o3 = o3Input.value;
  const o4 = o4Input.value;
  const ans = answer.value;

  if (!q || !o1 || !o2 || !o3 || !o4 || !ans) {
    alert("Fill all fields");
    return;
  }

  questions.push({
    question: q,
    options: [o1, o2, o3, o4],
    answer: ans
  });

  localStorage.setItem("questions", JSON.stringify(questions));
  showQuestions();
  clearForm();
}

function showQuestions() {
  const list = document.getElementById("questionList");
  if (!list) return;

  list.innerHTML = "";
  questions.forEach(q => list.innerHTML += `<li>${q.question}</li>`);
}

function clearForm() {
  document.querySelectorAll("input").forEach(i => i.value = "");
}

function generateLink() {
  document.getElementById("examLink").innerText =
    location.origin + location.pathname.replace("index.html", "") + "student.html";
}

showQuestions();

/* ---------- Student ---------- */

function loadExam() {
  const exam = document.getElementById("exam");
  if (!exam) return;

  questions.forEach((q, i) => {
    let html = `<div class="card"><p>${i + 1}. ${q.question}</p>`;
    q.options.forEach((opt, idx) => {
      html += `
      <label>
        <input type="radio" name="q${i}" value="${idx + 1}">
        ${opt}
      </label><br>`;
    });
    html += "</div>";
    exam.innerHTML += html;
  });
}

function submitExam() {
  let score = 0;
  questions.forEach((q, i) => {
    const sel = document.querySelector(`input[name="q${i}"]:checked`);
    if (sel && sel.value == q.answer) score++;
  });

  document.getElementById("result").innerText =
    `Your Score: ${score}/${questions.length}`;
}

loadExam();
