document.addEventListener("DOMContentLoaded", () => {
    const introText = "오남어스를 소개할게!";
    const detailParts = [
        "5명의 남자와 게임 속 캐릭터인 어몽어스를 결합하여, 하나의 목표를 이루기 위한 모습을 상징적으로 표현해보았어!",
        "어몽어스 게임의 팀워크 정신처럼, 원활한 소통과 협력으로 문제를 해결하고 도전 과제를 극복해 나가는 팀이야!",
        "ChatGPT와 라이브러리를 활용할 때, 직접 타이핑 하며 원리를 이해하고 체화하는 방식을 통해 개발 실력을 향상시키는 팀이야!",
        "모든 팀원이 주체적으로 참여하고, 서로의 의견을 존중하는 팀이야!",
    ];

    const introElement = document.getElementById("intro-message");
    const detailElements = [
        document.getElementById("team-intro-part1"),
        document.getElementById("team-intro-part2"),
        document.getElementById("team-intro-part3"),
        document.getElementById("team-intro-part4"),
    ];

    let introIndex = 0;
    let charIndex = 0;

    //introText의 각 글자를 하나씩 출력하는 함수다.
    //introIndex가 introIndex문자열의 길이보다 작을 경우 실행. 애니메이션이 끝나면 else 부분으로 넘어간다.
    ////400밀리초 대기 후에 typeDetail(0) 함수를 호출한다.
    function typeIntro() {
        if (introIndex < introText.length) {
            introElement.parentElement.classList.remove("hide")
            introElement.textContent += introText[introIndex];
            introIndex++;
            setTimeout(typeIntro, 25);
        } else {
            setTimeout(() => typeDetail(0), 400);
        }
    }

    //detailParts배열에서 part 번째 항목의 각 글자를 출력합니다.
    //현재 항목 (part)의 출력이 끝나면, charIndex를 초기화하고 다음 항목을 출력합니다.
    function typeDetail(part) {
        if (charIndex < detailParts[part].length) {
            detailElements[part].parentElement.classList.remove("hide")
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