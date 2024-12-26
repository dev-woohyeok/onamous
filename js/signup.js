const imageInput = document.getElementById('user_image');
const imagePreview = document.getElementById('image-preview');
const previewContainer = document.getElementById('preview-container');

// 이미지 클릭 시 파일 업로드 트리거
imagePreview.addEventListener('click', () => {
    imageInput.click(); // 파일 선택 트리거
});

// 이미지 파일 업로드 처리
imageInput.addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imagePreview.src = e.target.result; // 미리보기 이미지 설정
            imagePreview.style.display = 'block'; // 이미지 표시
            imageInput.style.display = 'none'; // 파일 선택 태그 숨김
        };

        reader.readAsDataURL(file); // 파일을 데이터 URL로 읽음
    }
});

const saveButton = document.getElementById('signup_btn');
saveButton.addEventListener('click', () => {
    
    const userName = document.getElementById('user_name').value;
    const userMBTI = document.getElementById('user_mbti').value;
    const userGit = document.getElementById('user_git').value;
    const userBlog = document.getElementById('user_blog').value;
    const userIntroduce = document.getElementById('introduce').value;
    
    // 이미지 데이터 가져오기
    const userImage = imagePreview.src;

    // 입력값을 객체로 저장
    const userData = {
        name: userName,
        mbti: userMBTI,
        git: userGit,
        blog: userBlog,
        introduce: userIntroduce,
        image: userImage,
    };

    // localStorage에 저장
    localStorage.setItem('userData', JSON.stringify(userData));

    // 확인 메시지
    alert('정보가 성공적으로 저장되었습니다!');
});