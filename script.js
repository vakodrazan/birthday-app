import {tbody, addListBtn} from './libs/elements.js';
// Get the data
const endpoint = './people.json';

// fetch data from the json file
async function fetchPeople() {
    const response = await fetch(endpoint);
    const data = await response.json();
    let persons = data;

    function generatePeopleList(people) {
        return people
            .sort( function(a, b) {
                // Sort it by Month
                return new Date (a.birthday).getMonth() - new Date (b.birthday).getMonth();
            })
            .map(
                person => {
                    // Get the suffix for the date 
                    function nthDate(day) {
                        if (day > 3 && day < 21) return "th";
                        switch (day % 10) {
                            case 1: return "st";
                            case 2: return "nd";
                            case 3: return "rd";
                            default: return "th"; 
                        }
                    }
                    // Get the birthday date
                    const today = new Date();
                    const currentDate = new Date(person.birthday);
                    const currentDay = currentDate.getDate();
                    const month = currentDate.getMonth();
                    const year = currentDate.getFullYear();
                    const fullDate = `${currentDay}${nthDate(currentDay)} / ${month + 1}/ ${year}`;
                    const personAge = today.getFullYear() - year;
                    const futureAge = personAge;

                    // ********** Counting date ******** \\
                    // Counting how many days left untill the person's birthday
                    const momentYear = today.getFullYear();
                    const birthDayDate = new Date(momentYear, month, currentDay );
                    let oneDay=1000*60*60*24;
                    const getTheDate = birthDayDate.getTime() - today.getTime();
                    const dayLeft = Math.ceil(getTheDate / (oneDay));


                    return `
                        <tr data-id="${person.id}">
                            <td>
                                <img class="rounded-circle" src="${person.picture}" alt="This the picture for ${person.firstName} ${person.lastName}">
                            </td>
                            <td>
                                <span>${person.lastName} ${person.firstName}</span>
                                <p>
                                    Turns ${futureAge} years old on the 
                                    ${new Date(person.birthday)
                                        .toLocaleString("en-US", 
                                    { month: "long" })}
                                    <time datetime="${fullDate}">
                                        ${new Date(person.birthday)
                                            .toLocaleString("en-US", 
                                            { day: "numeric" })}
                                            <sup>${nthDate(currentDay)}</sup>
                                    </time> 
                                </p>
                            </td>
                            <td><time datetime="${fullDate}">${fullDate}</time></td>
                            <td>${dayLeft < 0 ? dayLeft * -1 + " " + "days ago" : dayLeft + " days"}
                            </td>
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

    // display the list of people
    const displayList = () => {
        const html = generatePeopleList(persons);
        tbody.innerHTML = html;
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
            const divButton = document.createElement('div');
            divButton.classList.add('wrapper');
            divButton.insertAdjacentHTML('afterbegin', `
                <p>Are you sure you want to delete this person</strong>?</p>
                <div class="d-flex flex-row justify-content-around">
                    <button class="cancelDel btn btn-danger">Cancel</button>
                    <button class="remove btn btn-danger">Ok</button>
                </div>
            `); 
            document.body.appendChild(divButton);
            await wait(50)
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

            popupAddForm.addEventListener('submit', e => {
                e.preventDefault();
                const form = e.currentTarget;
    
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

    // ******** Listeners ******* \\
    addListBtn.addEventListener('click', handleAddBtn);
    tbody.addEventListener('click', editPeson);
    tbody.addEventListener('click', deletePerson);
    // Custom event
    tbody.addEventListener('updatePeopleLs', updateLocalStorage);

    initLocalStorage();
}
fetchPeople();
