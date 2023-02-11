class Form {
    constructor() {
        this.name = document.querySelector("#name");
        this.resumeName = document.querySelector(".resume-name");
        this.surname = document.querySelector("#surname");
        this.resumeSurname = document.querySelector(".resume-surname");
        this.image = document.querySelector("#image");
        this.resumeImage = document.querySelector(".resume-image");
        this.description = document.querySelector("#description");
        this.resumeDescriptionTitle = document.querySelector(".about-me-title");
        this.resumeDescription = document.querySelector(".about-me-p");
        this.email = document.querySelector("#email");
        this.resumeEmailIcon= document.querySelector(".email-icon");
        this.resumeEmail = document.querySelector(".my-email");
        this.resumeMobileIcon = document.querySelector(".mobile-icon");
        this.resumeMobile= document.querySelector(".mobile-number");
        this.phone = document.querySelector("#phone");
        this.data = {};
    }

    validate() {
        this.name.addEventListener("keyup", (event) => {
            const value = event.target.value;''
            const valid = hasValidLength(value, 2) && isGeorgian(value);

            toogleValidation(event.target, valid);

            if (valid) {
                this.data['name'] = value;
                this.resumeName.style.display ="inline";
                this.resumeName.innerHTML = value;
            } else {
                this.resumeName.style.display ="none";
            }
        });

        this.surname.addEventListener("keyup", (event) => {
            const value = event.target.value;''
            const valid = hasValidLength(value, 2) && isGeorgian(value);

            toogleValidation(event.target, valid);

            if (valid) {
                this.data['surname'] = value;
                this.resumeSurname.style.display = "inline";
                this.resumeSurname.innerHTML = value;
            } else {
                this.resumeSurname.style.display ="none";
            }
        });

        this.image.addEventListener("change", (event) => {
            const value = event.target.files;
            const valid = hasValidLength(value, 1) && isImage(value[0]);

            toogleFileValidation(event.target, valid);

            if (valid) {
                this.data['image'] = value[0];

                const reader = new FileReader()

                const resumeImage = this.resumeImage;

                reader.onloadend = function () {
                    resumeImage.style.display = "inline";
                    resumeImage.src = reader.result;
                };

                reader.readAsDataURL(value[0]);
            } else {
                this.resumeImage.src = "";
            }
        });

        this.description.addEventListener("keyup", (event) => {
            const value = event.target.value;
            const valid = hasValidLength(value, 1);

            tootleDescriptionValidation(event.target, valid);

            if (valid) {
                this.data['description'] = value;
                this.resumeDescriptionTitle.style.display = "inline";
                this.resumeDescription.style.display = "inline";
                this.resumeDescription.innerHTML = value;

            } else {
                this.resumeDescriptionTitle.style.display = "none";
                this.resumeDescription.style.display = "none";
            }
        });

        this.email.addEventListener("keyup", (event) => {
            const value = event.target.value;
            const valid = isValidEmail(value);

            toogleValidation(event.target, valid);

            if (valid) {
                this.data['email'] = value;
                this.resumeEmailIcon.style.display = "inline";
                this.resumeEmail.style.display = "inline";
                this.resumeEmail.innerHTML = value;
            } else {
                this.resumeEmailIcon.style.display = "none";
                this.resumeEmail.style.display = "none";
            }
        });

        this.phone.addEventListener("keyup", (event) => {
            const value = event.target.value;
            const valid = isValidPhone(value);

            toogleValidation(event.target, valid);

            if (valid) {
                this.data['phone'] = value;
                this.resumeMobileIcon.style.display = "inline";
                this.resumeMobile.style.display = "inline";
                this.resumeMobile.innerHTML = value;
            } else {
                this.resumeMobileIcon.style.display = "none";
                this.resumeMobile.style.display = "none";
            }
        });
    }
}