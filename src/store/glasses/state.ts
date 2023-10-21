export default <Glasses.State>{
  sunglasessList: [],
  loading: false,
  filters: {
    genders: [
      { name: 'man', active: false },
      { name: 'woman', active: false },
      { name: 'kids', active: false },
    ],
    categories: [
      { name: 'new', active: false },
      { name: 'sale', active: false },
      { name: 'most-popular', active: false },
      { name: 'price-low-to-hight', active: false },
      { name: 'price-hight-to-low', active: false },
    ],
    brands: [
      { name: 'Levis', active: false },
      { name: 'Prada', active: false },
      { name: 'Oakley', active: false },
      { name: 'Persol', active: false },
      { name: 'Versace', active: false },
      { name: 'Ray-Ban', active: false },
      { name: 'Polaroid', active: false },
      { name: 'Maui Jim', active: false },
      { name: 'Saint Laurent', active: false },
      { name: 'Christian Dior', active: false },
    ],
  },
};
