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