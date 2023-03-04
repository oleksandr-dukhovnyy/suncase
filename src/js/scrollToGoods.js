// for deploy
/*
  TODO:
	Move the document.body.clientWidth check out of a function.
	Problem: if you change the user agent in devtools and do not reload the page, then scrollToGoods will not work correctly
*/
const scrollToGoods = () => {
  if (document.body.clientWidth < 531) {
    let hamburgerMenu = document.querySelector('#hamburger-menu');
    let hamburgerMenuY = hamburgerMenu.offsetTop;
    window.scrollTo({
      top: hamburgerMenuY - 100,
      left: 0,
      behavior: 'smooth',
    });
  } else {
    window.scrollTo({
      top: document.querySelector('#catalog').offsetTop - 100,
      behavior: 'smooth',
    });
  }
};
export default scrollToGoods;
