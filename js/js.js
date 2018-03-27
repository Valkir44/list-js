// check status response
const status = response => {
    if (response.status != 200) {
        return Promise.reject(new Error(response.statusText));
    }
    return Promise.resolve(response)
};

// parse our json
const json = response => response.json();

// data variable
const usersData = [];

console.log(usersData + '444');

const addItems = document.querySelector('.add-items');
const users = document.querySelector('.user__created');

const userContainer = document.querySelector('.user__created');
const addYourUser = document.createElement('h2');

//fetch is an XMLHttpRequest method with an interface for querying the server
//When fetch is called, it returns an Promise, which, when the response is received,
// executes callbacks with the Response object or with an error if the request fails.
fetch('https://jsonplaceholder.typicode.com/users')
    .then(status)
    .then(json)
    .then(function (data) {
        usersData.push(...data);
        check();
        addUsers();
        btns();
    })
    .catch(error => console.log('error', error));

function filmTemplate(user) {
    return `
            <ul id="${user.id}" class="user d-flex flex-row list-group">
                <li data-edit="click" class="user-content item-width list-group-item">${user.name}</li>
                <li data-edit="click" class="user-content item-width list-group-item">${(user.username)}</li>
                <li data-edit="click" class="user-content item-width list-group-item">${user.email}</li>
                <li data-edit="click" class="user-content item-width list-group-item">${user.address.city}</li>
                <li data-edit="click" class="user-content item-width list-group-item">${user.website}</li>
                <button class="edit-btn btn btn-light" type="button" data-editable="editable" data-id="${user.id}"></button>
                <button class="delete-btn btn btn-light" type="button" data-delete="delete" data-id="${user.id}"></button>
            </ul>
            `
}

function addUsers() {

    users.innerHTML = `${usersData.map(filmTemplate).join('')}`;
}


function addNewUser(e) {
    e.preventDefault();
    const id = Math.floor(Math.random() * 100);
    const fullName = document.querySelector('#name');
    const userName = document.querySelector('#user');
    const email = document.querySelector('#email');
    const address = document.querySelector('#address');
    const website = document.querySelector('#website');

    const addLine = [{
        id: id,
        name: fullName.value,
        username: userName.value,
        email: email.value,
        address: {
            city: address.value
        },
        website: website.value
    }];
    users.removeChild(addYourUser);
    users.innerHTML += `${addLine.map(filmTemplate)}`;
    btns();
    this.reset();
}

function deleteBtn(e) {
    e.preventDefault();
    check();
    const takeClosetsElem = e.target.closest('ul');

    takeClosetsElem.parentNode.removeChild(takeClosetsElem);

    const users = document.querySelectorAll('.user-content');

    if (users.length === 0) {
        addYourUser.classList.add('add-some-thing');
        addYourUser.innerHTML = `Please add USERS`;
        userContainer.appendChild(addYourUser);
    }
}

function makeItEditable(e) {
    e.preventDefault();
    check();

    if (e.target.hasAttribute('data-id')) {
        return false;
    }

    e.target.setAttribute('contenteditable', 'true');
    e.target.classList.add('mustToEdit');

    if (e.target.hasAttribute('data-delete')) {
        deleteBtn();
    }
}

function makeItAllEditable(e) {
    e.preventDefault();
    check();

    const takeClosetsElem = e.target.closest('ul');

    Array.from(takeClosetsElem.children).forEach(item => {
        if (item.hasAttribute('data-id')) {
            return false;
        }
        item.setAttribute('contenteditable', 'true');
        item.classList.add('add');
    });
}

function check() {
    const users = document.querySelectorAll('.user-content');

    users.forEach(user => {
        if (user.classList.contains('add')) {
            user.classList.remove('add');
            user.removeAttribute('contenteditable');
        }
        if (user.classList.contains('mustToEdit')) {
            user.classList.remove('mustToEdit');
            user.removeAttribute('contenteditable');
        }
        document.body.addEventListener('click', function (e) {

            if (e.target === e.currentTarget) {
                user.classList.remove('mustToEdit');
                user.classList.remove('add');
                user.removeAttribute('contenteditable');
            }
        });
    });
}

function btns() {
    document.querySelector('.user__created').addEventListener('dblclick', makeItEditable);
    document.querySelectorAll('.edit-btn').forEach(item => item.addEventListener('click', makeItAllEditable));
    document.querySelectorAll('.delete-btn').forEach(item => item.addEventListener('click', deleteBtn));
    addItems.addEventListener('submit', addNewUser);
}


