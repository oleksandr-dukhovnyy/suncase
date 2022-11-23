// for deploy
/*
  TODO:
	Move the document.body.clientWidth check out of a function.
	Problem: if you change the user agent in devtools and do not reload the page, then scrollToGoods will not work correctly
*/
const scrollToGoods = () => {
  // let isMobile = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ) );

  if (document.body.clientWidth < 531) {
    let hamburgerMenu = document.querySelector('.hamburger-menu');
    let hamburgerMenuY = hamburgerMenu.getBoundingClientRect().y;
    console.log(hamburgerMenu, hamburgerMenuY);
    window.scrollBy(0, hamburgerMenuY - 100);
  } else {
    window.scrollBy(
      0,
      document.querySelector('.catalog').getBoundingClientRect().y - 100
    );
  }
};
export default scrollToGoods;
