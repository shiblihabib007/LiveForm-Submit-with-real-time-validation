document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signupForm");

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");

    const successMessage = document.getElementById("successMessage");
    const successText = document.getElementById("successText");

    // Regular Expressions for validation 
    const nameRegex = /^[a-zA-Z\s.]+$/;// Only letters and spaces
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Valid email format
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/; // At least 6 characters, 1 letter, 1 number

    // Real-time validation for name
    nameInput.addEventListener("input", function () {
        if (!nameRegex.test(nameInput.value)) {
            nameError.textContent = "Name should contain only letters and spaces.";
        } else {
            nameError.textContent = "";
        }
    });

    // Real-time validation for email
    emailInput.addEventListener("input", function () {
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = "Please enter a valid email address.";
        } else {
            emailError.textContent = "";
        }
    });

    // Real-time validation for password
    passwordInput.addEventListener("input", function () {
        if (!passwordRegex.test(passwordInput.value)) {
            passwordError.textContent = "Password must be at least 6 characters and include a letter and a number.";
        } else {
            passwordError.textContent = "";
        }
    });

    // Real-time validation for confirm password
    confirmPasswordInput.addEventListener("input", function () {
        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordError.textContent = "Passwords do not match.";
        } else {
            confirmPasswordError.textContent = "";
        }
    });

    // Form submission
    form.addEventListener("submit", function (e) {
        e.preventDefault();  // Prevent form from submitting if there are errors

        // Final validation before form submission
        let valid = true;

        if (!nameRegex.test(nameInput.value)) {
            nameError.textContent = "Name should contain only letters and spaces.";
            valid = false;
        }

        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = "Please enter a valid email address.";
            valid = false;
        }

        if (!passwordRegex.test(passwordInput.value)) {
            passwordError.textContent = "Password must be at least 6 characters and include a letter and a number.";
            valid = false;
        }

        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordError.textContent = "Passwords do not match.";
            valid = false;
        }

        // If all validations pass, send the form data to PHP via AJAX
        if (valid) {
            const formData = new FormData(form);

            fetch('processForm.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {

                
                // Show success message
                if (data.status === "success") {

                   // Show success alert
                   const successAlert = document.getElementById("successAlert");
                   successAlert.style.display = "block";

                   // Hide the alert after 5 seconds
                   setTimeout(function () {
                       successAlert.style.display = "none";
                   }, 5000);
                   // Reset the form after showing the success alert
                   form.reset();

                } else {
                    // Show success alert
                   const dangerAlert = document.getElementById("dangerAlert");
                   dangerAlert.style.display = "block";

                   // Hide the alert after 5 seconds
                   setTimeout(function () {
                    dangerAlert.style.display = "none";
                   }, 5000);
                   // Reset the form after showing the success alert
                   form.reset();
                }
            })
            .catch(error => console.error('Error:', error));
        }
    });
});
