const date = document.getElementById('date');
const button = document.getElementById('add');
const input = document.querySelector('.input_text');
let todo = JSON.parse(localStorage.getItem('todo')) || [];

const todoList = document.querySelector('.scroll');
displayTasks();

let days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
let d = new Date();
let month = months[d.getMonth()];
let dayOfWeek = days[d.getDay()];
let wholeDate = d.getDate();
let formattedDay = wholeDate < 10 ? '0' + wholeDate : wholeDate;
let year = d.getFullYear();

date.textContent = `${dayOfWeek}, ${formattedDay} ${month} ${year}`;

document.addEventListener('DOMContentLoaded', function () {
  button.addEventListener('click', addTask);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });
  todoList.addEventListener('click', (event) => {
    // const isLabel = event.target.tagName === "LABEL";
    const isCheckbox = event.target.type === 'checkbox';

    if (!isCheckbox) return;

    const li = event.target.closest('li');

    if (!li || !todoList.contains(li)) return;
    const checkbox = li.querySelector('input[type="checkbox"]');
    if (!checkbox) return;

    const id = checkbox.id;
    const index = id.split('-')[1];
    editTasks(index);
  });
});

function addTask() {
  const task = input.value;
  if (task !== '') {
    todo.push({
      text: task,
      disabled: false,
    });
    saveToLocalStorage();
    displayTasks();
  }
  input.value = '';
}

function saveToLocalStorage() {
  localStorage.setItem('todo', JSON.stringify(todo));
}

function displayTasks() {
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
  if (todo.length != 0) {
    todo.forEach((item, index) => {
      const li = document.createElement('li');
      const label = document.createElement('label');
      const checkbox = document.createElement('input');

      li.className = 'todo';

      checkbox.type = 'checkbox';
      checkbox.id = `input-${index}`;
      checkbox.checked = item.disabled;

      label.setAttribute('id', `text-${index}`);
      label.setAttribute('for', `input-${index}`);
      label.className = item.disabled ? 'disabled' : '';
      console.log(index);
      label.textContent = item.text;
      li.appendChild(label);
      li.appendChild(checkbox);
      todoList.appendChild(li);
    });
  }
}

function editTasks(index) {
  const text = document.getElementById(`text-${index}`);
  console.log(todo[index].disabled);
  if (todo[index].disabled) {
    todo[index].disabled = false;
    text.className = '';
  } else {
    todo[index].disabled = true;
    text.className = 'disabled';
  }
  saveToLocalStorage();
}
