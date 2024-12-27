init();

/**
 * 화면 초기화 함수
 * 1. 로컬스토리지 데이터 호출
 * 2. 화면에 게시글 리스트를 렌더링
 */
function init() {
    // 데이터를 가져옵니다.
    const members = dataRead();
    // 맴버 정보를 표시할 HTML 요소를 선택합니다.
    const memberList = document.querySelector(".wrapper_card");

    // 기존에 표시된 맴버 정보를 초기화 (모두 삭제)합니다.
    memberList.innerHTML = "";

    // 저장된 데이터를 반복하면서 화면에 게시글 요소를 생성합니다.
    members.forEach(({ name , image }, idx) => {
        createCardElement(memberList, name, image, idx);
    });
}

/**
 * 데이터 읽기 함수
 * 로컬 스토리지에서 저장된 유저 데이터를 가져옵니다.
 * 
 * @returns {Array<Object>} - 저장된 유저 목록 (객체 배열 형태)
 * 
 * @typedef {Object} UserData
 * @property {string} name - 유저 이름
 * @property {string} mbti - MBTI 정보
 * @property {string} git - GitHub 주소
 * @property {string} blog - 블로그 주소
 * @property {string} introduce - 자기 소개 정보
 * @property {string} image - 프로필 이미지 경로
 * 
 * @example
 * const users = data_read();
 * console.log(users);
 * // 출력:
 * // [
 * //   {
 * //     name: "John",
 * //     mbti: "INTJ",
 * //     git: "https://github.com/john",
 * //     blog: "https://johnsblog.com",
 * //     introduce: "Hi, I'm John!",
 * //     image: "path/to/image.jpg"
 * //   },
 * //   ...
 * // ]
 */
function dataRead() {
    // 로컬 스토리지에 저장된 데이터를 JSON 형식으로 파싱하여 반환합니다.
    return JSON.parse(localStorage.getItem("userData")) || [];
}

/**
 * 유저 정보를 HTML 로 만드는 함수
 * 로컬 스토리지에서 저장된 유저 정보를 바탕으로 맴버 카드 요소를 생성합니다.
 * 
 * @param {HTMLElement} parent 카드 리스트 요소
 * @param {string} name - 유저 이름
 * @param {string} image - 프로필 이미지 경로
 * @param {number} idx - 게시글 ID
 */
function createCardElement(parent , name, image, idx) {
    // 카드 전체 컨테이너
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = idx;

    // 카드 헤더
    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';

    const cardTitle = document.createElement('h1');
    cardTitle.textContent = name; // 유저 이름

    cardHeader.appendChild(cardTitle);

    // 카드 본문
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const characterDiv = document.createElement('div');
    characterDiv.className = 'character';

    const baseImage = document.createElement('img');
    baseImage.src = 'https://www.pngmart.com/files/21/Among-Us-Character-PNG-Isolated-Photo.png';
    baseImage.alt = 'Base Character';

    const profileImage = document.createElement('img');
    profileImage.className = 'profile';
    profileImage.src = image || ''; // 프로필 이미지 경로
    profileImage.alt = 'Profile';

    characterDiv.appendChild(baseImage);
    characterDiv.appendChild(profileImage);
    cardBody.appendChild(characterDiv);

    card.appendChild(cardHeader);
    card.appendChild(cardBody);

    // 카드 부모 요소에 추가
    parent.appendChild(card);
}