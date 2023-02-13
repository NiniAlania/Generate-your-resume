class Form {
    constructor(degrees) {
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
        this.addExpButton = document.querySelector(".add-exp");
        this.addEduButton = document.querySelector(".add-education");
        this.degrees = [];
        this.data = {};
        this.totalExperiences = 1;
        this.totalEducations = 1;
    }

    validate() {
        this.name.addEventListener("keyup", (event) => {
            const value = event.target.value;
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
            const value = event.target.value;
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

            toogleDescriptionValidation(event.target, valid);

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

        this.addExpButton.addEventListener("click", () => {
            this.addWork();
            this.addWorkListeners();
        });
        this.addWorkListeners();

        this.addEduButton.addEventListener("click", () => {
            this.addEducation();
            this.addSchoolListeners();
        });
        this.addSchoolListeners();

        

    }

    addWork() {
        const work = `<hr>
        <aside class="work-top">
        <aside class="position"> 
            <label for="position-input" class="position-label">თანამდებობა</label>
            <div>
                <input type="text" id="position-input" class="position-input" placeholder="თანამდებობა" >
                <span></span>
            </div>
            <h6>მინიმუმ 2 სიმბოლო</h6>
        </aside>
        <aside class="employer">
            <label for="employer-input" class="employer-label">დამსაქმებელი</label>
            <div>
                <input type="text" id="employer-input" class="employer-input"  placeholder="დამსაქმებელი">
                <span></span>
            </div>
            <h6>მინიმუმ 2 სიმბოლო</h6>
        </aside>
    </aside>
    <aside class="work-middle">
        <aside class="start-date">
            <label for="input-start-date" id="label-start-date">დაწყების რიცხვი</label>
            <div>
                <input type="date" id="input-start-date" class="input-start-date">
            </div>
        </aside>
        <aside class="end-date">
            <label for="input-end-date" id="label-end-date">დამთავრების რიცხვი</label>
            <div>
                <input type="date" id="input-end-date" class="input-end-date">
            </div>
        </aside>
    </aside>
    <aside class="work-bottom">
        <label for="work-description" id="work-description-label">აღწერა</label>
        <textarea id="work-description" class="work-description" cols="30" rows="10" placeholder="გთხოვთ, შეიყვანოთ საქმიანობის აღწერა"></textarea>
    </aside>`;
        document.querySelector(".work").insertAdjacentHTML('beforeend', work);
        const displayWork = `<hr>
        <div class="resume-employer">
        <h6 class="resume-employer-position"></h6>
        <span class="comma">,</span>
        <h6 class="second resume-employer-employer"></h6>
    </div>
    <div class="experience-date">
        <h6 class="resume-start-date"></h6>
        <span class="def">-</span>
        <h6 class="resume-end-date"></h6>
    </div>
    <p class="resume-description"></p>`;
        document.querySelector(".resume-experience-block").insertAdjacentHTML('beforeend', displayWork);
        this.totalExperiences += 1; 
    }

    addEducation() {
        const school= ` <hr>
        <aside class="top-education">
            <label for="education-input" class="education-label">სასწავლებელი</label>
            <div>
                <input type="text" id="education-input" class="education-input" placeholder="სასწავლებელი" >
                <span></span>
            </div>
            <h6>მინიმუმ 2 სიმბოლო</h6>
        </aside>
        <aside class="middle-education">
            <aside class="status-education">
                <div class="form">
                    <label for="input-status" id="input-status">დაწყების რიცხვი</label>
                    <select name="languages" id="" class="input-status">
                    </select>
                </div>
            </aside>
            <aside class="end-date">
                <label for="input-end-date-edu" id="label-end-date-edu">დამთავრების რიცხვი</label>
                <div>
                    <input type="date" id="input-end-date-edu" class="input-end-date-edu">
                </div>
            </aside>
        </aside>
        <aside class="bottom-education">
            <label for="education-description" id="education-description-label">განათლების აღწერა</label>
            <textarea id="education-description" class="education-description" cols="30" rows="10" placeholder="გთხოვთ, შეიყვანოთ საქმიანობის აღწერა"></textarea>
        </aside>
        `;
        document.querySelector(".school").insertAdjacentHTML('beforeend', school);

        const displaySchool= ` <hr>
        <div class="resume-school">
            <h6 class="resume-school-name"></h6>
            <span class="secondComma">,</span>
            <h6 class="status"></h6>
        </div>
        <div class="school-date">
            <h6 class="resume-end-date-edu"></h6>
        </div>
        <p class="school-description"></p>
        `;
        document.querySelector(".resume-education-block").insertAdjacentHTML('beforeend', displaySchool);
        this.totalEducations += 1; 
    };

    _degreesOptions(value=undefined) {
        return this.degrees.map((degree) => `<option value="${degree.id}" ${(value == degree.id) ? 'selected' : ''}>${degree.title}</option>`).join('')
    }

    addSchoolListeners() {
        document.querySelectorAll(".input-status").forEach((elem) => {
            elem.innerHTML = this._degreesOptions();
        });

        const totalEducations = this.totalEducations;
        document.querySelectorAll(".education-input")[totalEducations-1].addEventListener("keyup", (event) => {
            const value = event.target.value;
            console.log(value);
            const valid = hasValidLength(value, 2);
            toogleValidation(event.target, valid);
            if(valid) {
                document.querySelectorAll(".secondComma")[totalEducations-1].style.display="inline";
                document.querySelectorAll(".resume-school-name")[totalEducations-1].innerHTML = value;
                this.updateSchooldData();
                this.store();
            } else {
                document.querySelectorAll(".secondComma")[totalEducations-1].style.display="none";
                document.querySelectorAll(".resume-school-name")[totalEducations-1].innerHTML = "";
            }
        });

        document.querySelectorAll(".input-status")[totalEducations-1].addEventListener("change", (event) => {
            const value = event.target.options[event.target.selectedIndex].text;
            const valid = isRequired(value);
            toogleValidation(event.target, valid);
            if(valid) {
                document.querySelectorAll(".secondComma")[totalEducations-1].style.display="inline";
                document.querySelectorAll(".status")[totalEducations-1].innerHTML = value;
                this.updateSchooldData();
                this.store();
            } else {
                document.querySelectorAll(".secondComma")[totalEducations].style.display="none";
                document.querySelectorAll(".status")[totalEducations-1].innerHTML = "";
            }
        });
        
        document.querySelectorAll(".input-end-date-edu")[totalEducations-1].addEventListener("change", (event) => {
            const value = event.target.value;
            const valid = isRequired(value);
            toogleValidation(event.target, valid);
            if(valid) {
                document.querySelectorAll(".resume-end-date-edu")[totalEducations-1].innerHTML = value;
                this.updateSchooldData();
                this.store();
            } else {
                document.querySelectorAll(".resume-end-date-edu")[totalEducations-1].innerHTML = "";
            }
        });

        document.querySelectorAll(".education-description")[totalEducations-1].addEventListener("keyup", (event) => {
            const value = event.target.value;
            const valid = hasValidLength(value, 2);
            toogleValidation(event.target, valid);
            if(valid) {
                document.querySelectorAll(".school-description")[totalEducations-1].innerHTML = value;
                this.updateSchooldData();
                this.store();
            } else {
                document.querySelectorAll(".school-description")[totalEducations-1].innerHTML = "";
            }
        });
    }

    addWorkListeners() {
        const totalExperiences = this.totalExperiences;
        document.querySelectorAll(".position-input")[totalExperiences-1].addEventListener("keyup", (event) => {
            const value = event.target.value;
            const valid = hasValidLength(value, 2);
            toogleValidation(event.target, valid);
            if(valid) {
                document.querySelectorAll(".comma")[totalExperiences-1].style.display="inline";
                document.querySelectorAll(".resume-employer-position")[totalExperiences-1].innerHTML = value;
                this.updateWorkData();
                this.store();
            } else {
                document.querySelectorAll(".comma")[totalExperiences-1].style.display="none";
                document.querySelectorAll(".resume-employer-position")[totalExperiences-1].innerHTML = "";
            }
        });
        document.querySelectorAll(".employer-input")[totalExperiences-1].addEventListener("keyup", (event) => {
            const value = event.target.value;
            const valid = hasValidLength(value, 2);
            toogleValidation(event.target, valid);
            if(valid) {
                document.querySelectorAll(".comma")[totalExperiences-1].style.display="inline";
                document.querySelectorAll(".resume-employer-employer")[totalExperiences-1].innerHTML = value;
                this.updateWorkData();
                this.store();
            } else {
                document.querySelectorAll(".comma")[totalExperiences-1].style.display="none";
                document.querySelectorAll(".resume-employer-employer")[totalExperiences-1].innerHTML = "";
            }
        });
        document.querySelectorAll(".input-start-date")[totalExperiences-1].addEventListener("change", (event) => {
            const value = event.target.value;
            const valid = isRequired(value);
            toogleValidation(event.target, valid);
            if(valid) {
                document.querySelectorAll(".def")[totalExperiences-1].style.display="inline";
                document.querySelectorAll(".resume-start-date")[totalExperiences-1].innerHTML = value;
                this.updateWorkData();
                this.store();
            } else {
                document.querySelectorAll(".def")[totalExperiences-1].style.display="none";
                document.querySelectorAll(".resume-start-date")[totalExperiences-1].innerHTML = "";
            }
        });
        document.querySelectorAll(".input-end-date")[totalExperiences-1].addEventListener("change", (event) => {
            const value = event.target.value;
            const valid = isRequired(value);
            toogleValidation(event.target, valid);
            if(valid) {
                document.querySelectorAll(".def")[totalExperiences-1].style.display="inline";
                document.querySelectorAll(".resume-end-date")[totalExperiences-1].innerHTML = value;
                this.updateWorkData();
                this.store();
            } else {
                document.querySelectorAll(".def")[totalExperiences-1].style.display="none";
                document.querySelectorAll(".resume-end-date")[totalExperiences-1].innerHTML = "";
            }
        });
        document.querySelectorAll(".work-description")[totalExperiences-1].addEventListener("keyup", (event) => {
            const value = event.target.value;
            const valid = hasValidLength(value, 2);
            toogleValidation(event.target, valid);
            if(valid) {
                document.querySelectorAll(".resume-description")[totalExperiences-1].innerHTML = value;
                this.updateWorkData();
                this.store();
            } else {
                document.querySelectorAll(".resume-description")[totalExperiences-1].innerHTML = "";
            }
        });
    }

    updateSchooldData() {
        const schoolData = [];
        for (let i = 0; i < this.totalEducations; i++) {
            const school = document.querySelectorAll(".education-input")[i].value;
            const degree = document.querySelectorAll(".input-status")[i].value;
            const endDate = document.querySelectorAll(".input-end-date-edu")[i].value;
            const description = document.querySelectorAll(".education-description")[i].value;

            if (school.length > 0 || degree.length > 0 || startDate.length > 0 || endDate.length > 0 || status.length > 0 || description.length > 0) {
                schoolData.push({
                    school,
                    degree,
                    endDate,
                    description
                });
            }
        }

        this.data['educations'] = schoolData;
    }

    updateWorkData() {
        const workData = [];
        for (let i = 0; i < this.totalExperiences; i++) {
            const position = document.querySelectorAll(".position-input")[i].value;
            const employer = document.querySelectorAll(".employer-input")[i].value;
            const startDate = document.querySelectorAll(".input-start-date")[i].value;
            const endDate = document.querySelectorAll(".input-end-date")[i].value;
            const description = document.querySelectorAll(".work-description")[i].value;

            if (position.length > 0 || employer.length > 0 || startDate.length > 0 || endDate.length > 0 || description.length > 0) {
                workData.push({
                    position,
                    employer,
                    startDate,
                    endDate,
                    description
                });
            }
        }

        this.data['experiences'] = workData;
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
        if (this.description.value !== "") {
            this.resumeDescriptionTitle.style.display = "inline";
        }
        this.resumeDescription.style.display = "inline"; 
        this.resumeDescription.innerHTML = this.data.description || '';
        this.email.value = this.data.email || '';
        if (this.email.value !== '') {
            this.resumeEmailIcon.style.display = "inline";
        }
        this.resumeEmail.style.display = "inline";
        this.resumeEmail.innerHTML = this.data.email || '';
        this.phone.value = this.data.phone || '';
        if(this.phone.value !== '') {
            this.resumeMobileIcon.style.display = "inline";
        }
        this.resumeMobile.style.display = "inline";
        this.resumeMobile.innerHTML = this.data.phone || '';

        this.initWork();
        this.initSchool();
    }

    initSchool() {
        if (this.data.educations.length > 0) {
            this.addSchoolListeners();
            for (let i = 1; i < this.data.educations.length; i++) {
                this.addEducation();
                this.addSchoolListeners();
            }
            for (let i = 0; i < this.totalEducations; i++) {
                document.querySelectorAll(".education-input")[i].value = this.data.educations[i].school || '';
                document.querySelectorAll(".input-status")[i].innerHTML = this._degreesOptions(this.data.educations[i].degree);
                document.querySelectorAll(".input-end-date-edu")[i].value = this.data.educations[i].endDate || '';
                document.querySelectorAll(".education-description")[i].value = this.data.educations[i].description || '';
                if (this.data.educations[i].school !== "") {
                    document.querySelectorAll(".secondComma")[i].style.display="inline";
                    document.querySelectorAll(".resume-school-name")[i].innerHTML = this.data.educations[i].school;
                }
                if (this.data.educations[i].degree !== "") {
                    document.querySelectorAll(".status")[i].innerHTML = this.degrees[this.data.educations[i].degree - 1].title;
                }
                if (this.data.educations[i].endDate !== "") {
                    document.querySelectorAll(".resume-end-date-edu")[i].innerHTML = this.data.educations[i].endDate;
                }
                if (this.data.educations[i].description !== "") {
                    document.querySelectorAll(".school-description")[i].innerHTML = this.data.educations[i].description;
                }
            }
        }
    }

    initWork() {
        if (this.data.experiences.length > 0) {
            this.addWorkListeners();
            for (let i = 1; i < this.data.experiences.length; i++) {
                this.addWork();
                this.addWorkListeners();
            }
            for (let i = 0; i < this.totalExperiences; i++) {
                document.querySelectorAll(".position-input")[i].value = this.data.experiences[i].position || '';
                document.querySelectorAll(".employer-input")[i].value = this.data.experiences[i].employer || '';
                document.querySelectorAll(".input-start-date")[i].value = this.data.experiences[i].startDate || '';
                document.querySelectorAll(".input-end-date")[i].value = this.data.experiences[i].endDate || '';
                document.querySelectorAll(".work-description")[i].value = this.data.experiences[i].description || '';
                if (this.data.experiences[i].position.length > 0) {
                    document.querySelectorAll(".resume-employer-position")[i].innerHTML = this.data.experiences[i].position;
                    document.querySelectorAll(".resume-employer-position")[i].style.display = "inline";
                }
                if (this.data.experiences[i].employer.length > 0) {
                    document.querySelectorAll(".resume-employer-employer")[i].innerHTML = this.data.experiences[i].employer;
                    document.querySelectorAll(".resume-employer-employer")[i].style.display = "inline";
                    document.querySelectorAll(".comma")[i].style.display = "inline";
                }
                if (this.data.experiences[i].startDate.length > 0) {
                    document.querySelectorAll(".resume-start-date")[i].innerHTML = this.data.experiences[i].startDate;
                    document.querySelectorAll(".resume-start-date")[i].style.display = "inline";
                    document.querySelectorAll(".def")[i].style.display = "inline";
                }
                if (this.data.experiences[i].endDate.length > 0) {
                    document.querySelectorAll(".resume-end-date")[i].innerHTML = this.data.experiences[i].endDate;
                    document.querySelectorAll(".resume-end-date")[i].style.display = "inline";
                    document.querySelectorAll(".def")[i].style.display = "inline";
                }
                if (this.data.experiences[i].description.length > 0) {
                    document.querySelectorAll(".resume-description")[i].innerHTML = this.data.experiences[i].description;
                    document.querySelectorAll(".resume-description")[i].style.display = "inline";
                }
            }
        }
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

    toFormData() {
        const data = {
            "name": this.data.name,
            "surname": this.data.surname,
            "email": this.data.email,
            "phone_number": this.data.phone,
            "experiences": this.data.experiences.map((experience) => {
                return {
                    "position": experience.position,
                    "employer": experience.employer,
                    "start_date": experience.startDate.replace(/-/g, '/'),
                    "due_date": experience.endDate.replace(/-/g, '/'),
                    "description": experience.description,
                }
            }),
            "educations": this.data.educations.map((education) => {
                return {
                    "institute": education.school,
                    "degree_id": education.degree,
                    "due_date": education.endDate.replace(/-/g, '/'),
                    "description": education.description,
                }
            }),
            "image": this.data.imageFile,
            "about_me": this.data.description,
        };

        let formData = new FormData();

        function flattenObject(data, parentKey) {
            for (let key in data) {
                if (Array.isArray(data[key])) {
                    data[key].forEach((value, index) => {
                        flattenObject(value, `${key}[${index}]`);
                    });
                } else if (parentKey !== '' && typeof data[key] === 'object') {
                    flattenObject(data[key], `${parentKey}[${key}]`);
                } else if (parentKey !== '') {
                    formData.append(`${parentKey}[${key}]`, data[key]);
                } else {
                    formData.append(`${key}`, data[key]);
                }
            }
        }
        flattenObject(data, '');

        return formData;
    }
}