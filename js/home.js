//DOMContentLoaded 이벤트 리스너를 통해 HTML 문서가 완전히 로드된 후에 스크립트를 실행
document.addEventListener("DOMContentLoaded", () => {
    //typeIntro: 한 글자씩 introText를 지정된 introElement에 출력
    const introText = "오남어스를 소개할게!";
    // detailParts 배열의 각 문장을 대응되는 detailElements에 한 글자씩 출력.
    const detailParts = [
        "‘오남어스’는 팀원들의 협력 정신을 담아낸 이름이야!",
        "5명의 남자와 게임 속 캐릭터인 어몽어스를 결합하여, 하나의 목표를 이루기 위한 모습을 상징적으로 표현해보았어!.",
        "어몽어스 게임의 팀워크 정신처럼, 원활한 소통과 협력으로 문제를 해결하고 도전 과제를 극복해 나가는 팀이야!",
        "ChatGPT와 라이브러리를 활용할 때, 직접 타이핑 하며 원리를 이해하고 체화하는 방식을 통해 개발 실력을 향상시키는 팀이야!",
        "앞으로도 끊임없이 발전하며 효율적인 결과를 만들어내기 위해 노력할거야! "
    ];

    const introElement = document.getElementById("intro-message");
    const detailElements = [
        document.getElementById("team-intro-part1"),
        document.getElementById("team-intro-part2"),
        document.getElementById("team-intro-part3"),
        document.getElementById("team-intro-part4"),
        document.getElementById("team-intro-part5")
    ];

    let introIndex = 0;
    let partIndex = 0;
    let charIndex = 0;

    function typeIntro() {
        if (introIndex < introText.length) {
            introElement.textContent += introText[introIndex];
            introIndex++;
            setTimeout(typeIntro, 25); //한 글자가 출력될 때마다 setTimeout으로 딜레이를 줘 애니메이션 효과를 만듦
        } else {
            setTimeout(() => typeDetail(0), 400);
        }
    }

    function typeDetail(part) {
        if (charIndex < detailParts[part].length) {
            detailElements[part].textContent += detailParts[part][charIndex];
            charIndex++;
            setTimeout(() => typeDetail(part), 25);
        } else if (part + 1 < detailParts.length) {
            charIndex = 0;
            typeDetail(part + 1);
        }
    }
    typeIntro();
});
