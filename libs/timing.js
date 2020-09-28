// Here are something to do with the popup
export function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export async function destroyPopup(popup) {
    popup.classList.remove('open'); 
    await wait(500);
    popup.remove();
    popup = null;
}