export function getCookie(name) {
    const nameEquals = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(nameEquals) === 0) {
            return cookie.substring(nameEquals.length);
        }
    }
    return null;
}
