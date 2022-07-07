let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const newEventModal = document.querySelector('#newEventModal');
const deleteEventModal = document.querySelector('#deleteEventModal');
const backDrop = document.querySelector('#modalBackDrop');
const eventTitleInput = document.querySelector('#eventName');
const calendar = document.querySelector('#calendar');


function openModal(date) {
    clicked = date;

    const eventForDay = events.find(event => event.date === clicked);

    if (eventForDay) {
        document.querySelector('#eventText').innerHTML = eventForDay.title;
        deleteEventModal.style.display = 'block';

    } else {
        newEventModal.style.display = 'block';
    }
    backDrop.style.display = 'block'
}


function init() {
    const date = new Date();

    if (nav !== 0) {
        date.setMonth(date.getMonth() + nav);
    }

    const today = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateStr = firstDay.toLocaleDateString('en-us', {
        weekday: 'long',
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
    });

    const PdDays = weekdays.indexOf(dateStr.split(', ')[0]);
    
    document.querySelector('#monthDisp').innerText =
        `${date.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

    calendar.innerHTML = '';

    for (let i = 1; i <= PdDays + daysInMonth; i++) {
        const daySq = document.createElement('div');
        daySq.classList.add('day');

        const dayStr = `${month + 1}/${1 - PdDays + i}/${year}`;

        if (i > PdDays) {
            daySq.innerText = i - PdDays;

            const eventForDay = events.find(event => event.date === dayStr);

            if (eventForDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.title;
                daySq.appendChild(eventDiv);
            }

            daySq.addEventListener('click', () => openModal(dayStr));

        } else {
            daySq.classList.add = ('padding');
        }

        calendar.appendChild(daySq);
    }
}

function closeModal() {
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = '';
    clicked = null;
    init();
}

function saveEvent() {
    if (eventTitleInput.value) {
        eventTitleInput.classList.remove('error');

        events.push({
            date: clicked,
            title: eventTitleInput.value
        })
        localStorage.setItem('events', JSON.stringify(events));
        closeModal()

    } else {

        eventTitleInput.classList.add('error');

    }


}

function deleteEvent() {
    events = events.filter(event => event.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
}

function initBtn() {

    const nextbtn = document.querySelector('#next');
    nextbtn.addEventListener('click', () => {
        nav++;
        init();
    });

    const prevbtn = document.querySelector('#prev');
    prevbtn.addEventListener('click', () => {
        nav--;
        init();
    });

    document.querySelector('#save').addEventListener('click', saveEvent)

    document.querySelector('#cancel').addEventListener('click', closeModal)

    document.querySelector('#deleteButton').addEventListener('click', deleteEvent)

    document.querySelector('#closeButton').addEventListener('click', closeModal)
}


initBtn()
init();

