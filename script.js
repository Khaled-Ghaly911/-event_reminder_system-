// Initial declarations
const output = document.querySelector('#output');
const loginBtn = document.querySelector('#loginButton');
const addEventBtn = document.querySelector('#addEventButton');
const loginSection = document.querySelector('#loginSection');
const eventSection = document.querySelector('#eventSection');
const userNameField = document.querySelector('#userName');
const userEmailField = document.querySelector('#userEmail');
const eventTitleField = document.querySelector('#eventTitle');
const eventDateTimeField = document.querySelector('#eventDateTime');
const eventReminderTimeField = document.querySelector('#eventReminderTime');

// 1. Create the Event and User constructor functions.
const Event = function (title, dateTime, reminderTime) {
    this.title = title;
    this.dateTime = dateTime;
    this.reminderTime = reminderTime;
};

const User = function (name, email) {
    this.name = name;
    this.email = email;
    this.events = [];

    this.addEvent = function (event) {
        this.events.push(event);
    };
};

const ul = document.createElement("ul");
output.insertAdjacentElement('afterbegin', ul);
ul.style.listStyleType = 'none';
output.style.color = 'green';

// 2. Implement the user login functionality.
let currentUser;

loginBtn.addEventListener('click', function () {
    const fname = userNameField.value;
    const email = userEmailField.value;

    currentUser = new User(fname, email); // Create a new User object

    userNameField.value = '';
    userEmailField.value = '';

    loginSection.style.opacity = 0;
    eventSection.style.display = '';
});

// 3. Implement the event addition functionality.
let datesArray;
// let timeStamps;


addEventBtn.addEventListener('click', function () {
    const title = eventTitleField.value;
    const eventDateTime = eventDateTimeField.value;
    const eventReminderTime = eventReminderTimeField.value;
    let nowStamp = new Date().getTime();
    let eventTimeStamp = new Date(eventDateTime).getTime();
    // Display the output section
    output.style.display = '';

    if (eventTimeStamp - nowStamp < Number(eventReminderTime) * 60 * 1000) {
        alert(`the rest time is less than reminder time`);
        return 0;
    }

    const event = new Event(title, eventDateTime, eventReminderTime);
    currentUser.addEvent(event);

    // Convert event dates to Date objects
    datesArray = currentUser.events.map((event) => {
        let date = new Date(event.dateTime);

        return {
            date: `${date.getHours()}:${date.getMinutes()}`,
            title: event.title,
            timeStamp: new Date(event.dateTime).getTime(),
            reminderTime: event.reminderTime
        }
    });

    let eventTime = datesArray[datesArray.length - 1].timeStamp;
    let reminderTimeMils = Number(datesArray[datesArray.length - 1].reminderTime) * 60 * 1000;


    let eventTitle = datesArray[datesArray.length - 1].title;
    let remiderMin = datesArray[datesArray.length - 1].reminderTime

    let rt = eventTime - nowStamp - reminderTimeMils;

    console.log(datesArray);

    updateUi();



    clearInputFieldsEvent();

    console.log(currentUser);


    setTimeout(function () {
        alert(`your ${eventTitle} is after ${remiderMin} minutes`);
        currentUser.events.pop();
    }, rt);

    setTimeout(function () {
        console.log('hello');
        ul.remove();
    }, eventTime - nowStamp + 2000);

});

function updateUi() {
    // Clear the list before adding new items
    ul.innerHTML = '';

    // Render the updated list of events
    datesArray.forEach((date) => {
        let li = document.createElement("li");
        li.textContent = date.date;
        ul.appendChild(li);
    });

}

function clearInputFieldsEvent() {
    eventTitleField.value = '';
    eventDateTimeField.value = '';
    eventReminderTimeField.value = '';
}
