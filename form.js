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
                this.store();
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
                this.store();
            } else {
                this.resumeSurname.style.display ="none";
            }
        });

        this.image.addEventListener("change", (event) => {
            const value = event.target.files;
            const valid = hasValidLength(value, 1) && isImage(value[0]);

            toogleFileValidation(event.target, valid);

            if (valid) {
                const reader = new FileReader()

                const resumeImage = this.resumeImage;
                const data = this.data;

                reader.onloadend = function () {
                    data['image'] = reader.result;
                    data['imageFile'] = value[0];
                    resumeImage.style.display = "inline";
                    resumeImage.src = reader.result;
                };

                reader.readAsDataURL(value[0]);
                this.store();
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
                this.store();
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
                this.store();
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
                this.store();
            } else {
                this.resumeMobileIcon.style.display = "none";
                this.resumeMobile.style.display = "none";
            }
        });
    }

    init() {
        this.name.value = this.data.name  || '';
        this.resumeName.style.display = "inline";
        this.resumeName.innerHTML = this.data.name || '';
        this.surname.value = this.data.surname || '';
        this.resumeSurname.style.display = "inline";
        this.resumeSurname.innerHTML = this.data.surname || '';
        this.resumeImage.style.display = "inline";
        this.resumeImage.src = this.data.image || '';
        this.description.value = this.data.description || '';
        this.resumeDescriptionTitle.style.display = "inline";
        this.resumeDescription.style.display = "inline"; 
        this.resumeDescription.innerHTML = this.data.description || '';
        this.email.value = this.data.email || '';
        this.resumeEmailIcon.style.display = "inline";
        this.resumeEmail.style.display = "inline";
        this.resumeEmail.innerHTML = this.data.email || '';
        this.phone.value = this.data.phone || '';
        this.resumeMobileIcon.style.display = "inline";
        this.resumeMobile.style.display = "inline";
        this.resumeMobile.innerHTML = this.data.phone || '';
    }

    store() {
        sessionStorage.setItem("cvData", JSON.stringify(this.data));
    }

    load() {
        const data = JSON.parse(sessionStorage.cvData);
        this.data = data;
        if ((this.data.image || '').length > 0) {
            this.data['imageFile'] = this._dataURLtoFile(this.data.image);
        }
        if (Object.keys(this.data).length > 0) {
            this.init();
        }
    }

    _dataURLtoFile(dataUrl) {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], 'image', {type:mime});
    }
    
    clear() {
        this.data = {};
        this.store();
    }

    submit() {
        // TODO change with read data
        postCV(getTest(this.data.imageFile), (data) => {
            console.log(data);
        })
    }
}