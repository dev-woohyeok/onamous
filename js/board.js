// 화면 초기화 (초기 상태로 화면을 세팅하는 함수)
init();

/**
 * 화면 초기화 함수
 * 1. 저장된 데이터를 가져옵니다.
 * 2. 화면에 게시글 리스트를 렌더링합니다.
 */
function init() {
    // 데이터를 가져옵니다.
    const boards = data_read();
    // 게시글을 표시할 HTML 요소를 선택합니다.
    const postList = document.querySelector(".post_list");

    // 기존에 표시된 게시글을 초기화 (모두 삭제)합니다.
    postList.innerHTML = "";

    // 저장된 데이터를 반복하면서 화면에 게시글 요소를 생성합니다.
    boards.forEach(({ writer, content }, idx) => {
        create_post_element(postList, writer, content, idx);
    });
}

/**
 * 유효성 검사 함수
 * 작성자와 내용을 확인하여 빈 값이 있는지 체크합니다.
 * @param {string} writer - 작성자 이름
 * @param {string} content - 작성된 내용
 * @returns {boolean} - 유효한 값이면 true, 그렇지 않으면 false
 */
function validate(writer, content) {
    // 작성자 이름이 비어있으면 경고 메시지를 표시하고 false를 반환합니다.
    if (!writer.trim()) {
        alert("작성자를 입력해주세요.");
        return false;
    }
    // 작성된 내용이 비어있으면 경고 메시지를 표시하고 false를 반환합니다.
    if (!content.trim()) {
        alert("내용을 입력해주세요.");
        return false;
    }
    // 모든 값이 유효하면 true를 반환합니다.
    return true;
}

/**
 * 데이터 추가 및 수정 함수
 * 입력된 데이터를 저장하거나 수정된 데이터를 업데이트합니다.
 */
function data_create() {
    // 작성자와 내용을 입력하는 HTML 요소를 선택합니다.
    const writer = document.querySelector("#writer");
    const content = document.querySelector("#content");
    const submit = document.querySelector("#submit");

    // 유효성 검사: 작성자와 내용이 비어있지 않은지 확인합니다.
    if (!validate(writer.value, content.value)) return;

    // 현재 저장된 데이터를 가져옵니다.
    const boards = data_read();

    if (submit.textContent === "작성") {
        // 데이터 추가 로직: 새 데이터를 저장합니다.
        boards.push({ writer: writer.value, content: content.value });
    } else {
        // 데이터 수정 로직: 특정 ID의 데이터를 수정합니다.
        boards[submit.dataset.id] = { writer: writer.value, content: content.value };
        // 수정 모드 초기화 (ID 데이터 제거)
        submit.removeAttribute("data-id");
    }

    // 변경된 데이터를 로컬 스토리지에 저장합니다.
    localStorage.setItem("boards", JSON.stringify(boards));

    // 입력 필드를 초기화합니다.
    writer.value = "";
    content.value = "";
    submit.textContent = "작성";

    // 화면을 다시 렌더링합니다.
    init();
}

/**
 * 데이터 읽기 함수
 * 로컬 스토리지에서 저장된 데이터를 가져옵니다.
 * @returns {Array} - 저장된 게시글 목록 (배열 형태)
 */
function data_read() {
    // 로컬 스토리지에 저장된 데이터를 JSON 형식으로 파싱하여 반환합니다.
    return JSON.parse(localStorage.getItem("boards")) || [];
}

/**
 * 데이터 수정 함수
 * 특정 게시글 데이터를 수정할 수 있도록 입력 필드에 값을 채웁니다.
 * @param {Event} event - 클릭 이벤트
 */
function data_update(event) {
    // 로컬 스토리지에서 데이터를 가져옵니다.
    const boards = data_read();
    // 입력 필드 요소를 선택합니다.
    const writer = document.querySelector('#writer');
    const content = document.querySelector('#content');
    const submit = document.querySelector(`#submit`);
    // 클릭된 게시글의 ID를 가져옵니다.
    const id = event.target.parentElement.dataset.id;

    // 선택된 게시글의 데이터를 입력 필드에 채웁니다.
    writer.value = boards[id].writer;
    content.value = boards[id].content;

    // 수정 모드로 전환: 버튼 텍스트를 변경하고, ID를 저장합니다.
    submit.textContent = "수정";
    submit.dataset.id = id;
}

/**
 * 데이터 삭제 함수
 * 특정 게시글 데이터를 삭제합니다.
 * @param {Event} event - 클릭 이벤트
 */
function data_delete(event) {
    // 삭제할 게시글의 ID를 가져옵니다.
    const id = event.target.parentElement.dataset.id;
    // 로컬 스토리지에서 데이터를 가져옵니다.
    let boards = data_read();

    // 해당 ID의 데이터를 제외한 나머지를 필터링합니다.
    boards = boards.filter((_, idx) => idx != id);

    // 변경된 데이터를 로컬 스토리지에 저장합니다.
    localStorage.setItem("boards", JSON.stringify(boards));

    // 화면을 다시 렌더링합니다.
    init();
}

/**
 * 게시글 요소 생성 함수
 * 게시글 데이터를 기반으로 화면에 표시할 요소를 생성합니다.
 * @param {HTMLElement} parent - 게시글 리스트 요소
 * @param {string} writer - 작성자 이름
 * @param {string} content - 게시글 내용
 * @param {number} idx - 게시글 ID (배열 인덱스)
 */
function create_post_element(parent, writer, content, idx) {
    // 게시글 항목을 담을 새로운 div 요소 생성
    const postItem = document.createElement("div");
    postItem.classList.add("post_item"); // 클래스 추가
    postItem.dataset.id = idx; // ID를 데이터 속성으로 저장

    // 작성자 정보를 담을 요소 생성
    const postWriter = document.createElement("h3");
    postWriter.classList.add("post_writer");
    postWriter.textContent = writer;

    // 게시글 내용을 담을 요소 생성
    const postContent = document.createElement("p");
    postContent.classList.add("post_content");
    postContent.textContent = content;

    // 수정 버튼 생성
    const btn_update = document.createElement("button");
    btn_update.classList.add("btn", "btn_update");
    btn_update.textContent = "수정";
    // 수정 버튼 클릭 시 데이터 수정 함수 호출
    btn_update.addEventListener("click", data_update);

    // 삭제 버튼 생성
    const btn_delete = document.createElement("button");
    btn_delete.classList.add("btn", "btn_delete");
    btn_delete.textContent = "삭제";
    // 삭제 버튼 클릭 시 데이터 삭제 함수 호출
    btn_delete.addEventListener("click", data_delete);

    // 게시글 항목에 작성자, 내용, 버튼을 추가
    postItem.appendChild(postWriter);
    postItem.appendChild(postContent);
    postItem.appendChild(btn_update);
    postItem.appendChild(btn_delete);

    // 부모 요소에 게시글 항목을 추가
    parent.appendChild(postItem);
}