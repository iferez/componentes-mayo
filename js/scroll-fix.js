function debounce(func, delay) {
    let timeoutId;
    return function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(func, delay);
    };
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function handleScroll() {
    const button = document.querySelector('.scroll-to-top');
    const header = document.querySelector('header');
    const height_activate = 400;

    if (document.body.scrollTop > height_activate || document.documentElement.scrollTop > height_activate) {
        button.classList.add("show");
        header.classList.add("header-fixed", "fixed-bottom");
    } else {
        button.classList.remove("show");
        header.classList.remove("header-fixed", "fixed-bottom");
    }
}

const debouncedScroll = debounce(handleScroll, 100); // Retraso para evitar muchas ejecuciones
window.onscroll = debouncedScroll;
document.addEventListener('DOMContentLoaded', handleScroll);
