document.addEventListener("DOMContentLoaded", () => {
    const introText = "오남어스를 소개할게!";
    const detailText = `‘오남어스’는 팀원들의 협력 정신을 담아낸 이름입니다. 5명의 남자와 게임 속 캐릭터인 어몽어스를 결합하여, 각기 다른 개성과 역량을 가진 멤버들이 모여 하나의 목표를 이루기 위해 노력하는 모습을 상징적으로 표현했습니다.\n\n\n
    
    '오남어스'는 어몽어스 게임의 팀워크 정신처럼, 서로 다른 5명이 원활한 소통과 협력으로 문제를 해결하고, 도전 과제를 극복해 나가는 팀입니다. 팀장의 주도로 주기적인 회의를 열고 막히는 부분이 있을 때 서로 질문과 대답을 하며 문제를 해결해 나갑니다. 또한 소통뿐만 아니라 성장까지 하는 팀입니다. ChatGPT나 라이브러리를 활용할 때 단순히 결과를 복사해 사용하지 않고, 직접 타이핑하며 코드의 동작 원리를 이해하고 학습합니다. 이러한 접근법은 학습한 내용이 체화되도록 도와주며, 개개인의 개발 실력을 끌어올리는 데 기여했습니다.\n\n\n
    
    '오남어스'는 단순히 문제를 해결하는 데 그치지 않고, 지속적으로 학습하며 새로운 목표에 도전하며 성장을 지향하는 팀입니다. 앞으로도 끊임없이 발전하며 창의적이고 효율적인 결과를 만들어내기 위해 노력하겠습니다. 소개글을 읽어주셔서 감사합니다.`;
    const introElement = document.getElementById("intro-message");
    const detailElement = document.getElementById("team-intro");

    let introIndex = 0;
    let detailIndex = 0;

    function typeIntro() {
        if (introIndex < introText.length) {
            introElement.textContent += introText[introIndex];
            introIndex++;
            setTimeout(typeIntro, 100); // 글자 간격 100ms
        } else {
            setTimeout(typeDetail, 500); // 끝난 후 500ms 대기
        }
    }

    // 두 번째 메시지 애니메이션
    function typeDetail() {
        if (detailIndex < detailText.length) {
            detailElement.textContent += detailText[detailIndex];
            detailIndex++;
            setTimeout(typeDetail, 50); // 글자 간격 50ms
        }
    }

    // 애니메이션 시작
    typeIntro();
});
