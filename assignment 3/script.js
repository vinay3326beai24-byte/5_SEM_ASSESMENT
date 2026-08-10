const form = document.getElementById("feedbackForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const courseInput = document.getElementById("course");
const feedbackInput = document.getElementById("feedback");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const courseError = document.getElementById("courseError");
const feedbackError = document.getElementById("feedbackError");

const sessionUser = document.getElementById("sessionUser");
const storedFeedback = document.getElementById("storedFeedback");

const deleteBtn = document.getElementById("deleteBtn");



// Display existing Session Storage

const savedSessionName = sessionStorage.getItem("studentName");

if (savedSessionName) {
    sessionUser.textContent =
        "Current Session User: " + savedSessionName;
} else {
    sessionUser.textContent =
        "Current Session User:";
}



// Display existing Local Storage


function displayStoredFeedback() {

    const savedData = localStorage.getItem("studentFeedback");

    if (savedData) {

        const data = JSON.parse(savedData);

        storedFeedback.innerHTML = `
            <strong>Name:</strong> ${data.name}<br>
            <strong>Email:</strong> ${data.email}<br>
            <strong>Course:</strong> ${data.course}<br>
            <strong>Feedback:</strong> ${data.feedback}
        `;

    } else {

        storedFeedback.textContent = "No feedback stored.";

    }
}

displayStoredFeedback();


// Validation Functions


function validateName() {

    const name = nameInput.value.trim();

    if (name === "") {
        nameError.textContent = "Name is required.";
        return false;
    }

    if (name.length < 3) {
        nameError.textContent =
            "Name must contain at least 3 characters.";
        return false;
    }

    nameError.textContent = "";
    return true;
}


function validateEmail() {

    const email = emailInput.value.trim();

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.textContent = "Email is required.";
        return false;
    }

    if (!emailPattern.test(email)) {
        emailError.textContent = "Enter a valid email.";
        return false;
    }

    emailError.textContent = "";
    return true;
}


function validateCourse() {

    if (courseInput.value === "") {
        courseError.textContent =
            "Please select a course.";
        return false;
    }

    courseError.textContent = "";
    return true;
}


function validateFeedback() {

    const feedback = feedbackInput.value.trim();

    if (feedback === "") {
        feedbackError.textContent =
            "Please enter feedback.";
        return false;
    }

    feedbackError.textContent = "";
    return true;
}



// Error disappears when input is valid


nameInput.addEventListener("input", validateName);

emailInput.addEventListener("input", validateEmail);

courseInput.addEventListener("change", validateCourse);

feedbackInput.addEventListener("input", validateFeedback);


// Submit Form


form.addEventListener("submit", function(event) {

    event.preventDefault();

    const validName = validateName();
    const validEmail = validateEmail();
    const validCourse = validateCourse();
    const validFeedback = validateFeedback();

    // Stop if any field is invalid
    if (!validName ||
        !validEmail ||
        !validCourse ||
        !validFeedback) {

        return;
    }


    // Get values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const course = courseInput.value;
    const feedback = feedbackInput.value.trim();


  
    // Store Feedback in Local Storage
  

    const feedbackData = {
        name: name,
        email: email,
        course: course,
        feedback: feedback
    };

    localStorage.setItem(
        "studentFeedback",
        JSON.stringify(feedbackData)
    );


    
    // Store Name in Session Storage
   
    sessionStorage.setItem(
        "studentName",
        name
    );


    // Update Session User
    sessionUser.textContent =
        "Current Session User: " + name;


    // Display stored feedback
    displayStoredFeedback();


    // Clear form
    form.reset();

    // Clear error messages
    nameError.textContent = "";
    emailError.textContent = "";
    courseError.textContent = "";
    feedbackError.textContent = "";
});



// Delete Stored Data


deleteBtn.addEventListener("click", function() {

    // Delete Local Storage
    localStorage.removeItem("studentFeedback");

    // Delete Session Storage
    sessionStorage.removeItem("studentName");

    // Update display
    sessionUser.textContent =
        "Current Session User:";

    storedFeedback.textContent =
        "No feedback stored.";

    // Clear form
    form.reset();

    // Clear errors
    nameError.textContent = "";
    emailError.textContent = "";
    courseError.textContent = "";
    feedbackError.textContent = "";
});