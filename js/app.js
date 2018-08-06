(function (window, document, drawModule) {
    btn.addEventListener("click", function () {
        drawModule.init();
    });

    document.onkeydown = function (event) {
        keyCode = event.keyCode;
        switch (keyCode) {
            case 32:
                if (!btn.disabled)
                    btn.click();
                else
                    pause_btn.click();
                break;
            case 37:
                if (direction !== 'right')
                    direction = 'left';
                break;
            case 39:
                if (direction !== 'left')
                    direction = 'right';
                break;
            case 40:
                if (direction !== 'up')
                    direction = 'down';
                break;
            case 38:
                if (direction !== 'down')
                    direction = 'up';
                break;
        }
    }
})(window, document, drawModule);
