export function getAuthForm() {
  return `
  <form class="mui-form" id="auth-form">
          <div class="mui-textfield mui-textfield--float-label">
            <input type="email" id="email" required minlength="10" maxlength="256">
            <label for="email">Email</label>
          </div>
          <div class="mui-textfield mui-textfield--float-label">
            <input type="password" id="password" required minlength="10" maxlength="256">
            <label for="password">Password</label>
          </div>

              <button 
                type="submit" 
                id="enterBtn"
                class="mui-btn mui-btn--raised mui-btn--accent"
              >
                Enter
              </button>
        </form>
  `
}

export function authWithEmailAndPassword(email, password) {
  const apiKey = "AIzaSyCp57VGN-FDE9_IvNtt1tP3YCj8nQzveq8"
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: "POST",
    body: JSON.stringify({
      email, password,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => data.idToken)
}