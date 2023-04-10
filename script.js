const form = document.getElementById("myForm");
    const nickname = document.getElementById("nickname");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const nicknameError = document.getElementById("nicknameError");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");

    form.addEventListener("submit", function(event) {
      event.preventDefault();
      let isValid = true;

      if (nickname.value === "") {
        nicknameError.textContent = "Please enter your nickname.";
        isValid = false;
      } else {
        nicknameError.textContent = "";
      }

      if (name.value === "") {
        nameError.textContent = "Please enter your name.";
        isValid = false;
      } else {
        nameError.textContent = "";
      }

      if (email.value === "") {
        emailError.textContent = "Please enter your email address.";
        isValid = false;
      } else if (!isValidEmail(email.value)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
      } else {
        emailError.textContent = "";
      }

      if (isValid) {
        saveDataToLocalstorage();
        document.getElementById("myForm").style.display = "none";
        document.body.style.backgroundImage = "url('./images/zombieBg.jpeg')";
        document.getElementById("game").style.display = "block";
      }
    });

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    function saveDataToLocalstorage() {
      const data = {
        nickname: nickname.value,
        name: name.value,
        email: email.value
      };
      localStorage.setItem("userData", JSON.stringify(data));
    }
    // get value from ls and push into #username id
    let userData = localStorage.getItem("userData");
    let username = null;
    if (userData !== null) {
        userData = JSON.parse(userData);
        username = userData.name;
    }
    document.getElementById("username").textContent = username;

    const enemies = {
        1: {
          name: 'Goblin',
          image: './images/1.png'
        },
        2: {
          name: 'Skeleton zombie',
          image: './images/2.png'
        },
        3: {
          name: 'Mummy',
          image: './images/3.png'
        },
        4: {
          name: 'Zombie',
          image: './images/4.png'
        },
        5: {
          name: 'Orc',
          image: './images/5.png'
        }
      };
      
      let level = 1;
      let score = 0;
      let clicks = 0;
      let targetClicks = 5;
      
      const scoreElement = document.getElementById('score');
      const enemyElement = document.getElementById('enemy');
      const levelElement = document.getElementById('level');
      const buttonElement = document.getElementById('click-button');
      
      buttonElement.addEventListener('click', () => {
        score++;
        clicks++;
        scoreElement.innerText = score;
        if (clicks >= targetClicks) {
          level++;
          clicks = 0;
          if (score === 25) {
            document.getElementById("game").style.display = "none";
            document.getElementById("win-message").style.display = "block";
          }
          enemyElement.innerHTML = `<img src="${enemies[level].image}" alt="${enemies[level].name}" width="300" height="250">`;
          levelElement.innerText = `Level ${level}`;
        }
      });
      
      levelElement.innerText = `Level ${level}`;
      
      