document.addEventListener("DOMContentLoaded", () => {
    const introText = "오남어스를 소개할게!";
    const detailParts = [
        "5명의 남자와 게임 속 캐릭터인 어몽어스를 결합하여, 하나의 목표를 이루기 위한 모습을 상징적으로 표현해보았어!",
        "어몽어스 게임의 팀워크 정신처럼, 원활한 소통과 협력으로 문제를 해결하고 도전 과제를 극복해 나가는 팀이야!",
        "ChatGPT와 라이브러리를 활용할 때, 직접 타이핑 하며 원리를 이해하고 체화하는 방식을 통해 개발 실력을 향상시키는 팀이야!",
        "앞으로도 끊임없이 발전하며 효율적인 결과를 만들어내기 위해 노력할거야!"
    ];

    const introElement = document.getElementById("intro-message");
    const detailElements = [
        document.getElementById("team-intro-part1"),
        document.getElementById("team-intro-part2"),
        document.getElementById("team-intro-part3"),
        document.getElementById("team-intro-part4"),
    ];

    let charIndex = 0;

    function typeIntro() {
        setTimeout(() => typeDetail(0), 400);
    }

    function typeDetail(part) {
        // if (charIndex < detailParts[part].length) {
        //     detailElements[part].parentElement.classList.remove("hide")
        //     detailElements[part].textContent += detailParts[part][charIndex];
        //     charIndex++;
        //     setTimeout(() => typeDetail(part), 25);
        // } else if (part + 1 < detailParts.length) {
        //     charIndex = 0;
        //     typeDetail(part + 1);
        // }

        if (part % 2 === 0) {
            detailElements[part].parentElement.classList.add("slide-left");
        } else {
            detailElements[part].parentElement.classList.add("slide-right");
        }

        detailElements[part].parentElement.classList.remove("hide"); // 숨김 해제


        if (part + 1 < detailParts.length) {
            setTimeout(() => typeDetail(part + 1), 700); // 각 파트마다 약간의 지연 추가
        }
    }
    typeIntro();
});