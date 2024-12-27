init();

/**
 * 화면 초기화 함수
 * 1. 로컬 스토리지 데이터 호출
 * 2. 화면에 게시글 리스트를 렌더링
 */
function init() {
    const members = dataRead(); // 로컬 스토리지 데이터 가져오기
    const memberList = document.querySelector(".wrapper_card"); // 카드 리스트 요소 가져오기

    memberList.innerHTML = ""; // 기존 리스트 초기화

    members.forEach((member, idx) => {
        createCardElement(memberList, member, idx); // 카드 요소 생성 및 추가
    });
}

/**
 * 데이터 읽기 함수
 * 로컬 스토리지에서 저장된 유저 데이터를 가져옵니다.
 *
 * @returns {Array<Object>} - 저장된 유저 목록
 */
function dataRead() {
    return JSON.parse(localStorage.getItem("userData")) || [];
}

function moveUpdate(event) {
    const index = event.target.parentElement.dataset.id;
    window.location.href = `edit.html?index=${index}`;
}

function deleteModal(event) {
    const index = event.target.parentElement.dataset.id;
    let datas = dataRead().filter((_, idx) => idx != index); // 데이터 읽기
    localStorage.setItem('userData', JSON.stringify(datas)); // 로컬 스토리지 업데이트
    const modal = document.getElementById('modal-notice');
    modal.classList.remove('active');
    init(); // 화면 초기화
}

/**
 * 모달 업데이트 함수
 * 유저 데이터를 기반으로 모달 내용을 업데이트합니다.
 *
 * @param {Object} user - 선택된 유저 데이터
 */
function updateModal(user) {
    const modalImg = document.querySelector('.modal-image');
    const modalName = document.querySelector('.modal-name');
    const modalMBTI = document.querySelector('.modal-mbti');
    const modalGit = document.querySelector('.modal-git');
    const modalBlog = document.querySelector('.modal-blog');
    const modalIntro = document.querySelector('.modal-intro');
    const modalbtn = document.querySelector('.modal-btn');

    // 모달 내용 업데이트
    modalbtn.dataset.id = user.index;
    modalImg.src = user.image;
    modalName.textContent = user.name;
    modalMBTI.textContent = `MBTI : ${user.mbti}`;
    modalGit.textContent = `Github : ${user.git}`;
    modalBlog.textContent = `Blog : ${user.blog}`;
    modalIntro.textContent = `자기소개 : ${user.introduce}`;

    // 모달 활성화
    const modal = document.getElementById('modal-notice');
    modal.classList.add('active');
}

/**
 * 모달 닫기 함수
 * 모달을 비활성화합니다.
 */
function closeModal() {
    const modal = document.getElementById('modal-notice');
    modal.classList.remove('active');
}

/**
 * 유저 정보를 HTML로 만드는 함수
 * 로컬 스토리지에서 저장된 유저 데이터를 바탕으로 카드 요소를 생성합니다.
 *
 * @param {HTMLElement} parent - 카드 리스트 요소
 * @param {Object} user - 유저 데이터
 * @param {number} idx - 유저 ID
 */
function createCardElement(parent, user, idx) {
    const { name, image } = user;

    // 카드 컨테이너 생성
    const card = createElement('div', 'card', { 'data-id': idx });
    card.addEventListener('click', () => {
        updateModal({ ...user, index: idx }); // 모달 업데이트
    });

    // 카드 헤더
    const cardHeader = createElement('div', 'card-header');
    const cardTitle = createElement('h1', null, {}, name);
    cardHeader.appendChild(cardTitle);

    // 카드 본문
    const cardBody = createElement('div', 'card-body');
    const characterDiv = createElement('div', 'character');

    const baseImage = createElement('img', null, { src: 'https://www.pngmart.com/files/21/Among-Us-Character-PNG-Isolated-Photo.png', alt: 'Base Character' });
    const profileImage = createElement('img', 'profile', { src: image || '', alt: 'Profile' });

    characterDiv.appendChild(baseImage);
    characterDiv.appendChild(profileImage);
    cardBody.appendChild(characterDiv);

    // 카드 요소 조립 및 추가
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    parent.appendChild(card);
}

/**
 * HTML 요소 생성 헬퍼 함수
 * 새로운 HTML 요소를 생성하고 속성과 내용을 설정합니다.
 *
 * @param {string} tag - HTML 태그명
 * @param {string} className - 요소의 클래스명
 * @param {Object} attributes - 요소의 속성
 * @param {string} textContent - 요소의 텍스트 내용
 * @returns {HTMLElement} - 생성된 HTML 요소
 */
function createElement(tag, className = null, attributes = {}, textContent = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
    if (textContent) element.textContent = textContent;
    return element;
}