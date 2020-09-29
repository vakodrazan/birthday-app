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
