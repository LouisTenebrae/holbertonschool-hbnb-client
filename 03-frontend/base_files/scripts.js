/* 
  This is a SAMPLE FILE to get you started.
  Please, follow the project instructions to complete the tasks.
*/

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');

  if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
          event.preventDefault();
          
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;

          try {
              const response = await loginUser(email, password);
              
              if (response.ok) {
                  const data = await response.json();
                  // Store the JWT token in a cookie
                  document.cookie = `token=${data.access_token}; path=/;`;
                  // Redirect to the main page
                  window.location.href = 'index.html';
              } else {
                  // Display error message
                  errorMessage.textContent = 'Login failed: ' + response.statusText;
              }
          } catch (error) {
              errorMessage.textContent = 'An error occurred: ' + error.message;
          }
      });
  }
});

async function loginUser(email, password) {
  return fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
  });
}
