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
                        <img src="${person.picture}" alt="">
                    </td>
                    <td>${person.lastName} ${person.firstName}</td>
                    <td>${person.birthday}</td>
                    <td>
                        <button class="edit" data-id="">
                            Edit
                        </button>
                    </td>
                    <td>
                        <button class="delete" data-id="${person.id}">
                            Delete
                        </button>
                    </td>
                </tr>
            `
        )
        .join('');
}

displayList();