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

    const event = new Event(title, eventDateTime, eventReminderTime);
    currentUser.addEvent(event);

    // Convert event dates to Date objects
    datesArray = currentUser.events.map((event) => {
        return {
            date: new Date(event.dateTime),
            title: event.title,
            timeStamp: new Date(event.dateTime).getTime(),
            reminderTime: event.reminderTime
        }
    });

    // timeStamps = datesArray.map((date) => date.getTime());

    console.log(datesArray);
    // Clear the list before adding new items
    ul.innerHTML = '';

    // Render the updated list of events
    datesArray.forEach((date) => {
        let li = document.createElement("li");
        li.textContent = date.date;
        ul.appendChild(li);
    });


    // Display the output section
    output.style.display = '';

    // Clear the input fields
    eventTitleField.value = '';
    eventDateTimeField.value = '';
    eventReminderTimeField.value = '';

    console.log(currentUser);
    setInterval(function(){
        let eventTime = datesArray[datesArray.length - 1].timeStamp;
        let nowStamp = new Date().getTime();
        let reminderTimeMils =  Number(datesArray[datesArray.length - 1].reminderTime) * 60 * 1000
        
 
        let eventTitle = datesArray[datesArray.length - 1].title;
        let remiderMin = datesArray[datesArray.length - 1].reminderTime
        if(eventTime === nowStamp + reminderTimeMils){
            
            setTimeout(function () {
                alert(`your ${eventTitle} is after ${remiderMin} minutes`);
            }, 1000);
            
        }
    }, 1000)
    // datesArray.pop()
    // // Clear the list before adding new items
    // ul.innerHTML = '';
    
    // // Render the updated list of events
    // datesArray.forEach((date) => {
    //     let li = document.createElement("li");
    //     li.textContent = date.date;
    //     ul.appendChild(li);
    // });
    


});



// let min = datesArray[0];
// for(el of datesArray){s
//     if(el < min){
//         min = el;
//     }
// }

// let now = new Date();
// console.log(currentUser)


// 4. Set up reminders using setTimeout().
// This part would go here

// 5. Display upcoming events using setInterval().
// This part would go here
