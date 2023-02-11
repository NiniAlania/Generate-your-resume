const API_URL = "https://resume.redberryinternship.ge/api";

function getDegreese(callback) {
    fetch(`${API_URL}/degrees`)
  .then((response) => response.json())
  .then((data) => callback(data));
}

function postCV(data, callback) {
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

    fetch(`${API_URL}/cvs/`, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((result) => {
        callback(result);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}