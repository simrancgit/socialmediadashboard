// script.js
document.addEventListener("DOMContentLoaded", () => {
    const authForm = document.getElementById("auth-form");
    const toggleForm = document.getElementById("toggle-form");
    const formTitle = document.getElementById("form-title");
    const formSubtitle = document.getElementById("form-subtitle");
    const submitBtn = document.getElementById("submit-btn");
    const confirmPasswordGroup = document.getElementById("confirm-password-group");
    const errorMessage = document.getElementById("error-message");

    let isSignUp = false;

    toggleForm.addEventListener("click", (e) => {
        e.preventDefault();
        isSignUp = !isSignUp;

        formTitle.textContent = isSignUp ? "Create Account" : "Welcome Back!";
        formSubtitle.textContent = isSignUp ? "Sign up to get started" : "Sign in to continue";
        submitBtn.textContent = isSignUp ? "Sign Up" : "Sign In";
        confirmPasswordGroup.style.display = isSignUp ? "block" : "none";
        toggleForm.textContent = isSignUp ? "Sign In" : "Sign Up";
    });

    authForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        

        errorMessage.textContent = "error";

       

        const endpoint = isSignUp 
            ? "http://localhost:5000/api/auth/signup" 
            : "http://localhost:5000/api/auth/login";


        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                window.location.href = "home.html";
            } else {
                errorMessage.textContent = data.message || "Authentication failed!";
            }
        } catch (error) {
            errorMessage.textContent = "An error occurred. Please try again.";
        }
    });
});

export {}; // Ensures ES module format
