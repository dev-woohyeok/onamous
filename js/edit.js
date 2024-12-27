document.addEventListener('DOMContentLoaded', () => {
    const DEFAULT_IMAGE_URL = 'https://i.namu.wiki/i/ZMSq7HebmcYJzC7r6J0hlXMc6mYC8jcIZ4Pw6LBqn_YI0CcSB75JbKX541Vs2CCpCtAl0-UWyve08s4ZdNEiPg.webp';
    const imageInput = document.getElementById('user_image');
    const imagePreview = document.getElementById('image-preview');
    const userNameField = document.getElementById('user_name');
    const userMBTIField = document.getElementById('user_mbti');
    const userGitField = document.getElementById('user_git');
    const userBlogField = document.getElementById('user_blog');
    const introduceField = document.getElementById('introduce');
    const submitButton = document.getElementById('signup-btn');

    // URL에서 쿼리스트링 읽기
    const params = new URLSearchParams(window.location.search);
    const userIndex = parseInt(params.get('index'), 10);

    if(isNaN(userIndex)){
        alert('접근실패');
        return;
    }

    // 로컬 스토리지에서 데이터 가져오기
    const userData = JSON.parse(localStorage.getItem('userData')) || [];
    const editingUserData = userData[userIndex];

    if (editingUserData) {
        // 기존 데이터 채우기
        imagePreview.src = editingUserData.image || DEFAULT_IMAGE_URL;
        userNameField.value = editingUserData.name || '';
        userMBTIField.value = editingUserData.mbti || '';
        userGitField.value = editingUserData.git || '';
        userBlogField.value = editingUserData.blog || '';
        introduceField.value = editingUserData.introduce || '';
    } else {
        console.error('수정할 사용자 데이터가 없습니다.');
    }

    // 이미지 업로드 처리
    imagePreview.addEventListener('click', () => {
        imageInput.click(); // 파일 선택
    });

    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result; //  업데이트
                imagePreview.style.display = 'block'; // 이미지 표시
            };
            reader.readAsDataURL(file);
        }
    });

    // 유효성 검사 함수
    function validateInputs(name, mbti, git, blog, introduce) {
        const nameRegex = /^[가-힣]{1,5}$/; // 정규표현식
        const mbtiRegex = /^[A-Za-z]{4}$/; 
        const urlRegex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;

        if (!nameRegex.test(name)) {
            alert('이름은 한글 1~5글자로 입력해주세요.');
            return false;
        }
        if (!mbtiRegex.test(mbti)) {
            alert('MBTI는 영문 4글자로 입력해주세요.');
            return false;
        }
        if (!urlRegex.test(git)) {
            alert('GitHub 주소를 올바르게 입력해주세요.');
            return false;
        }
        if (!urlRegex.test(blog)) {
            alert('Blog 주소를 올바르게 입력해주세요.');
            return false;
        }
        if (introduce.length > 100) {
            alert('자기소개는 100자 이하로 입력해주세요.');
            return false;
        }
        return true;
    }
    
    // 데이터 저장
    submitButton.addEventListener('click', () => {
        const updatedName = userNameField.value.trim(); 
        const updatedMBTI = userMBTIField.value.trim();
        const updatedGit = userGitField.value.trim();
        const updatedBlog = userBlogField.value.trim();
        const updatedIntroduce = introduceField.value.trim();
        const updatedImage = imagePreview.src;

        // 유효성 검사
        if (!validateInputs(updatedName, updatedMBTI, updatedGit, updatedBlog, updatedIntroduce)) {
            return;
        }

        // 데이터 업데이트
        const updatedUserData = {
            name: updatedName,
            mbti: updatedMBTI,
            git: updatedGit,
            blog: updatedBlog,
            introduce: updatedIntroduce,
            image: updatedImage,
        };

        // 기존 데이터 수정
        userData[userIndex] = updatedUserData;
        localStorage.setItem('userData', JSON.stringify(userData));

        alert('정보가 성공적으로 수정되었습니다.');
        window.history.back(); //이전페이지 이동 // 1234
    });
});


