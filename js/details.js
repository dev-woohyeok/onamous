// const userData = [
//     {
//         "name": "문효진",
//         "mbti": "ESTP",
//         "git": "https://github.com/dev-woohyeok/onamous",
//         "blog": "https://github.com/dev-woohyeok/onamous",
//         "introduce": "자기소개입니다",
//         "image": "https://i.namu.wiki/i/ZMSq7HebmcYJzC7r6J0hlXMc6mYC8jcIZ4Pw6LBqn_YI0CcSB75JbKX541Vs2CCpCtAl0-UWyve08s4ZdNEiPg.webp"
//     },
//     {
//         "name": "오영진",
//         "mbti": "ENFP",
//         "git": "https://github.com/dev-woohyeok/onamous",
//         "blog": "https://github.com/dev-woohyeok/onamous",
//         "introduce": "오영진입니다.",
//         "image": "https://i.namu.wiki/i/ZMSq7HebmcYJzC7r6J0hlXMc6mYC8jcIZ4Pw6LBqn_YI0CcSB75JbKX541Vs2CCpCtAl0-UWyve08s4ZdNEiPg.webp"
//     },
//     {
//         "name": "김우혁",
//         "mbti": "ISTP",
//         "git": "https://github.com/dev-woohyeok/onamous",
//         "blog": "https://github.com/dev-woohyeok/onamous",
//         "introduce": "김우혁 입니다.",
//         "image": "https://i.namu.wiki/i/ZMSq7HebmcYJzC7r6J0hlXMc6mYC8jcIZ4Pw6LBqn_YI0CcSB75JbKX541Vs2CCpCtAl0-UWyve08s4ZdNEiPg.webp"
//     },
//     {
//         "name": "김종연",
//         "mbti": "ISTJ",
//         "git": "https://github.com/dev-woohyeok/onamous",
//         "blog": "https://github.com/dev-woohyeok/onamous",
//         "introduce": "김종연 입니다!",
//         "image": "https://i.namu.wiki/i/ZMSq7HebmcYJzC7r6J0hlXMc6mYC8jcIZ4Pw6LBqn_YI0CcSB75JbKX541Vs2CCpCtAl0-UWyve08s4ZdNEiPg.webp"
//     },
//     {
//         "name": "이성훈",
//         "mbti": "INFJ",
//         "git": "https://github.com/dev-woohyeok/onamous",
//         "blog": "https://github.com/dev-woohyeok/onamous",
//         "introduce": "이성훈 입니다",
//         "image": "https://i.namu.wiki/i/ZMSq7HebmcYJzC7r6J0hlXMc6mYC8jcIZ4Pw6LBqn_YI0CcSB75JbKX541Vs2CCpCtAl0-UWyve08s4ZdNEiPg.webp"
//     }
// ]
// localStorage.setItem('userData', JSON.stringify(userData));

// 화면 초기화 (초기 상태로 화면을 세팅하는 함수)
init();

/**
 * 화면 초기화 함수
 * 1. 저장된 데이터를 가져옵니다.
 * 2. 화면에 게시글 리스트를 렌더링합니다.
 */
function init() {
    // 데이터를 가져옵니다.
    const userData = data_read();
}

document.addEventListener('DOMContentLoaded', () => {
    let modal = document.getElementById('modal-notice');

    function openModal() {
        modal.classList.add('active');
        data_update();
    }
    function closeModal() {
        modal.classList.remove('active')
    }

    window.openModal = openModal;
    window.closeModal = closeModal;
});

/*
* 데이터 읽기 함수
* 로컬 스토리지에서 저장된 데이터를 가져옵니다.
*/
function data_read() {
    //로컬 스토리지에서 저장된 데이터를 JSON 형식으로 파싱 후 반환합니다.
    return JSON.parse(localStorage.getItem('userData'));
}

function data_update(event) {
    // 로컬 스토리지에서 데이터를 가져옵니다.
    const userData = data_read();

    // 클릭된 링크의 ID를 가져옵니다.
    const id = event.target.dataset.id || event.target.parentElement.dataset.id;

    // 선택된 데이터가 존재하는지 확인합니다.
    if (!userData || !userData[id]) {
        console.error('해당 ID의 데이터가 존재하지 않습니다.');
        return;
    }

    // 모달 요소를 선택합니다.
    const modalInform = document.querySelector('#modal-inform');
    console.log(modalInform);
    if (!modalInform) {
        console.error('모달 정보 영역(#modal-inform)이 존재하지 않습니다.');
        return;
    }

    // 데이터 채우기
    modalInform.querySelector('h2').textContent = userData[id].name;
    modalInform.querySelector('.modal-body h4:nth-child(1)').textContent = `MBTI: ${userData[id].mbti}`;
    modalInform.querySelector('.modal-body h4:nth-child(2)').textContent = `Github: ${userData[id].git}`;
    modalInform.querySelector('.modal-body h4:nth-child(3)').textContent = `Blog: ${userData[id].blog}`;
    modalInform.querySelector('.modal-body h4:nth-child(4)').textContent = `자기소개: ${userData[id].introduce}`;
    modalInform.querySelector('img').src = userData[id].image;

    console.log(modalInform.querySelector('h2'));
    // 모달 열기
    openModal();
}

/*
* 데이터 삭제 함수
*/
function data_delete(event) {
    //삭제할 게시글의 아이디를 가져옵니다.
    const id = event.target.parentElement.dataset.id;
    //전체 데이터를 불러 읽습니다.
    let userData = data_read();
    //해당 id값과 다른 데이터들을 필터로 걸러냅니다.
    userData = userData.filter((_, idx) => id != idx);
    //걸러낸 데이터를 문자열로 stringify시키고 저장합니다.
    localStorage.setItem('userData', JSON.stringify(userData));
    //초기화 합니다.
    init();
}

// // 수정 버튼 생성
// const btn_update = document.createElement("button");
// btn_update.classList.add("btn", "btn_update");
// btn_update.textContent = "수정";
// // 수정 버튼 클릭 시 데이터 수정 함수 호출
// btn_update.addEventListener("click", data_update);

// // 삭제 버튼 생성
// const btn_delete = document.createElement("button");
// btn_delete.classList.add("btn", "btn_delete");
// btn_delete.textContent = "삭제";
// // 삭제 버튼 클릭 시 데이터 삭제 함수 호출
// btn_delete.addEventListener("click", data_delete);