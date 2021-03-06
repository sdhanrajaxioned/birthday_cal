let jsonData = [],
  birthDates = [],
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  

const yearField = document.getElementById('year-field'),
  updateBtn = document.getElementById('update-btn'),
  listItems = document.querySelectorAll('.day'),
  birthDayDiv = document.querySelectorAll('.birthDays'),
  birthDaysTextArea = document.getElementById('birth-dates-textarea');

birthDayDiv.forEach((div) => div.innerHTML = '');

//function to get data from json
const getData = () => {
  fetch('assets/json/got-characters-birthday.json')
    .then(response => response.json())
    .then((response) => response.filter((item) => jsonData.push(item)));
}
getData();

// function to create person obj with name and birthday
function createPersonObj() {
  let personObj = [];
  jsonData.forEach((person) => {
    let name = person.name,
      matches = name.match(/\b(\w)/g),
      initials = matches.join(''),
      date = person.birthday,
      dayMonth = date.slice(0,6) + userInput,
      newDate = new Date(dayMonth),
      dayName = days[newDate.getDay()].substring(0,3),
      obj = {
      name: initials,
      birthDay: dayName
    };
    personObj.push(obj);
  })
  displayBirthdays(personObj);
}

//function to display data on DOM
const displayBirthdays = (personObj) => {
  birthDayDiv.innerHTML = '';
  personObj.forEach((person) => {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    let birthDay = person.birthDay.toLowerCase();
    listItems.forEach(function(li) {
      birthDayDiv.innerHTML = '';
      let listItemsId = li.id.toLocaleLowerCase();
      if(listItemsId === birthDay){
        let span = document.createElement('span'),
          birthdayDiv = li.querySelector('.birthDays');

        span.style.backgroundColor = `#${randomColor}`;
        span.innerHTML = person.name;
        birthdayDiv.appendChild(span);
      }
    })
  })
}

updateBtn.addEventListener('click', (e) => {
  e.preventDefault();
  userInput = yearField.value;
  createPersonObj();
});

