export function generatePeopleList(people) {

    const sortedPeople = people.sort(function(a, b) {
        function peopleBirthday(month, day) {
            let today = new Date(),
            currentYear = today.getFullYear(),
            next = new Date(currentYear, month - 1, day);
            today.setHours(0, 0, 0, 0);
            if (today > next) next.setFullYear(currentYear + 1);
            return Math.round((next - today) / 8.64e7);
        }
        let birthdayA = peopleBirthday(new Date(a.birthday).getMonth()+1,new Date(a.birthday).getDate());
        let birthdayB = peopleBirthday(new Date(b.birthday).getMonth()+1,new Date(b.birthday).getDate());
        return birthdayA - birthdayB;
    });

    return sortedPeople.map(
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
                const birthdayInDate = dayLeft < 0 ? 365 + dayLeft : dayLeft;

                return `
                    <section data-id="${person.id}" class="person-list"> 
                        <div class="item-about">
                            <img class="person-avantar" src="${person.picture}" alt="This the picture for ${person.firstName} ${person.lastName}">
                            <div>
                                <span class="personName">${person.firstName} ${person.lastName}</span>
                                <p class="personAge">
                                    Turns <span class="age">${dayLeft < 0 ? futureAge + 1 : futureAge }</span> on 
                                    ${new Date(person.birthday)
                                        .toLocaleString("en-US", 
                                    { month: "long" })}
                                    <time datetime="${fullDate}">
                                        ${new Date(person.birthday)
                                            .toLocaleString("en-US", 
                                            { day: "numeric" })}<sup>${nthDate(currentDay)}</sup>
                                    </time> 
                                </p>
                            </div>
                        </div>
                        
                        <div class="wrapper-actions">
                            <time datetime="${fullDate}" class="date">
                                    In ${birthdayInDate > 1 
                                        ? `${birthdayInDate} days` 
                                        : birthdayInDate < 1 
                                        ? "Happy birthday" 
                                        : `${birthdayInDate} day`
                                    }
                            </time>
                            <div class="actions">
                                <button class="edit" data-id="${person.id}">
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.75 5H5C4.33696 5 3.70107 5.26339 3.23223 5.73223C2.76339 6.20107 2.5 6.83696 2.5 7.5V25C2.5 25.663 2.76339 26.2989 3.23223 26.7678C3.70107 27.2366 4.33696 27.5 5 27.5H22.5C23.163 27.5 23.7989 27.2366 24.2678 26.7678C24.7366 26.2989 25 25.663 25 25V16.25" stroke="#094067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M23.125 3.125C23.6223 2.62772 24.2967 2.34835 25 2.34835C25.7033 2.34835 26.3777 2.62772 26.875 3.125C27.3723 3.62228 27.6517 4.29674 27.6517 5C27.6517 5.70326 27.3723 6.37772 26.875 6.875L15 18.75L10 20L11.25 15L23.125 3.125Z" stroke="#094067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                <button class="delete" data-id="${person.id}">
                                    <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M26.25 1H10L1.25 11L10 21H26.25C26.913 21 27.5489 20.7366 28.0178 20.2678C28.4866 19.7989 28.75 19.163 28.75 18.5V3.5C28.75 2.83696 28.4866 2.20107 28.0178 1.73223C27.5489 1.26339 26.913 1 26.25 1V1Z" stroke="#EF4565" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M22.5 7.25L15 14.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M15 7.25L22.5 14.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </section>
                `
            }
        )
        .join('')
    ;
}