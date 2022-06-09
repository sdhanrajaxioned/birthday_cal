let jsonData = [];
const yearFieldValue = document.getElementById('year-field');
const updateBtn = document.getElementById('update-btn');
const getData = () => {
  fetch('assets/json/got-characters-birthday.json')
    .then(response => response.json())
    .then((response) => response.filter((item) => jsonData.push(item)));
}
  
getData();

updateBtn.addEventListener('click', (e) => {
  e.preventDefault();
})

