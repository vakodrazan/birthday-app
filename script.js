// ******* Importing ********* \\

// Import all the export functions or elements that store in other files
import { article, addListBtn, searchByName, searchByMonth } from './libs/elements.js';
import { generatePeopleList } from './libs/generate.js';
import { wait, destroyPopup } from './libs/timing.js';
import { divButton } from './libs/utils.js';

// Import the local file that contains the data
import peopleData from './people.json';


// fetch data from the json file
async function fetchPeople() {

    let persons = peopleData;

    // display the list of people
    const displayList = () => {
        const html = generatePeopleList(persons);
        article.innerHTML = html;
    }

    displayList();

    // ****** Edit ******* \\
    const editPeson = e => {
        // Set all the result of the edit here
        if (e.target.closest('button.edit')) {
            const tableRowEdit = e.target.closest('section');
            const id = tableRowEdit.dataset.id;
            editPersonPopup(id);
        }
    }

    const editPersonPopup = async idToEdit => {
        // Do all the code about the edit function here
        const person = persons.find(person => person.id == idToEdit);
        return new Promise( async function(resolve) {
            const popupForm = document.createElement('form');
            popupForm.classList.add('popupForm');
            const newDate = new Date(person.birthday).toLocaleDateString();
            popupForm.insertAdjacentHTML('afterbegin', `
                <fieldset>
                    <label>Avantar</label>
                    <input type="url" name="picture" value="${person.picture}">
                </fieldset>
                <fieldset>
                    <label>LastName</label>
                    <input type="text" name="lastName" value="${person.lastName}">
                </fieldset>
                <fieldset>
                    <label>FirstName</label>
                    <input type="text" name="firstName" value="${person.firstName}">
                </fieldset>
                <fieldset>
                    <label>Birth day</label>
                    <input type="text" name="birthday" value="${newDate}">
                </fieldset>
                <div class="form-btn">
                <button type="submit" class="submit btn saveButton">Save changes</button>
                <button type="button" class="cancel btn cancelButton">Cancel</button>
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
                person.picture = popupForm.picture.value;
                person.lastName = popupForm.lastName.value;
                person.firstName = popupForm.firstName.value;
                person.birthday = popupForm.birthday.value;

                displayList(persons);
                // resolve(e.currentTarget.remove());
                destroyPopup(popupForm);
                article.dispatchEvent(new CustomEvent('updatePeopleLs'));
            }, { once: true });

        });
    }

    // ****** Delete ****** \\
    // Remove the person from the list
    const deletePerson = e => {
        // call the function here
        if (e.target.closest('button.delete')) {
            const tableRow = e.target.closest('section');
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
                    article.dispatchEvent(new CustomEvent('updatePeopleLs'));
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
        article.dispatchEvent(new CustomEvent('updatePeopleLs'));
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
                        <input type="url" name="pic" placeholder="Pictue url">
                    </fieldset>
                    <fieldset>
                        <label>What is your LastName?</label>
                        <input type="text" name="lastname" placeholder="Type your lastname here">
                    </fieldset>
                    <fieldset>
                        <label>What is your FirstName?</label>
                        <input type="text" name="firstname" placeholder="Type your firstname here">
                    </fieldset>
                    <fieldset>
                        <label>What is your Birthday date?</label>
                        <input type="date" name="birthDay" placeholder="Find your birth date">
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
                article.dispatchEvent(new CustomEvent('updatePeopleLs'));
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
        article.innerHTML = myHTML;
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
        article.innerHTML = myHTML;
    }

    // ******** Listeners ******* \\
    addListBtn.addEventListener('click', handleAddBtn);
    article.addEventListener('click', editPeson);
    article.addEventListener('click', deletePerson);
    // Custom event
    article.addEventListener('updatePeopleLs', updateLocalStorage);
    // Filter event
    searchByName.addEventListener('input', filterPersonByName);
    searchByMonth.addEventListener('input', filterPersonMonth);

    initLocalStorage();
}
fetchPeople();
