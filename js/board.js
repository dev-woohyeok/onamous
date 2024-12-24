// const datas = [ // 더미 데이터
//         {
//             writer : "김우혁",
//             content : "안녕하세요! 김우혁입니다.",
//         },
//         {
//             writer : "김종연",
//             content : "다들 잘부탁드립니다!",
//         },
//         {
//             writer : "문효진",
//             content : "안녕하세요! 모두 화이팅!!!",
//         },
//         {
//             writer : "이성훈",
//             content : "반갑습니다! 이성훈입니다 잘부탁드립니다!",
//         },
//     ];

init();



/**
 * 화면 초기화
 */
function init() {
    // 데이터 호출
    const datas = JSON.parse(localStorage.getItem('datas'));
    const post_list = document.querySelector(".post_list");

    datas.forEach(({writer, content}, idx) => {
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

        // post_item에 작성자와 내용 추가
        postItem.appendChild(postWriter);
        postItem.appendChild(postContent);

        //  수정 버튼 추가
        const btn_update = document.createElement("button");
        btn_update.classList.add("btn");
        btn_update.classList.add("btn_update");
        btn_update.textContent = "수정";
        postItem.appendChild(btn_update);

        // 삭제 버튼 추가
        const btn_delete = document.createElement("button");
        btn_delete.classList.add("btn");
        btn_delete.classList.add("btn_delete");
        btn_delete.textContent = "삭제";
        postItem.appendChild(btn_delete);

        // post_list에 post_item 추가
        post_list.appendChild(postItem);
    });
}



/**
 * 유효성 검사
 */
function validate() {

}

/**
 * 데이터 추가하기
 */
function data_create(event) {
    console.log(event);
}


/**
 * 데이터 불러오기
 */
function data_read() {

}

/**
 * 데이터 수정하기
 */
function data_update() {

}

/**
 * 데이터 삭제하기
 */
function data_delete(){

}
