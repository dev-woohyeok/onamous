// 화면 초기화
init();

/**
 * 화면 초기화
 */
function init() {
    // 데이터 호출
    const boards = data_read();
    const post_list = document.querySelector(".post_list");

    // 기존 데이터 렌더링
    post_list.innerHTML = ""; // 초기화
    boards.forEach(({ writer, content }, idx) => {
        create_post_element(post_list, writer, content, idx);
    });
}

/**
 * 유효성 검사
 */
function validate(writer, content) {
    if (!writer.trim()) {
        alert("작성자를 입력해주세요.");
        return false;
    }
    if (!content.trim()) {
        alert("내용을 입력해주세요.");
        return false;
    }
    return true;
}

/**
 * 데이터 추가하기
 */
function data_create() {
    const writer = document.querySelector("#writer");
    const content = document.querySelector("#content");
    const submit = document.querySelector("#submit");

    // 유효성 검사
    if (!validate(writer.value, content.value)) return;
    const boards = data_read();
    if(submit.textContent === "작성"){
        // 데이터 추가
        boards.push({ writer : writer.value, content : content.value });
        localStorage.setItem("boards", JSON.stringify(boards));
    }else{
        // 데이터 수정
        boards[submit.dataset.id] = { writer : writer.value, content : content.value };
        localStorage.setItem("boards", JSON.stringify(boards));
        submit.removeAttribute("data-id");
    }
    // 입력 필드 초기화
    writer.value = "";
    content.value = "";
    submit.textContent = "작성";

    // 화면 업데이트
    init();
}

/**
 * 데이터 불러오기
 */
function data_read() {
    return JSON.parse(localStorage.getItem("boards")) || [];
}

/**
 * 데이터 수정하기
 */
function data_update(event) {
    const boards = JSON.parse(localStorage.getItem("boards"));
    const writer = document.querySelector('#writer');
    const content = document.querySelector('#content');
    const submit = document.querySelector(`#submit`);
    const id = event.target.parentElement.dataset.id;

    submit.dataset.id = id;
    writer.value = boards[id].writer;
    content.value = boards[id].content;
    submit.textContent = "수정";
}

/**
 * 데이터 삭제하기
 */
function data_delete(event) {
    const id = event.target.parentElement.dataset.id;
    let boards = JSON.parse(localStorage.getItem("boards"));
    // 데이터 삭제
    boards = boards.filter((_, idx) => idx != id);
    localStorage.setItem("boards", JSON.stringify(boards));
    // 화면 업데이트
    init();
}

/**
 * 포스트 요소 생성
 */
function create_post_element(parent, writer, content, idx) {
    // 새로운 post_item 요소 생성
    const postItem = document.createElement("div");
    postItem.classList.add("post_item");
    postItem.dataset.id = idx;

    // 작성자 추가
    const postWriter = document.createElement("h3");
    postWriter.classList.add("post_writer");
    postWriter.textContent = writer;

    // 내용 추가
    const postContent = document.createElement("p");
    postContent.classList.add("post_content");
    postContent.textContent = content;

    // 수정 버튼 추가
    const btn_update = document.createElement("button");
    btn_update.classList.add("btn");
    btn_update.classList.add("btn_update");
    btn_update.textContent = "수정";
    btn_update.addEventListener("click", data_update);

    // 삭제 버튼 추가
    const btn_delete = document.createElement("button");
    btn_delete.classList.add("btn");
    btn_delete.classList.add("btn_delete");
    btn_delete.textContent = "삭제";
    btn_delete.addEventListener("click", data_delete);

    // post_item에 요소 추가
    postItem.appendChild(postWriter);
    postItem.appendChild(postContent);
    postItem.appendChild(btn_update);
    postItem.appendChild(btn_delete);

    // 부모 요소에 추가
    parent.appendChild(postItem);
}