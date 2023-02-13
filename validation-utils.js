function hasValidLength(value, minlength) {
    return value.length >= minlength;
}

function isRequired(value) {
    return value.length > 0;
}

function validateRegExp(value, pattern) {
    const re = new RegExp(pattern);
    return re.test(value);
} 

function isValidEmail(value) {
    return validateRegExp(value, "^[a-zA-Z0-9._%+-]+@redberry\\.ge$");
}

function isValidPhone(value) {
    return validateRegExp(value, "^\\+9955\\d{8}$");
}

function isGeorgian(value) {
    return validateRegExp(value, "^[\u10A0-\u10FF]+$");
}

function isImage(value) {
    const url = value.name;
    const ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    
    return (ext === 'png' || ext === 'gif' || ext === 'jpg' || ext === 'jpeg');
}

function toogleValidation(element, valid) {
    element.classList.remove(!valid ? "valid" : "error");
    element.classList.add(valid ? "valid" : "error");
    if(element.nextElementSibling){
        element.nextElementSibling.classList.remove(!valid ? "valid" : "error");
        element.nextElementSibling.classList.add(valid ? "valid" : "error");
    }
    if (valid) {
        element.parentElement.previousElementSibling.classList.remove("red");
    } else {
        element.parentElement.previousElementSibling.classList.add("red");
    }
}

function toogleFileValidation(element, valid) {
    if (valid) {
        element.parentElement.previousElementSibling.classList.remove("red");
    } else {
        element.parentElement.previousElementSibling.classList.add("red");
    }
}

function toogleDescriptionValidation(element, valid) {
    if (!valid) {
        element.classList.remove("valid");
    } else {
        element.classList.add("valid");
    }
}