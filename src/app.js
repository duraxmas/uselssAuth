import { Question } from "./question";
import { createModal, isValid } from "./utils";
import "./style.css";
import { authWithEmailAndPassword, getAuthForm } from "./auth";

const form = document.getElementById("form");
const input = form.querySelector("#question-input");
const submitBtn = form.querySelector("#submit");
const modalBtn = document.querySelector("#modal-btn");

modalBtn.addEventListener("click", openModal)
window.addEventListener("load", Question.renderList());
form.addEventListener("submit", submitFormHandler);
input.addEventListener("input", () => {
  submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(event) {
  event.preventDefault();
  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    }
    submitBtn.disabled = true;
    //async request to server to save question
    Question.create(question).then(() => {
      console.log(question);
      input.value = "";
      input.className = "";
      submitBtn.disabled = false;
    });
    //
  }
}

function authFormHandler(event) {
  event.preventDefault()

  const btn = event.target.querySelector("button")
  const email = event.target.querySelector("#email").value
  const password = event.target.querySelector("#password").value

  btn.disabled = true;
  authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(()=> btn.disabled = false)
}

function openModal() {
  createModal("Auth", getAuthForm())
  document
    .getElementById("auth-form")
    .addEventListener("submit", authFormHandler, { once: true })
}

function renderModalAfterAuth(content) {
  if (typeof content == "string") {
    createModal("ERRRRRROR", content)
  } else {
    createModal("List of questions", Question.listToHTML(content))
  }
}

