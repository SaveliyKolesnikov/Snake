// Support mobile devices events.
let touchStartPoint = {
    x: null,
    y: null
};

let touchEndPoint = {
    x: null,
    y: null
};

let getVectOfTouch = function (start, end) {
    let res = {
        x: end.x - start.x,
        y: end.y - start.y
    };

    let isXSlide = Math.abs(res.x) > Math.abs(res.y);

    if (isXSlide) {
        if (res.x > 0) {
            if (direction !== 'left')
                direction = 'right';
        }
        else if (direction !== 'right')
            direction = 'left';
    }
    else {
        if (res.y > 0) {
            if (direction !== 'up')
                direction = 'down';
        }
        else if (direction !== 'down')
            direction = 'up';
    }
};

window.onload = function () {
    document.ontouchstart = function (e) {
        let touchPoint = e.changedTouches[0];
        touchStartPoint.x = touchPoint.clientX;
        touchStartPoint.y = touchPoint.clientY;
    };

    document.ontouchend = function (e) {
        let touchPoint = e.changedTouches[0];
        touchEndPoint.x = touchPoint.clientX;
        touchEndPoint.y = touchPoint.clientY;

        getVectOfTouch(touchStartPoint, touchEndPoint);
    };
};

