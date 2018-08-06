function saveMaxValInCookies(value) {
    document.cookie = String("maxScore" + "=" + value + '; ');
}

function getMaxValFromCookies() {
    let maxValue = document.cookie.split(';')[0].split('=');

    return maxValue[0] === "maxScore" ? parseInt(maxValue[1], 10) : null;
}