window.onscroll = () => {
    let scrollTop = window.scrollY;
    let docHeight = document.body.offsetHeight;
    let winHeight = window.innerHeight;
    let scrollPercent = scrollTop / (docHeight - winHeight);
    let scrollPercentRounded = Math.round(scrollPercent * 100);

    document.getElementById(
        "scroller"
    ).style.background = `linear-gradient(to bottom, rgb(249, 226, 43) ${scrollPercentRounded}%, #0000 ${scrollPercentRounded}%)`;
};