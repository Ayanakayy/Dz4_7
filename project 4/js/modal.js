const modal = document.querySelector('.modal')
const triggerButton = document.querySelector('#btn-get')
const  closeButton = document.querySelector('.modal_close')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
    window.removeEventListener("scroll", scrollEnd);

}
function scrollEnd() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        openModal();
    }
}
setTimeout(openModal, 100000000000000000000000000);
window.addEventListener("scroll", scrollEnd);
const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}
triggerButton.onclick = () => openModal()
closeButton.onclick = () => closeModal()
modal.onclick = () => {
    if (event.target === modal) {
        closeModal()
    }
}