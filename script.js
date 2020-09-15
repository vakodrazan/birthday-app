// import { format } from 'date-fns'

const tbody = document.querySelector('tbody');

// Get the data
const endpoint = './people.json';

// fetch data from the json file
async function fetchPeople() {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
}

// display the list of people
async function displayList() {
    const people = await fetchPeople();
    
    tbody.innerHTML = people
        .map(
            person => {
                const date = new Date(person.birthday);
                const day = date.getDate();
                const month = date.getMonth();
                const year = date.getFullYear();
                const fullDate = `${day} / ${month} / ${year}`;
                // console.log( - );
                return `
                    <tr data-id="${person.id}">
                        <td>
                            <img class="rounded-circle" src="${person.picture}" alt="This the picture for ${person.firstName} ${person.lastName}">
                        </td>
                        <td>${person.lastName} ${person.firstName}</td>
                        <td>${fullDate}</td>
                        <td>
                            <button class="edit" data-id="${person.id}">
                                <img class="class="w-50 p-3" src="./assets/edit-icon.jpg" alt="">
                            </button>
                        </td>
                        <td>
                            <button class="delete" data-id="${person.id}">
                                <img class="class="w-50 p-3" src="./assets/trash-icon.jpg" alt="">
                            </button>
                        </td>
                    </tr>
                `
            })
        .join('');
}

displayList();


// Here are something to do with the popup

function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
    popup.classList.remove('open'); 
    await wait(500);
    popup.remove();
    popup = null;
}

const editPeson = e => {
    // Set all the result here
    if (e.target.closest('button.edit')) {
        const tableRowEdit = e.target.closest('tr');
        const id = tableRowEdit.dataset.id;
        editPersonPopup(id);
    }
}

const editPersonPopup = async idToEdit => {
    // Create all the code
    const peopleList = await fetchPeople();
    const people = peopleList.find(person => person.id === idToEdit);

    return new Promise( async function(resolve) {
        const popupForm = document.createElement('form');
        popupForm.classList.add('popupForm');
		popupForm.insertAdjacentHTML('afterbegin', `
			<fieldset>
				<label>Avantar</label>
				<input type="url" name="picture" value="${people.picture}">
			</fieldset>
			<fieldset>
				<label>LastName</label>
				<input type="text" name="lastName" value="${people.lastName}">
            </fieldset>
            <fieldset>
				<label>FirstName</label>
				<input type="text" name="firstName" value="${people.firstName}">
			</fieldset>
			<fieldset>
				<label>Birth day</label>
				<input type="text" name="birthday" value="${people.birthday}">
			</fieldset>
			<div class="form-btn">
				<button type="button" class="cancel">Cancel</button>
				<button type="submit" class="submit">Save</button>
			</div>
			
		`);

        document.body.appendChild(popupForm);
        await wait(50);
        popupForm.classList.add('open')

        window.addEventListener('click', e => {
            if (e.target.closest('button.cancel')) {
                destroyPopup(popupForm);
            }
        });
        popupForm.addEventListener('submit', e => {
            e.preventDefault();
            people.picture = popupForm.picture.value;
            people.lastName = popupForm.lastName.value;
            people.firstName = popupForm.firstName.value;
            people.birthday = popupForm.birthday.value;

            displayList();
            resolve(e.currentTarget.remove());
            destroyPopup(popupForm);
            console.log(people.firstName);
        }, { once: true});
    });
}


// Remove the person from the list

const deletePerson = e => {
    // call the function here
    if (e.target.closest('button.delete')) {
        const tableRow = e.target.closest('tr');
        const id = tableRow.dataset.id;
        deletePersonPopup(id);
    }
}

const deletePersonPopup = async idToDelete => {
    let peopleList = await fetchPeople();

    return new Promise( async function(resolve) {
        const divButton = document.createElement('div');
        divButton.classList.add('wrapper');
        divButton.insertAdjacentHTML('afterbegin', `
            <p>Are you sure you want to delete this person</strong>?</p>
            <div class="d-flex flex-row justify-content-around">
                <button class="cancel">Cancel</button>
                <button class="remove">Ok</button>
            </div>
        `);

        document.body.appendChild(divButton);
        await wait(50)
        divButton.classList.add("open");

        window.addEventListener('click', e => {
            if (e.target.closest('button.cancel')) {
                destroyPopup(divButton);
            }
        });

        window.addEventListener('click', e => {
            if (e.target.closest('button.remove')) {
                const deletePerson = peopleList.filter(person => person.id !== idToDelete);
                peopleList = deletePerson;
                displayList(deletePerson);
                destroyPopup(divButton);
            }
        });

    }, { once: true });
}

tbody.addEventListener('click', editPeson);
tbody.addEventListener('click', deletePerson);