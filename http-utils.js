const API_URL = "https://resume.redberryinternship.ge/api";

function getDegrees(callback) {
    fetch(`${API_URL}/degrees`)
  .then((response) => response.json())
  .then((data) => callback(data));
}
// getDegreese((data) => {
//     console.log(data)
// })

function postCV(data, callback) {
    fetch(`${API_URL}/cvs/`, {
        method: 'POST',
        body: data,
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