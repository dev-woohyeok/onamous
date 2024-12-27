document.addEventListener('DOMContentLoaded', () => {
    let modal = document.getElementById('modal-notice');

    function openModal() {
        modal.classList.add('active')
        const username = localStorage.getItem('');
        const mbti = localStorage.getItem('');
        const gitHub = localStorage.getItem('');
        const blog = localStorage.getItem('');
        const introduction = localStorage.getItem('');

        document.getElementsById('modal-').innerText = username;
        document.getElementsById('modal-').innerText = mbti;
        document.getElementsById('modal-').innerText = gitHub;
        document.getElementsById('modal-').innerText = blog;
        document.getElementsById('modal-').innerText = introduction;
    }
    function closeModal() {
        modal.classList.remove('active')
    }

    window.openModal = openModal;
    window.closeModal = closeModal;
});