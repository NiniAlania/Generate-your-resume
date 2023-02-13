const vector1 = document.querySelector(".vector1");
const pageTitle = document.querySelector(".page-title");
const button = document.querySelector(".button");
const personalInfo = document.querySelector(".personal-info");
const workExperience = document.querySelector(".experience");
const vector2 = document.querySelector(".vector2");

const currentPage = sessionStorage.getItem("page") || 1;

if(currentPage == 1 ) {
  workExperience.style.display = "none";
  personalInfo.style.display ="inline";
} else if (currentPage == 2 ) {
  personalInfo.style.display = "none";
  workExperience.style.display = "inline";
}

vector1.addEventListener("click", () => {
    form.clear();
    location.href= "index.html";
    sessionStorage.removeItem("page");
})

button.addEventListener("click", () => {
 personalInfo.style.display = "none";
 workExperience.style.display = "inline";
 sessionStorage.setItem("page", 2);
})

vector2.addEventListener("click", () => {
  personalInfo.style.display ="inline";
  workExperience.style.display = "none";
  sessionStorage.setItem("page", 1);
})


const form = new Form();

form.validate();
form.load();

function getTest(image) { 
    return {
    "name": "დავით",
    "surname": "ონიანი",
    "email": "davitoniani@redberry.ge",
    "phone_number": "+995598123456",
    "experiences": [
      {
        "position": "back-end developer",
        "employer": "Redberry",
        "start_date": "2019/09/09",
        "due_date": "2020/09/23",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare nunc dui, a pellentesque magna blandit dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis diam nisi, at venenatis dolor aliquet vel. Pellentesque aliquet leo nec tortor pharetra, ac consectetur orci bibendum."
      }
    ],
    "educations": [
      {
        "institute": "თსუ",
        "degree_id": 7,
        "due_date": "2017/06/25",
        "description": "სამართლის ფაკულტეტის მიზანი იყო მიგვეღო ფართო თეორიული ცოდნა სამართლის არსის, სისტემის, ძირითადი პრინციპების, სამართლებრივი სისტემების, ქართული სამართლის ისტორიული წყაროების, კერძო, სისხლის და საჯარო სამართლის სფეროების ძირითადი თეორიების, პრინციპებისა და რეგულირების თავისებურებების შესახებ."
      }
    ],
    "image": image,
    "about_me": "ეს არის აღწერა ჩემს შესახებ"
  };
}
