const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

///Show Error Message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.textContent = message;
}

///Show Success

function showSucces(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

///validation of email

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value)) {
        showSucces(input)
    } else {
        showError(input, "Email is not valid")
    }
}
///Password matching check
function checkPassword(input) {
    if (input.value === password.value) {
        showSucces(input)
    } else {
        showError(input, "Confirm Password and Password are not same")
    }
}

///checkRequired

function checkRequired(inputArr) {
    for (let input of inputArr) {
        if (input.value.trim() === "") {
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSucces(input)
        }
    }
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}
///Check length

function checkLength(input, min, max) {
    if (input.value.length >= min && input.value.length <= max) {
        showSucces(input)
    } else if (input.value.length === 0) {
        showError(input, `${getFieldName(input)} is required`)
    } else {
        showError(input, `The length of ${getFieldName(input)} must be between ${min} and ${max}`)
    }
}


///Event Listeners
form.addEventListener("submit", submit);

function submit(e) {
    e.preventDefault();
    checkRequired([username, email, password, confirmPassword]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 20);
    checkEmail(email);
    checkPassword(confirmPassword)

}