document.addEventListener('DOMContentLoaded', () => {
    let modal = document.getElementById('modal-notice');

    function openModal() {
        modal.classList.add('active')
    }
    function closeModal() {
        modal.classList.remove('active')
    }

    window.openModal = openModal;
    window.closeModal = closeModal;
});