export class Question {
  static create(question) {
    return fetch("https://authque-default-rtdb.europe-west1.firebasedatabase.app/questions.json", {
      method: "POST",
      body: JSON.stringify(question),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(resp => resp.json())
      .then(resp => {
        question.id = resp.name;
        return question
      })
      .then(addToLocalStorage)
      .then(Question.renderList)
  }

  static fetch(token) {
    if (!token) {
      return Promise.resolve(`<p class="error">u have no token DUDU</p>`)
    }
    return fetch(`https://authque-default-rtdb.europe-west1.firebasedatabase.app/questions.json?auth=${token}`)
      .then(response => response.json())
      .then(response => {
        if (response && response.error) {
          return `<p class="error">${response.error}</p>`
        }

        return response ? Object.keys(response).map(key => ({
          ...response[key],
          id: key
        })) : []
      })
  }

  static renderList() {
    const questions = getQuestionFromLocalStorage();

    const html = questions.length > 0 ? questions.map(toCard).join("") :
      '<div class="mui--text-headline">no questions (:</div>'

    const list = document.getElementById("list");
    list.innerHTML = html;
  }

  static listToHTML (questions) {
    return questions.length ? 
    `<ol>${questions.map(q=>`<li>${q.text}</li>`).join("")}</ol>` :
    `<p>No questions</p>`
  }
}

function addToLocalStorage(question) {
  const all = getQuestionFromLocalStorage();
  all.push(question)
  localStorage.setItem("questions", JSON.stringify(all))
}

function getQuestionFromLocalStorage() {
  return JSON.parse(localStorage.getItem("questions") || "[]")
}

function toCard(question) {
  return `
        <div class="mui--text-black-54">
        ${new Date(question.date).toLocaleDateString()}
        ${new Date(question.date).toLocaleTimeString()}
        </div>
        <div>${question.text}</div>`
}