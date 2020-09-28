// Create a form element for the edit perso
export const popupAddForm = document.createElement('form');
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

// Create a div element that contains the two button for the delete,
// Cancel the deletion or accept it 
export const divButton = document.createElement('div');
divButton.classList.add('wrapper');
divButton.insertAdjacentHTML('afterbegin', `
    <p>Are you sure you want to delete this person</strong>?</p>
    <div class="d-flex flex-row justify-content-around">
        <button class="cancelDel btn btn-danger">Cancel</button>
        <button class="remove btn btn-danger">Ok</button>
    </div>
`);