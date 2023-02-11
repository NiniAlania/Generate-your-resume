class Form {
    constructor() {
        this.name = document.querySelector("#name");
        this.surname = document.querySelector("#surname");
        this.image = document.querySelector("#image");
        this.description = document.querySelector("#description");
        this.email = document.querySelector("#email");
        this.phone = document.querySelector("#phone");
    }

    validate() {
        this.name.addEventListener("keyup", (event) => {
            const value = event.target.value;''
            const valid = hasValidLength(value, 2) && isGeorgian(value);

            toogleValidation(event.target, valid);
        });

        this.surname.addEventListener("keyup", (event) => {
            const value = event.target.value;''
            const valid = hasValidLength(value, 2) && isGeorgian(value);

            toogleValidation(event.target, valid);
        });

        this.image.addEventListener("change", (event) => {
            const value = event.target.files;
            const valid = hasValidLength(value, 1) && isImage(value[0]);

            toogleFileValidation(event.target, valid);
        });

        this.description.addEventListener("keyup", (event) => {
            const value = event.target.value;
            const valid = hasValidLength(value, 1);

            console.log(valid);
            tootleDescriptionValidation(event.target, valid);
        });

        this.email.addEventListener("keyup", (event) => {
            const value = event.target.value;
            const valid = isValidEmail(value);

            toogleValidation(event.target, valid);
        });

        this.phone.addEventListener("keyup", (event) => {
            const value = event.target.value;
            const valid = isValidPhone(value);

            toogleValidation(event.target, valid);
        });
    }
}