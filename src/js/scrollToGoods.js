// for deploy
/*
	Вынести проверку document.body.clientWidth за функцию.
	Проблема: если в дувтулзах поменять юзерагент и не перезагрузить страницу, то scrollToGoods будет работать некорректно
	Польза: Оптимизация. Реальные пользователи никогда не будут менять юзерагента, а проверка будет.
*/
const scrollToGoods = () => {
	// let isMobile = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ) );

	if( document.body.clientWidth < 531 ) {
		let hamburgerMenu = document.querySelector( '.hamburger-menu' );
		let hamburgerMenuY = hamburgerMenu.getBoundingClientRect().y;
		console.log( hamburgerMenu, hamburgerMenuY );
		window.scrollBy( 0, hamburgerMenuY - 100 );
	} else {
		window.scrollBy( 0, document.querySelector( '.catalog' ).getBoundingClientRect().y - 100 );
	}
}
export default scrollToGoods;