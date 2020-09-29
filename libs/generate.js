export function generatePeopleList(people) {
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
                const fullDate = `${currentDay}${nthDate(currentDay)} / ${month + 1} / ${year}`;
                const futureAge = today.getFullYear() - year;

                // ********** Counting date ******** \\
                // Counting how many days left untill the person's birthday
                const momentYear = today.getFullYear();
                const birthDayDate = new Date(momentYear, month, currentDay );
                let oneDay = 1000 * 60 * 60 * 24;
                const getTheDate = birthDayDate.getTime() - today.getTime();
                const dayLeft = Math.ceil(getTheDate / oneDay);


                return `
                    <tr data-id="${person.id}">
                        <td>
                            <img class="rounded-circle" src="${person.picture}" alt="This the picture for ${person.firstName} ${person.lastName}">
                        </td>
                        <td>
                            <span class="persoName">${person.lastName} ${person.firstName}</span>
                            <p>
                                Turns ${futureAge} years old on the 
                                ${new Date(person.birthday)
                                    .toLocaleString("en-US", 
                                { month: "long" })}
                                <time datetime="${fullDate}">
                                    ${new Date(person.birthday)
                                        .toLocaleString("en-US", 
                                        { day: "numeric" })}<sup>${nthDate(currentDay)}</sup>
                                </time> 
                            </p>
                        </td>
                        <td><time datetime="${fullDate}">${fullDate}</time></td>
                        <td>${dayLeft < 0 ? dayLeft * -1 + " " + "days ago" :
                            dayLeft <= 1 ? dayLeft + " " + "day" :
                            dayLeft + 'days'}
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