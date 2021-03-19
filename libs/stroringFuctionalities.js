import { searchByMonth, searchByName } from "./elements";


// Filter the person from the list by searching their name
export function filterPersonByName(people){
    // Get the value of the input
    const input = searchByName.value;
    const inputSearch = input.toLowerCase();
    // Filter the list by the firstname or lastname
    return people.filter(person => person.lastName.toLowerCase().includes(inputSearch) || 
        person.firstName.toLowerCase().includes(inputSearch));
}

// Filter by month
export function filterPersonByMonth(people) {
    // Get the value of the select input
    const select = searchByMonth.value;
    const filterPerson = people.filter(person => {
        // Change the month of birth into string
        const getMonthOfBirth = new Date(person.birthday)
        .toLocaleString("en-US", 
        { month: "long" }); 

        // Filter the list by the month of birth
        return getMonthOfBirth.toLowerCase().includes(select.toLowerCase());
    });
    return filterPerson;
}