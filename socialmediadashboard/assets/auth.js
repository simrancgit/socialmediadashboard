export async function authenticateUser(isSignUp, email, password, confirmPassword) {
    if (!email || !password) {
        throw new Error("Please fill in all fields.");
    }

    if (isSignUp && password !== confirmPassword) {
        throw new Error("Passwords do not match.");
    }

    const endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/login";
    const userData = { email, password };

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
    }

    localStorage.setItem("token", data.token);
    return data;
}
