const imageInput = document.getElementById('user_image');
const imagePreview = document.getElementById('image-preview');
const previewContainer = document.getElementById('preview-container');
const DEFAULT_IMAGE_URL = 'https://i.namu.wiki/i/ZMSq7HebmcYJzC7r6J0hlXMc6mYC8jcIZ4Pw6LBqn_YI0CcSB75JbKX541Vs2CCpCtAl0-UWyve08s4ZdNEiPg.webp'

document.addEventListener('DOMContentLoaded',()=>{
    imagePreview.src = DEFAULT_IMAGE_URL; // 기본 이미지로 설정
    imagePreview.style.display = 'block'; 
    imageInput.style.display = 'none'; 
})

// 이미지 업로드 이벤트
imagePreview.addEventListener('click', () => {
    imageInput.click(); // 파일 선택
});

// 이미지 파일 업로드 처리
imageInput.addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            //  이미지 데이터 저장
            imagePreview.src = e.target.result; // 미리보기 이미지 업데이트
            imagePreview.style.display = 'block'; // 이미지 표시
            imageInput.style.display = 'none'; // 파일 선택 태그 숨김
        };
        reader.readAsDataURL(file); // 파일 읽기
    }
});

// 유효성 검사
function validateInputs(userName, userMBTI, userGit, userBlog, userIntroduce) {
    const nameRegex = /^[가-힣]{1,5}$/; // 한글 1~5글자
    const mbtiRegex = /^[A-Za-z]{4}$/; // 영문 4글자 대문자로 변환
    const urlRegex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/; // URL 형식

    if (!nameRegex.test(userName)) {
        alert('이름은 한글 5글자 이하로 입력해주세요.');
        return false;
    }

    if (!mbtiRegex.test(userMBTI)) {
        alert('MBTI는 영문 4글자로 입력해주세요.');
        return false;
    }

    if (!urlRegex.test(userGit)) {
        alert('GitHub 주소를 올바른 URL 형식으로 입력해주세요.');
        return false;
    }

    if (!urlRegex.test(userBlog)) {
        alert('Blog 주소를 올바른 URL 형식으로 입력해주세요.');
        return false;
    }

    if (userIntroduce.length > 100) {
        alert('자기소개는 100자 이하로 작성해주세요.');
        return false;
    }

    return true;
};

// 입력 필드 초기화
function resetInputs() {
    document.getElementById('user_name').value = '';
    document.getElementById('user_mbti').value = '';
    document.getElementById('user_git').value = '';
    document.getElementById('user_blog').value = '';
    document.getElementById('introduce').value = '';
    imagePreview.src = DEFAULT_IMAGE_URL; // 기본 이미지로 설정
    imagePreview.style.display = 'block'; 
    imageInput.style.display = 'none'; 
}

// 데이터 저장
const submitButton = document.getElementById('button');

submitButton.addEventListener('click', () => {
    
    const userName = document.getElementById('user_name').value.trim();
    const userMBTI = document.getElementById('user_mbti').value.trim();
    const userGit = document.getElementById('user_git').value.trim();
    const userBlog = document.getElementById('user_blog').value.trim();
    const userIntroduce = document.getElementById('introduce').value.trim();
    const userImage = imagePreview.src;

    // 유효성 검사 실패 시 저장하지 않음
    if (!validateInputs(userName, userMBTI, userGit, userBlog, userIntroduce)) {
        return; 
    }


    // 입력값을 객체로 저장
    const newUserData = {
        name: userName,
        mbti: userMBTI,
        git: userGit,
        blog: userBlog,
        introduce: userIntroduce,
        image: userImage,
    };

    // 기존 데이터 가져오기
    let userData = JSON.parse(localStorage.getItem('userData')) || [];

    // 데이터 추가
    userData.push(newUserData);
    
    // 로컬스토리지에 저장
    localStorage.setItem('userData', JSON.stringify(userData));

    alert('멤버로 등록되었습니다!');

    window.location.href = 'team-member.html';
});
