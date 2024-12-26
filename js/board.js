// 화면 초기화
init();

/**
 * 화면 초기화
 */
function init() {
    // 데이터 호출
    const datas = JSON.parse(localStorage.getItem("datas")) || [];
    const post_list = document.querySelector(".post_list");

    // 기존 데이터 렌더링
    post_list.innerHTML = ""; // 초기화
    datas.forEach(({ writer, content }, idx) => {
        createPostElement(post_list, writer, content, idx);
    });

    // 이벤트 리스너 추가
    document.querySelector("#btn_create").addEventListener("click", data_create);
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
    const writer = document.querySelector("#writer").value;
    const content = document.querySelector("#content").value;

    // 유효성 검사
    if (!validate(writer, content)) return;

    // 데이터 추가
    const datas = JSON.parse(localStorage.getItem("datas")) || [];
    datas.push({ writer, content });
    localStorage.setItem("datas", JSON.stringify(datas));

    // 화면 업데이트
    init();

    // 입력 필드 초기화
    document.querySelector("#writer").value = "";
    document.querySelector("#content").value = "";
}

/**
 * 데이터 불러오기
 */
function data_read() {
    return JSON.parse(localStorage.getItem("datas")) || [];
}

/**
 * 데이터 수정하기
 */
function data_update(event) {
    const id = event.target.parentElement.dataset.id;
    const datas = JSON.parse(localStorage.getItem("datas"));

    const newWriter = prompt("새로운 작성자를 입력하세요.", datas[id].writer);
    const newContent = prompt("새로운 내용을 입력하세요.", datas[id].content);

    if (!validate(newWriter, newContent)) return;

    // 데이터 업데이트
    datas[id] = { writer: newWriter, content: newContent };
    localStorage.setItem("datas", JSON.stringify(datas));

    // 화면 업데이트
    init();
}

/**
 * 데이터 삭제하기
 */
function data_delete(event) {
    const id = event.target.parentElement.dataset.id;
    let datas = JSON.parse(localStorage.getItem("datas"));

      // 모달 생성
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal_content">
            <p>정말 삭제하시겠습니까?</p>
            <button id="btn_confirm_delete">확인</button>
            <button id="btn_cancel_delete">취소</button>
        </div>
    `;

    // 모달 스타일 (간단한 예시)
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "1000";

    const modalContent = modal.querySelector(".modal_content");
    modalContent.style.backgroundColor = "white";
    modalContent.style.padding = "2rem";
    modalContent.style.borderRadius = "10px";
    modalContent.style.textAlign = "center";

    // 모달 추가
    document.body.appendChild(modal);

    // "확인" 버튼 클릭 시 삭제 진행
    document.querySelector("#btn_confirm_delete").addEventListener("click", () => {
        const updatedDatas = datas.filter((_, idx) => idx != id);
        localStorage.setItem("datas", JSON.stringify(updatedDatas));

        // 화면 업데이트
        init();

        // 모달 닫기
        document.body.removeChild(modal);
    });

    // "취소" 버튼 클릭 시 모달 닫기
    document.querySelector("#btn_cancel_delete").addEventListener("click", () => {
        document.body.removeChild(modal);
    });
}

/**
 * 포스트 요소 생성
 */
function createPostElement(parent, writer, content, idx) {
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