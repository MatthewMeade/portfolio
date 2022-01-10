const STYLE1  = [
    "background: #343a40",
    'color: #b2dca2',
    'font-size: 20px',
].join(';');

export const welcomeUser = () => {
    console.clear();
    console.log('%c Hello! 👋', STYLE1)
    console.log("%c The source code for this site is available here: ", STYLE1);
    console.log("%c https://github.com/MatthewMeade/portfolio ", STYLE1)
};