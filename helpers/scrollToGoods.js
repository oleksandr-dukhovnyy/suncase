const scrollToGoods = () => {
  const top = document.querySelector('#catalog')?.offsetTop || 100;

  window.scrollTo({
    top: top - 100,
    behavior: 'smooth',
  });
};
export default scrollToGoods;
