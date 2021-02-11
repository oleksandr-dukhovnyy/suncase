<template>

	<PopupShop
		:cart="cart"
		:allItemsInTheCatolog="all"
	/>

</template>

<script>

import PopupShop from './PopupShop.vue';

export default {
	name: 'PopCont',
	components: { PopupShop },
	data(){
		return {
			cart: ['5', '7'],
			all: [{brend: 'Maui Jim', sale: true, oldCoast: 385, model: 'Mavericks', coast: 255, id: '1', gender: 'all', saled: 453, isNew: false, lng: 4},
        
				{brend: 'Ray-Ban', sale: false, oldCoast: 0, model: 'RB3447N Gold', coast: 145, id: '2', gender: 'man', saled: 523, isNew: true, lng: 4},
				{brend: 'Ray-Ban', sale: true, oldCoast: 165, model: 'RB3539 Black', coast: 92, id: '3', gender: 'woman', saled: 152, isNew: true, lng: 4},
				{brend: 'Ray-Ban', sale: true, oldCoast: 188, model: 'Sugar', coast: 138, id: '4', gender: 'all', saled: 43, isNew: false, lng: 4},

				{brend: 'Oakley', sale: false, oldCoast: 0, model: 'Sutro', coast: 145, id: '5', gender: 'all', saled: 143, isNew: false, lng: 4},
				{brend: 'Oakley', sale: false, oldCoast: 0, model: 'Evzero Path', coast: 139, id: '6', gender: 'all', saled: 343, isNew: true, lng: 5},
				{brend: 'Oakley', sale: false, oldCoast: 0, model: 'Holbrook', coast: 139, id: '7', gender: 'all', saled: 243, isNew: true, lng: 4},
				
				{brend: 'Prada', sale: false, oldCoast: 0, model: 'Cinema', coast: 253, id: '8', gender: 'all', saled: 743, isNew: false, lng: 3},
				{brend: 'Prada', sale: false, oldCoast: 0, model: 'PR53US', coast: 117, id: '9', gender: 'woman', saled: 1343, isNew: true, lng: 2},
				{brend: 'Prada', sale: false, oldCoast: 0, model: 'Millennials', coast: 109, id: '10', gender: 'all', saled: 103, isNew: true, lng: 4},
				
				{brend: 'Levis', sale: true, oldCoast: 64, model: 'Tortoise', coast: 27, id: '11', gender: 'all', saled: 62, isNew: true, lng: 2},
				{brend: 'Levis', sale: true, oldCoast: 40, model: 'LO22395 Red', coast: 20, id: '12', gender: 'all', saled: 482, isNew: false, lng: 2},
				{brend: 'Levis', sale: true, oldCoast: 40, model: 'LO22393 Tortoise', coast: 20, id: '13', gender: 'woman', saled: 160, isNew: false, lng: 2},
				
				{brend: 'Persol', sale: false, oldCoast: 0, model: 'PO3092SM Brown', coast: 170, id: '14', gender: 'all', saled: 60, isNew: false, lng: 4},
				{brend: 'Persol', sale: false, oldCoast: 0, model: 'PO9714S', coast: 139, id: '15', gender: 'all', saled: 90, isNew: false, lng: 5},

				{brend: 'Versace', sale: false, oldCoast: 0, model: 'PO9714S', coast: 199, id: '16', gender: 'all', saled: 190, isNew: false, lng: 4},
				{brend: 'Versace', sale: false, oldCoast: 0, model: 'VE2184', coast: 205, id: '17', gender: 'all', saled: 290, isNew: false, lng: 3},

				{brend: 'Polaroid', sale: true, oldCoast: 80, model: 'PLD4139B', coast: 75, id: '18', gender: 'all', saled: 390, isNew: false, lng: 4},
				{brend: 'Polaroid', sale: true, oldCoast: 90, model: 'PLD4139B', coast: 74, id: '19', gender: 'woman', saled: 50, isNew: false, lng: 3},
			
				{brend: 'Saint Laurent', sale: true, oldCoast: 195, model: 'SL108 Fluo', coast: 95, id: '20', gender: 'woman', saled: 50, isNew: false, lng: 1},
				{brend: 'Saint Laurent', sale: true, oldCoast: 550, model: 'SL302 LISA', coast: 420, id: '21', gender: 'woman', saled: 50, isNew: false, lng: 4},
			
				{brend: 'Christian Dior', sale: true, oldCoast: 203, model: 'DIORCLUB1 Black', coast: 179, id: '22', gender: 'all', saled: 115, isNew: false, lng: 3},
				{brend: 'Christian Dior', sale: true, oldCoast: 203, model: 'DiorSplit1 Split1', coast: 189, id: '23', gender: 'all', saled: 15, isNew: false, lng: 4},
			]
		}
	},
}

</script>

<style scoped></style>