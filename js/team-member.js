const members = [
    {
        name: '홍길동',
        image: 'member1.jpg',
        bio: '안녕하세요, 저는 팀의 리더 홍홍길동입니다.'
    },
    {
        name: '김철수',
        image: 'member2.jpg',
        bio: '프론트엔드 개발자 김철수입니다.'
    },
    {
        name: '이영희',
        image: 'member3.jpg',
        bio: '백엔드 개발자 이영희입니다.'
    },
    {
        name: '박민수',
        image: 'member4.jpg',
        bio: '디자이너 박민수입니다.'
    },
    {
        name: '최지우',
        image: 'member5.jpg',
        bio: '마케팅 담당 최지우입니다.'
    },
    {
        name: '시민',
        image: 'member6.jpg',
        bio: '누군가에 의해 사망하셨습니다.'
    }
];

function showModal(index) {
    const member = members[index];
    document.getElementById('modalImage').src = member.image;
    document.getElementById('modalName').textContent = member.name;
    document.getElementById('modalBio').textContent = member.bio;
    document.getElementById('modal').classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

function hideModal() {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}