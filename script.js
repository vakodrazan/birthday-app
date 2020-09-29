// ******* Importing ********* \\

// Import all the export functions or elements that store in other files
import { tbody, addListBtn, searchByName, searchByMonth, resetSearch, formSearch } from './libs/elements.js';
import { generatePeopleList } from './libs/generate.js';
import { wait, destroyPopup } from './libs/timing.js';
import { divButton } from './libs/utils.js';

// Get the data
const endpoint = './people.json';

// fetch data from the json file
async function fetchPeople() {
    const response = await fetch(endpoint);
    const data = await response.json();
    let persons = data;

    // display the list of people
    const displayList = () => {
        const html = generatePeopleList(persons);
        tbody.innerHTML = html;
    }

    displayList();

    // ****** Edit ******* \\
    const editPeson = e => {
        // Set all the result of the edit here
        if (e.target.closest('button.edit')) {
            const tableRowEdit = e.target.closest('tr');
            const id = tableRowEdit.dataset.id;
            editPersonPopup(id);
        }
    }

    const editPersonPopup = async idToEdit => {
        // Do all the code about the edit function here
        const people = persons.find(person => person.id == idToEdit);
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
                    <input type="date" name="birthday" value="${people.birthday}">
                </fieldset>
                <div class="form-btn">
                    <button type="button" class="cancel btn btn-warning">Cancel</button>
                    <button type="submit" class="submit btn btn-warning">Save</button>
                </div>
            `);
            document.body.appendChild(popupForm);
            await wait(50);
            popupForm.classList.add('open');

            // Reject the Changes
            window.addEventListener('click', e => {
                if (e.target.closest('button.cancel')) {
                    destroyPopup(popupForm);
                }
            });

            // Submit the change
            popupForm.addEventListener('submit', e => {
                e.preventDefault();
                people.picture = popupForm.picture.value;
                people.lastName = popupForm.lastName.value;
                people.firstName = popupForm.firstName.value;
                people.birthday = popupForm.birthday.value;

                displayList(people);
                resolve(e.currentTarget.remove());
                destroyPopup(popupForm);
                tbody.dispatchEvent(new CustomEvent('updatePeopleLs'));
            }, { once: true });

        });
    }

    // ****** Delete ****** \\
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
        // Code all thecondition about the delete list here
        return new Promise( async function(resolve) {
            await wait(50);
            document.body.appendChild(divButton);
            divButton.classList.add("open");

            // Reject it
            window.addEventListener('click', e => {
                if (e.target.closest('button.cancelDel')) {
                    destroyPopup(divButton);
                }
            });

            // Remove the person
            window.addEventListener('click', e => {
                if (e.target.closest('button.remove')) {
                    let person = persons.filter(person => person.id != idToDelete);
                    persons = person;
                    displayList(person);
                    destroyPopup(divButton);
                    tbody.dispatchEvent(new CustomEvent('updatePeopleLs'));
                }
            });
        });
    }

    // ************ Local storage ************* \\
    const initLocalStorage = () => {
        const personLs = JSON.parse(localStorage.getItem('persons'));
        if (personLs) {
            persons = personLs;
            displayList();
        }
        tbody.dispatchEvent(new CustomEvent('updatePeopleLs'));
    };
    
    const updateLocalStorage = () => {
        localStorage.setItem('persons', JSON.stringify(persons));
    };

    // ************* Add Person in the list ************* \\

    const handleAddBtn = e => {
        if (e.target.closest('button.addList')) {
            handleAddListBtn();
        }
    }

    const handleAddListBtn = id => {
        return new Promise( async function(resolve) {
            // Create a popup form when clicking the add button
            const popupAddForm = document.createElement('form');
            popupAddForm.classList.add('popupForm');
            popupAddForm.insertAdjacentHTML('afterbegin',  `
                <form class="modalForm">
                    <fieldset>
                        <label>What is your Avantar?</label>
                        <input type="url" name="pic" value="https://bit.ly/35LplYa">
                    </fieldset>
                    <fieldset>
                        <label>What is your LastName?</label>
                        <input type="text" name="lastname" value="Marie">
                    </fieldset>
                    <fieldset>
                        <label>What is your FirstName?</label>
                        <input type="text" name="firstname" value="Noeline">
                    </fieldset>
                    <fieldset>
                        <label>What is your Birthday date?</label>
                        <input type="date" name="birthDay" value="12/08/2002">
                    </fieldset>
                    <div class="form-btn">
                        <button type="button" class="cancelCond btn btn-warning">Cancel</button>
                        <button type="submit" class="submit btn btn-warning">Submit</button>
                    </div>
                </form>
            `);

            document.body.appendChild(popupAddForm);
            popupAddForm.classList.add('open');
            

            window.addEventListener('click', e => {
                if (e.target.closest('button.cancelCond')) {
                    destroyPopup(popupAddForm);
                }
            })

            // Listen to the submit event
            popupAddForm.addEventListener('submit', e => {
                e.preventDefault();
                const form = e.currentTarget;

                // Create a new object for the new 
                const newPerso = {
                    picture: form.pic.value,
                    lastName: form.lastname.value,
                    firstName: form.firstname.value,
                    birthday: form.birthDay.value,
                    id: Date.now()
                }
                persons.push(newPerso);
                displayList(persons);
                destroyPopup(popupAddForm);
                tbody.dispatchEvent(new CustomEvent('updatePeopleLs'));
            });
        });
    }

    // *********** Filter ********* \\

    // Filter the person from the list by searching their name
    const filterPersonByName = () => {
        // Get the value of the input
        const input = searchByName.value;
        const inputSearch = input.toLowerCase();
        // Filter the list by the firstname or lastname
        const searchPerson = persons.filter(person => person.lastName.toLowerCase().includes(inputSearch) || 
            person.firstName.toLowerCase().includes(inputSearch));
        const myHTML = generatePeopleList(searchPerson);
        tbody.innerHTML = myHTML;
    }

    // Filter by month
    const filterPersonMonth = e => {
        // Get the value of the select input
        const select = searchByMonth.value;
        const filterPerson = persons.filter(person => {
            // Change the month of birth into string
            const getMonthOfBirth = new Date(person.birthday)
            .toLocaleString("en-US", 
            { month: "long" }); 

            // Filter the list by the month of birth
            return getMonthOfBirth.toLowerCase().includes(select.toLowerCase());
        });
        const myHTML = generatePeopleList(filterPerson);
        tbody.innerHTML = myHTML;
    }

    // Reset the list
    const resteInputSearch = e => {
        formSearch.reset();
        displayList();
    }

    // ******** Listeners ******* \\
    addListBtn.addEventListener('click', handleAddBtn);
    tbody.addEventListener('click', editPeson);
    tbody.addEventListener('click', deletePerson);
    // Custom event
    tbody.addEventListener('updatePeopleLs', updateLocalStorage);
    // Filter event
    searchByName.addEventListener('input', filterPersonByName);
    searchByMonth.addEventListener('input', filterPersonMonth);
    resetSearch.addEventListener('click', resteInputSearch);

    initLocalStorage();
}
fetchPeople();
