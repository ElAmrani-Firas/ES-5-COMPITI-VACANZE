const dataList = document.getElementById('dataList');
const searchInput = document.getElementById('searchInput');
const sortButton = document.getElementById('sortButton');
const dataForm = document.getElementById('dataForm');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');

let data = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Carol', age: 28 }
];

function renderData() {
  dataList.innerHTML = '';
  data.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${item.name}, ${item.age} anni</span><button class="edit-button" data-id="${item.id}">Modifica</button><button class="delete-button" data-id="${item.id}">Elimina</button>`;
    dataList.appendChild(li);
  });
}

function searchFilter(query) {
  return data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
}

function sortData() {
  data.sort((a, b) => a.name.localeCompare(b.name));
  renderData();
}

function updateData(id, newName, newAge) {
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    data[index].name = newName;
    data[index].age = newAge;
    renderData();
  }
}

function deleteData(id) {
  data = data.filter(item => item.id !== id);
  renderData();
}

dataForm.addEventListener('submit', event => {
  event.preventDefault();
  const newName = nameInput.value;
  const newAge = parseInt(ageInput.value);
  const id = data.length + 1;
  data.push({ id, name: newName, age: newAge });
  renderData();
  nameInput.value = '';
  ageInput.value = '';
});

dataList.addEventListener('click', event => {
  if (event.target.classList.contains('edit-button')) {
    const id = parseInt(event.target.getAttribute('data-id'));
    const item = data.find(item => item.id === id);
    if (item) {
      nameInput.value = item.name;
      ageInput.value = item.age;
      dataForm.removeEventListener('submit', dataForm.onSubmit);
      dataForm.onSubmit = event => {
        event.preventDefault();
        updateData(id, nameInput.value, parseInt(ageInput.value));
        nameInput.value = '';
        ageInput.value = '';
        dataForm.removeEventListener('submit', dataForm.onSubmit);
        dataForm.onSubmit = null;
        dataForm.addEventListener('submit', onSubmit);
      };
      dataForm.addEventListener('submit', dataForm.onSubmit);
    }
  } else if (event.target.classList.contains('delete-button')) {
    const id = parseInt(event.target.getAttribute('data-id'));
    deleteData(id);
  }
});

searchInput.addEventListener('keyup', () => {
  const query = searchInput.value;
  const filteredData = searchFilter(query);
  dataList.innerHTML = '';
  filteredData.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name}, ${item.age} anni`;
    dataList.appendChild(li);
  });
});

sortButton.addEventListener('click', sortData);

renderData();
