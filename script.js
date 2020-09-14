// import { formatRelative } from 'date-fns/formatRelative';
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
            person => `
                <tr data-id="${person.id}">
                    <td>
                        <img class="rounded-circle" src="${person.picture}" alt="">
                    </td>
                    <td>${person.lastName} ${person.firstName}</td>
                    <td>${person.birthday}</td>
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
        )
        .join('');
}

displayList();


// Here are something to do with the popup

function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function editPopup(popup) {
    popup.classList.remove('open'); 
    await wait(500);
    popup.remove();
    popup = null;
}

const editPeson = e => {
    console.log(e.target);
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
        console.log(popupForm);
        popupForm.classList.add('popupForm');
		popupForm.insertAdjacentHTML('afterbegin', `
			<fieldset>
				<label>LastName</label>
				<input type="text" name="picture" value="${people.picture}">
			</fieldset>
			<fieldset>
				<label>FirstName</label>
				<input type="text" name="name" value="${people.lastName} ${people.firstName}">
			</fieldset>
			<fieldset>
				<label>JobTitle</label>
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
    });
}

tbody.addEventListener('click', editPeson);