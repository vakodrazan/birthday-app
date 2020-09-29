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
                                Turns ${futureAge <= 1 ? futureAge + " " + "year" : futureAge + " " + "years"} old on the 
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
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            </button>
                        </td>
                        <td>
                            <button class="delete" data-id="${person.id}">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </td>
                    </tr>
                `
            })
        .join('');
}