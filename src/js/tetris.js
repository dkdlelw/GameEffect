function tetris() {
    const tetrisWrap = document.querySelector(".tetris__wrap");
    const playground = tetrisWrap.querySelector(".playground > ul");
    const tetrisRestart = document.querySelector(".tetris__restart");
    const tetrisMusic = document.querySelector(".tetrisAudio");
    const tetrisMplay = document.querySelector(".tetris__music .play");
    const tetrisMstop = document.querySelector(".tetris__music .stop");
    
    // variables
    let rows = 16;
    let cols = 11;
    let tetrisSscore = 0;
    let tetrisDuration = 1400;
    let tetrisDurationTimeout;
    let downInterval;
    let tempMovingItem; // 임시저장소
    
    // 블록 정보
    const movingItem = {
      type: "Imino",
      direction: 0, // 블록 모양
      top: 0,
      left: 5,
    };
    
    // 블록 좌표값
    const blocks = {
      Tmino: [
        [
          [2, 1],
          [0, 1],
          [1, 0],
          [1, 1],
        ],
        [
          [1, 2],
          [0, 1],
          [1, 0],
          [1, 1],
        ],
        [
          [1, 2],
          [0, 1],
          [2, 1],
          [1, 1],
        ],
        [
          [2, 1],
          [1, 2],
          [1, 0],
          [1, 1],
        ],
      ],
      Imino: [
        [
          [0, 0],
          [0, 1],
          [0, 2],
          [0, 3],
        ],
        [
          [0, 0],
          [1, 0],
          [2, 0],
          [3, 0],
        ],
        [
          [0, 0],
          [0, 1],
          [0, 2],
          [0, 3],
        ],
        [
          [0, 0],
          [1, 0],
          [2, 0],
          [3, 0],
        ],
      ],
      Omino: [
        [
          [0, 0],
          [0, 1],
          [1, 0],
          [1, 1],
        ],
        [
          [0, 0],
          [0, 1],
          [1, 0],
          [1, 1],
        ],
        [
          [0, 0],
          [0, 1],
          [1, 0],
          [1, 1],
        ],
        [
          [0, 0],
          [0, 1],
          [1, 0],
          [1, 1],
        ],
      ],
      Zmino: [
        [
          [0, 0],
          [1, 0],
          [1, 1],
          [2, 1],
        ],
        [
          [1, 0],
          [0, 1],
          [1, 1],
          [0, 2],
        ],
        [
          [0, 0],
          [1, 0],
          [1, 1],
          [2, 1],
        ],
        [
          [1, 0],
          [0, 1],
          [1, 1],
          [0, 2],
        ],
      ],
      Smino: [
        [
          [1, 0],
          [2, 0],
          [0, 1],
          [1, 1],
        ],
        [
          [0, 0],
          [0, 1],
          [1, 1],
          [1, 2],
        ],
        [
          [1, 0],
          [2, 0],
          [0, 1],
          [1, 1],
        ],
        [
          [0, 0],
          [0, 1],
          [1, 1],
          [1, 2],
        ],
      ],
      Jmino: [
        [
          [0, 2],
          [1, 0],
          [1, 1],
          [1, 2],
        ],
        [
          [0, 0],
          [0, 1],
          [1, 1],
          [2, 1],
        ],
        [
          [0, 0],
          [1, 0],
          [0, 1],
          [0, 2],
        ],
        [
          [0, 0],
          [1, 0],
          [2, 0],
          [2, 1],
        ],
      ],
      Lmino: [
        [
          [0, 0],
          [0, 1],
          [0, 2],
          [1, 2],
        ],
        [
          [0, 0],
          [1, 0],
          [2, 0],
          [0, 1],
        ],
        [
          [0, 0],
          [1, 0],
          [1, 1],
          [1, 2],
        ],
        [
          [0, 1],
          [1, 1],
          [2, 0],
          [2, 1],
        ],
      ],
    };
    // 테트리스게임 열기
    const tetrisOpen = document.querySelector(".icon2");
    tetrisOpen.addEventListener("click", () => {
      tetrisWrap.style.display = "block";
    });
    
    // 테트리스게임 닫기
    const tetrisClose = document.querySelector(".tetris__close");
    tetrisClose.addEventListener("click", () => {
      tetrisWrap.style.display = "none";
      tetrisMusic.pause();
    });
    
    document.querySelector(".tetris__start").addEventListener("click", () => {
      document.querySelector(".tetris__card").style.display = "block";
      document.querySelector(".tetris__intro").style.display = "none";
      tetrisMstop.style.display = "block";
      init();
    });
    
    tetrisMstop.addEventListener("click", () => {
      tetrisMusic.pause();
      tetrisMplay.style.display = "block";
      tetrisMstop.style.display = "none";
    });
    
    tetrisMplay.addEventListener("click", () => {
      tetrisMusic.play();
      tetrisMstop.style.display = "block";
      tetrisMplay.style.display = "none";
    });
    
    // 시작하기
    function init() {
      tempMovingItem = { ...movingItem }; // 초기화
      tetrisMusic.play();
    
      for (let i = 0; i < rows; i++) {
        prependNewLine(); // 블록 라인 만들기
      }
    
      tetrisDuration = 1400;
      tetrisSscore = 0;
      clearInterval(tetrisDurationTimeout);
      // renderBlocks(); // 블록 출력하기
      tetrisDurationTimeout = setInterval(() => {
        tetrisDuration += -100;
        tetrisDuration <= 280 ? clearInterval(tetrisDurationTimeout) : null;
      }, 15000);
    
      //   renderBlocks(); // 블록 출력하기
      generateNewBlock(); // 블록 만들기
    }
    
    // 블록 만들기
    function prependNewLine() {
      const li = document.createElement("li");
      const ul = document.createElement("ul");
    
      for (let j = 0; j < cols; j++) {
        const matrix = document.createElement("li");
        ul.prepend(matrix); // prepend는 뒤에 넣어주는거
    
        li.prepend(ul);
        playground.prepend(li);
      }
    }
    
    // 블록 출력하기
    function renderBlocks(moveType = "") {
      // 아무것도 없을때 받아오는거
      //   const ty = tempMovingItem.type;
      //   const di = tempMovingItem.direction;
      //   const to = tempMovingItem.top;
      //   const le = tempMovingItem.left;
    
      const { type, direction, top, left } = tempMovingItem;
      const movingBlocks = document.querySelectorAll(".moving");
    
      movingBlocks.forEach((moving) => {
        moving.classList.remove(type, "moving");
      });
    
      blocks[type][direction].some((block) => {
        const x = block[0] + left; // 2, 0, 1, 1
        const y = block[1] + top; // 1, 1, 0, 1
    
        const target = playground.childNodes[y]
          ? playground.childNodes[y].childNodes[0].childNodes[x]
          : null;
        const isAvailable = checkEmpty(target);
    
        if (isAvailable) {
          target.classList.add(type, "moving");
        } else {
          tempMovingItem = { ...movingItem };
    
          if (moveType === "retry") {
            clearInterval(downInterval);
            showGameOverText();
          } else {
            setTimeout(() => {
              renderBlocks("retry");
              if (moveType === "top") {
                seizeBlock();
              }
            }, 0);
          }
          return true;
        }
      });
      movingItem.left = left;
      movingItem.top = top;
      movingItem.direction = direction;
    }
    
    // 게임종료 메시지
    function showGameOverText() {
      tetrisRestart.style.display = "block";
      tetrisRestart.style.transform = "scale(1)";
    }
    
    // 블록 감지하기
    function seizeBlock() {
      const movingBlocks = document.querySelectorAll(".moving");
      movingBlocks.forEach((moving) => {
        moving.classList.remove("moving");
        moving.classList.add("seized");
      });
      checkMatch();
    }
    
    // 한 줄 제거
    function checkMatch() {
      const childNodes = playground.childNodes;
      childNodes.forEach((child) => {
        let matched = true;
        child.children[0].childNodes.forEach((li) => {
          if (!li.classList.contains("seized")) {
            matched = false;
          }
        });
        if (matched) {
          child.remove();
          prependNewLine();
          tetrisSscore++;
          let tetrisScores = tetrisSscore * 5;
          document.querySelector(".tetris__score").textContent = tetrisScores;
          document.querySelector(".tetris__score2").textContent = tetrisScores;
        }
      });
    
      generateNewBlock();
    }
    
    // 새로운 블록 만들기
    function generateNewBlock() {
      clearInterval(downInterval);
    
      downInterval = setInterval(() => {
        moveBlock("top", 1);
      }, tetrisDuration);
    
      // 랜덤
      const blockArray = Object.entries(blocks);
      const randomIndex = Math.floor(Math.random() * blockArray.length);
      movingItem.type = blockArray[randomIndex][0];
    
      movingItem.top = 0;
      movingItem.left = 5;
      movingItem.direction = 0;
      tempMovingItem = { ...movingItem };
      renderBlocks();
    }
    
    // 빈칸 확인하기
    function checkEmpty(target) {
      if (!target || target.classList.contains("seized")) {
        return false;
      }
      return true;
    }
    
    // 블록 움직이기
    function moveBlock(moveType, amount) {
      tempMovingItem[moveType] += amount;
      renderBlocks(moveType);
    }
    
    // 모양 바꾸기
    function changeDirection() {
      const direction = tempMovingItem.direction;
      direction === 3
        ? (tempMovingItem.direction = 0)
        : (tempMovingItem.direction += 1);
      renderBlocks();
    }
    
    // 빨리 내리기
    function dropBlock() {
      clearInterval(downInterval);
      downInterval = setInterval(() => {
        moveBlock("top", 1);
      }, 10);
    }
    
    // 이벤트
    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 39:
          moveBlock("left", 1);
          break;
        case 37:
          moveBlock("left", -1);
          break;
        case 40:
          moveBlock("top", 1);
          break;
        case 38:
          changeDirection();
          break;
        case 32:
          dropBlock();
          break;
        default:
          break;
      }
    });
    
    // 다시 시작하기
    tetrisRestart.addEventListener("click", () => {
      tetrisRestart.style.display = "none";
      playground.innerHTML = "";
      tetrisSscore = 0;
      document.querySelector(".tetris__score").innerHTML = tetrisSscore;
      init();
    });
}
export default tetris;