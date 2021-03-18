// Create a div element that contains the two button for the delete,
// Cancel the deletion or accept it 
export const divButton = document.createElement('div');
divButton.classList.add('outerPopup');
divButton.insertAdjacentHTML('afterbegin', `
    <div class="innerPopup wrapper-content-button">
        <div class="wrapper-content">
            <button type="button" class="cancel cancel-button">
                <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M43.5 14.5L14.5 43.5" stroke="#094067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.5 14.5L43.5 43.5" stroke="#094067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <p class="information">Are you sure you want to delete this person</strong>?</p>
            <div class="button-wraper">
                <button class="remove call-to-action">Delete</button>
                <button class="cancel cancelButton">Cancel</button>
            </div>
        </div>
    </div>
`);
