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
    nickname.addEventListener("input", function(event) {
      document.getElementById("username").textContent = event.target.value;
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
   
  

    const enemies = {
      1: {
        name: 'Goblin',
        image: './images/1.png',
        maxHealth: 10,
        health: 10
      },
      2: {
        name: 'Skeleton zombie',
        image: './images/2.png',
        maxHealth: 5,
        health: 5
      },
      3: {
        name: 'Mummy',
        image: './images/3.png',
        maxHealth: 7,
        health: 7
      },
      4: {
        name: 'Zombie',
        image: './images/4.png',
        maxHealth: 8,
        health: 8
      },
      5: {
        name: 'Orc',
        image: './images/5.png',
        maxHealth: 12,
        health: 12
      }
    };
    
    let level = 1;
    let score = 0;
    let clicks = 0;
    
    const scoreElement = document.getElementById('score');
    const enemyElement = document.getElementById('enemy');
    const levelElement = document.getElementById('level');
    let healthElement = document.getElementById('health');
    
    enemyElement.addEventListener('click', () => {
      enemies[level].health--;
      healthElement.innerText = `HP ${enemies[level].health}/${enemies[level].maxHealth}`;
      score++;
      clicks++;
      scoreElement.innerText = score;
      if (enemies[level].health === 0) {
        level++;
        clicks = 0;
        if (level > 5) {
          document.getElementById("game").style.display = "none";
          document.getElementById("win-message").style.display = "block";
        } else {
          enemyElement.innerHTML = `<img src="${enemies[level].image}" alt="${enemies[level].name}"><p id="health"></p>`;
          healthElement = document.getElementById('health'); 
          healthElement.innerText = ` ${enemies[level].health}/${enemies[level].maxHealth}`;
          levelElement.innerText = `Level ${level}`;
        }
      }
    });
    
    levelElement.innerText = `Level ${level}`;
    healthElement.innerText = `HP ${enemies[level].health}/${enemies[level].maxHealth}`;
    
    
    
    
    
      
      