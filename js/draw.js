let drawModule = (function () {
    let bodySnake = function (x, y) {
        let gradient = ctx.createLinearGradient(0, 0, w, 0);
        gradient.addColorStop(0, "magenta");
        gradient.addColorStop(0.5, "blue");
        gradient.addColorStop(1, "red");
        ctx.fillStyle = gradient;
        ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);

        ctx.strokeStyle = '#C6A8FF';
        ctx.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    };

    let pizza = function (x, y) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
        ctx.fillStyle = 'red';
        ctx.fillRect(x * snakeSize + 1, y * snakeSize + 1, snakeSize - 2, snakeSize - 2);
    };

    let stone = function (x, y) {
        ctx.fillStyle = '#757575';
        ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
        ctx.fillStyle = 'black';
        ctx.fillRect(x * snakeSize + 1, y * snakeSize + 1, snakeSize - 2, snakeSize - 2);
    };

    let scoreText = function () {
        let score_text = "Score: " + score;
        let maxScore_text = "Max score: " + maxScore;
        ctx.fillStyle = 'blue';
        ctx.font = "16px Verdana";
        ctx.fillText(score_text, w / 2 - 20, h - 20);
        ctx.fillStyle = 'grey';
        ctx.font = "10px Verdana";
        ctx.fillText(maxScore_text, w / 2 - 20, h - 5);
    };

    let drawSnake = function () {
        let length = 4;
        snake = [];
        for (let i = length - 1; i >= 0; i--) {
            snake.push({x: i, y: 0});
        }
    };

    let paint = function () {
        ctx.fillStyle = '#EEEEEE';
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, w, h);
        btn.setAttribute('disabled', true);
        // document.body.style.overflow = "hidden";

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction === 'right')
            snakeX++;
        else if (direction === 'left')
            snakeX--;
        else if (direction === 'up')
            snakeY--;
        else if (direction === 'down')
            snakeY++;


        if (snakeX === -1 || snakeX === w / snakeSize || snakeY === -1 || snakeY === h / snakeSize ||
            checkCollision(snakeX, snakeY, snake) || checkCollision(snakeX, snakeY, obstacles)) {
            alert("Вы проиграли :(");
            // Начинаем игру с начала
            btn.removeAttribute('disabled', true);
            // document.body.style.overflow = "visible";
            score = 0;
            ctx.clearRect(0, 0, w, h);
            gameloop = clearInterval(gameloop);
            return;
        }

        let tail;
        if (snakeX === food.x && snakeY === food.y) {
            tail = {x: snakeX, y: snakeY}; // Создать новую голову
            score++;
            if (score > maxScore) {
                maxScore = score;
                saveMaxValInCookies(maxScore);
            }
            createFood(); //Create new food
        } else {
            tail = snake.pop(); // Удалить последнюю ячейку
            tail.x = snakeX;
            tail.y = snakeY;
        }
        snake.unshift(tail); // создает ячейку впереди

        for (let i = 0; i < snake.length; i++) {
            bodySnake(snake[i].x, snake[i].y);
        }

        for (let i = 0; i < obstacles.length; i++) {
            stone(obstacles[i].x, obstacles[i].y);
        }

        pizza(food.x, food.y);
        scoreText();
    };

    let createFood = function () {
        food = {
            x: Math.floor((Math.random() * 35)),
            y: Math.floor((Math.random() * 35))
        };
        while (checkCollision(food.x, food.y, snake) || checkCollision(food.x, food.y, obstacles)) {
            food.x = Math.floor((Math.random() * 35));
            food.y = Math.floor((Math.random() * 35));
        }
    };

    let createObstacle = function (count) {
        let obstacles = [];
        for (let i = 0; i < count; i++) {
            let obstacle = {
                x: Math.floor((Math.random() * 35)),
                y: Math.floor((Math.random() * 35))
            };
            while (checkCollision(obstacle.x, obstacle.y, snake)) {
                obstacle.x = Math.floor((Math.random() * 35));
                obstacle.y = Math.floor((Math.random() * 35));
            }
            obstacles.push(obstacle);
        }
        return obstacles;
    };

    let checkCollision = function (x, y, array) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].x === x && array[i].y === y)
                return true;
        }
        return false;
    };

    let init = function () {
        direction = 'down';
        drawSnake();
        obstacles = createObstacle(Math.floor(Math.random() * maxNumOfObst) + minNumOfObst);
        createFood();
        gameloop = setInterval(paint, fps);
    };

    pause_btn.onclick = function () {
        if (isPause) {
            pauseBanner.style.display = "none";
            gameloop = setInterval(paint, fps);
            isPause = false;
        }
        else {
            pauseBanner.style.display = "block";
            gameloop = clearInterval(gameloop);
            isPause = true;
        }
    };

    return {
        init: init
    };
}());
