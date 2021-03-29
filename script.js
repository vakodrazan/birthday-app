// ******* Importing ********* \\

// Import all the export functions or elements that store in other files
import { 
    article,
    addListBtn,
    searchByName,
    searchByMonth,
    resetSearch,
    formSearch
} from './libs/elements.js';
import { generatePeopleList } from './libs/generate.js';
import { 
    filterPersonByMonth, 
    filterPersonByName,
    showScrollBar,
    hideScrollBar
} from './libs/stroringFuctionalities.js';
import { wait, destroyPopup } from './libs/timing.js';

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
            const popupElement = document.createElement('form');
            popupElement.classList.add('outerPopup');
            popupElement.classList.add("open")
            const newDate = new Date(person.birthday).toISOString().slice(0, 10);
            const maxDate = new Date().toISOString().slice(0, 10);


            popupElement.insertAdjacentHTML('afterbegin', `
                <div class="innerPopup">
                    <div class="wrapper-content">
                        <button type="button" class="cancel cancel-button">
                            <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M43.5 14.5L14.5 43.5" stroke="#094067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14.5 14.5L43.5 43.5" stroke="#094067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <header class="title heading">
                            <h2 class="masthead">Edit ${person.firstName} ${person.lastName}</h2>
                        </header>
                        <div class="content">
                            <fieldset>
                                <label>Avantar</label>
                                <input type="url" name="picture" value="${person.picture}">
                            </fieldset>
                            <fieldset>
                                <label>Last name</label>
                                <input type="text" name="lastName" value="${person.lastName}">
                            </fieldset>
                            <fieldset>
                                <label>First name</label>
                                <input type="text" name="firstName" value="${person.firstName}">
                            </fieldset>
                            <fieldset>
                                <label>Birthday</label>
                                <input type="date" name="birthday" max="${maxDate}" value="${newDate}">
                            </fieldset>
                            </div>
                            <div class="form-btn">
                                <button type="submit" class="submit call-to-action saveButton">Save changes</button>
                                <button type="button" class="cancel cancelButton">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            hideScrollBar();
            document.body.appendChild(popupElement)
            await wait(50);
            popupElement.classList.add('open');

            // Reject the Changes
            window.addEventListener('click', e => {
                if (e.target.closest('button.cancel')) {
                    destroyPopup(popupElement);
                    showScrollBar()
                }
            });

            // Submit the change
            popupElement.addEventListener('submit', e => {
                e.preventDefault();
                person.picture = popupElement.picture.value;
                person.lastName = popupElement.lastName.value;
                person.firstName = popupElement.firstName.value;
                person.birthday = popupElement.birthday.value;

                displayList(persons);
                // resolve(e.currentTarget.remove());
                destroyPopup(popupElement);
                article.dispatchEvent(new CustomEvent('updatePeopleLs'));
                showScrollBar();
            }, { once: true });

        });
    }

    // ****** Delete ****** \\
    // Remove the person from the list
    const deletePerson = e => {
        // call the function here
        if (e.target.closest('button.delete')) {
            const sectionElem = e.target.closest('section');
            const id = sectionElem.dataset.id;
            deletePersonPopup(id);
            hideScrollBar();
        }
    }

    const deletePersonPopup = async idToDelete => {
        let person = persons.filter(person => person.id !== idToDelete);
        let selectPerson = persons.find(person => person.id === idToDelete);
        console.log(person);
        // Code all thecondition about the delete list here
        return new Promise( async function(resolve) {
            await wait(50);
            const divButton = document.createElement('div');
            divButton.classList.add('outerPopup');
            divButton.classList.add("open");
            divButton.insertAdjacentHTML('afterbegin', `
                <div class="innerPopup wrapper-content-button">
                    <div class="wrapper-content">
                        <button type="button" class="cancel cancel-button">
                            <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M43.5 14.5L14.5 43.5" stroke="#094067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14.5 14.5L43.5 43.5" stroke="#094067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <p class="information heading">Are you sure you want to delete <strong>${selectPerson.firstName} ${selectPerson.lastName}</strong>?</p>
                        <div class="button-wraper">
                            <button class="remove call-to-action">Delete</button>
                            <button class="cancel cancelButton">Cancel</button>
                        </div>
                    </div>
                </div>
            `);

            // Reject it
            window.addEventListener('click', e => {
                if (e.target.closest('button.cancel')) {
                    destroyPopup(divButton);
                    showScrollBar();
                }
            });

            // Remove the person
            window.addEventListener('click', e => {
                if (e.target.closest('button.remove')) {
                    persons = person;
                    displayList(person);
                    destroyPopup(divButton);
                    article.dispatchEvent(new CustomEvent('updatePeopleLs'));
                    showScrollBar();
                }
            });

            document.body.appendChild(divButton);
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

    const handleAddListBtn = id => {
        return new Promise( async function(resolve) {
            // Create a popup form when clicking the add button
            const popupAddForm = document.createElement('form');
            popupAddForm.classList.add('outerPopup');
            popupAddForm.classList.add("open")
            const maxDate = new Date().toISOString().slice(0, 10);
            popupAddForm.insertAdjacentHTML('afterbegin',  `
                <div class="innerPopup">
                    <div class="wrapper-content">
                        <button type="button" class="cancel cancel-button">
                            <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M43.5 14.5L14.5 43.5" stroke="#094067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14.5 14.5L43.5 43.5" stroke="#094067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <header class="title heading">
                            <h2 class="masthead">Add person to the list</h2>
                        </header>
                        <div class="content">
                            <fieldset>
                                <label>Avantar</label>
                                <input type="url" name="pic" placeholder="Pictue url">
                            </fieldset>
                            <fieldset>
                                <label>Last name</label>
                                <input type="text" name="lastname" placeholder="Type your lastname here">
                            </fieldset>
                            <fieldset>
                                <label>First name</label>
                                <input type="text" name="firstname" placeholder="Type your firstname here">
                            </fieldset>
                            <fieldset>
                                <label>Birthday</label>
                                <input type="date" name="birthDay" max="${maxDate}" placeholder="Find your birth date">
                            </fieldset>
                            <div class="form-btn">
                                <button type="submit" class="submit call-to-action">Submit</button>
                                <button type="button" class="cancel cancelButton">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            document.body.appendChild(popupAddForm);
            popupAddForm.classList.add('open');
            

            window.addEventListener('click', e => {
                if (e.target.closest('button.cancel')) {
                    destroyPopup(popupAddForm);
                    showScrollBar();
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
                showScrollBar();
            });
        });
    }

    const handleAddBtn = e => {
        if (e.target.closest('button.addList')) {
            handleAddListBtn();
            hideScrollBar();
        }
    }

    // *********** Filter ********* \\

    function filteredByNameAndMonth() {
        const filteredByName = filterPersonByName(persons);
        const filteredByNameAndMonth = filterPersonByMonth(filteredByName);
        const myHTML = generatePeopleList(filteredByNameAndMonth);
        article.innerHTML = myHTML;
    }

    // Reset search form
    const resteInputSearch = e => {
        formSearch.reset();
        displayList();
    }

    // ******** Listeners ******* \\
    addListBtn.addEventListener('click', handleAddBtn);
    article.addEventListener('click', editPeson);
    article.addEventListener('click', deletePerson);
    // Custom event
    article.addEventListener('updatePeopleLs', updateLocalStorage);
    // Filter event
    searchByName.addEventListener('input', filteredByNameAndMonth);
    searchByMonth.addEventListener('input', filteredByNameAndMonth);
    resetSearch.addEventListener('click', resteInputSearch);

    initLocalStorage();
}
fetchPeople();
