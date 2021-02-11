<template>

	<div class="modal-contain"
		@click="closePayModal"
	>
		<div class="modal-content"
			@click.stop
		>
			<div class="left-side">
				<div class="product-info">
					<div class="product-info-texts">
						<div class="brend">
							{{ productInfo.brend }}
						</div>
						<div class="model">
							{{ productInfo.model }}
						</div>
						<div class="coast">
							{{ productInfo.coast }} $
						</div>
					</div>
					<div class="img">
						<img :src="`./img/${productInfo.id}/1.jpg`" alt="sunglass image">
					</div>
				</div>
			</div>

			<div class="right-side">
				<div
					class="close-bttn"
				>
					<img
						src="../../../public/img/sliderControl/closeBttn.svg"
					
						@click="closePayModal"
						alt="close"
					>
				</div>

				<!-- mobile header -->
				<div class="mobile-info-header">
					<span class="_brend">
						{{ productInfo.brend }}
					</span>
					<span class="_model">
						{{ productInfo.model }}
					</span>
					<span class="_coast">
						{{ productInfo.coast }} $
					</span>
				</div>
				<!-- /mobile header -->

				<div class="inputs-contain">
					<input
						v-for="item in 4"
						:key="item"
						type="text"
						placeholder="XXXX"
						maxlength="4"
					>
				</div>
				<div class="inputs-contain second">
					<div class="cards-logo">
						<img
							src="../../../public/img/icons/mastercard.svg"

							class="mastercard"
							alt="mastercard"
						>
						<img
							src="../../../public/img/icons/visa.png"

							class="visa"
							alt="visa"
						>
					</div>
					<input type="text" placeholder="mm/yy" maxlength="4"
					>
					<input type="password" placeholder="CVV" maxlength="3"
					>
				</div>
				<button class="buy-bttn">Buy!</button>
				<div class="or-decoration"> - or - </div>
				<div class="buttons-contain">
					<button>
						<img
							src="../../../public/img/icons/Privat24_Logo.png"
							class="privat24-logo"
							
							alt="privat_24"
						>
					</button>
					<button>
						<img
							src="../../../public/img/icons/paypal.svg"
							class="paypal-logo"
							
							alt="paypal_logo"
						>
					</button>
					<button>
						<img
							src="../../../public/img/icons/apple-pay.svg"
							class="apple-pay-logo"
							
							alt="apple-pay_logo"
						>
					</button>
				</div>
			</div>
		</div>
	</div>


</template>

<script>

export default {
	name: 'PayModal',
	props: [
		'allItems',
		'id'
	],
	data(){
		return {
			productInfo: {},
		}
	},
	methods: {
		closePayModal( e ){
			console.log( e.target );
			this.$emit( 'closePayModal' );
		}
	},
	mounted(){
		this.allItems.forEach( item => {
			if( item.id === this.id ){
				this.productInfo = item;
			}
		});
	},
}

</script>

<style scoped>

.modal-contain {
	position: fixed;
	top: 0px;
	left: 0px;
	z-index: 9999;

	width: 100%;
	height: 100%;

	background-color: white;

	display: flex;
	justify-content: space-around;
	align-items: center;

	letter-spacing: 250;
}

.inputs-contain {
	width: 123.5%;
	padding: 10% 0 0;

	display: flex;
	flex-direction: row;


	margin: 5% 0;
	/* justify-content: center; */
}

.inputs-contain input {
	width: 60px;
	height: 87%;
	padding: 1.69%;
	border-radius: 5px;
	text-align: center;
	border: none;
	margin: 0 0.67% 0;

	background-color: #efefef;
}

.inputs-contain.second {
	justify-content: flex-end;
	margin-top: 5%;
    padding: 0px;
	height: 7%;
}

.close-bttn {
	width: 123%;
    text-align: right;
	opacity: 0.6;
	background-color: transparent;
	border: none;
	padding-top: 5%;
	margin-bottom: -7%;
}

.close-bttn > img {
	width: 14%;
}


.modal-content {
	/* background-color: gray; */
	height: 60%;
	min-height: 340px;
	width: max-content;
	max-width: 500px;
	max-height: 450px;
	-webkit-box-shadow: 0px 0px 32px -4px rgba(0,0,0,0.75);
	-moz-box-shadow: 0px 0px 32px -4px rgba(0,0,0,0.75);
	box-shadow: 0px 0px 32px -4px rgba(0,0,0,0.75);

	padding: 0 45px 0 35px;

	display: flex;
	flex-direction: row;
}

.product-info {
	width: 100%;
	height: max-content;
	margin: auto 0;
	display: flex;
	flex-direction: column;
}

.product-info > * {
	width: 80%;
	margin: 20% 0;
}

.product-info img {
	width: 100%;
	margin: 0 0 40% 0;
}


.left-side {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-right: 3%;
}

.left-side > * {
	width: 100%;
}


.right-side {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-left: 3%;
}

.or-decoration {
	color: #cecece;
	margin: 5% 0;
}

.buy-bttn {
	width: 123%;
	border: 1px solid red;
	border-radius: 5px;
	background-color: rgb(245, 0, 0);
	color: white;
	padding: 3%;
	margin-top: 10%;
	margin-bottom: 0%;
}

.buttons-contain {
	width: 100%;
    display: flex;
    justify-content: space-around;
	margin-bottom: 2%;
}

.buttons-contain > button > img {
	height: 35px;
}

.buttons-contain * {
	outline: none;
	border: none;
	background-color: transparent;
}

.cards-logo {
	margin-right: 14%;
	margin-top: 2%;
}

.cards-logo > img {
	height: 25px;
}

.visa {
	margin-right: 2px;
}

.mobile-info-header {
	display: none;
	width: 120%;
	margin-bottom: -10px;
	margin-top: -20px;
	justify-content: space-between;
	flex-direction: column;
}

.mobile-info-header > * {
	width: max-content;
	display: flex;
	align-items: center;
}

._brend {
	font-weight: 800;
}

._model {
	font-weight: 400;
	color: #cccccc;
}

._coast {
	text-align: center;
	font-weight: 800;
}

.unvalid-input {
	border: 1px solid red;
}

@media ( max-device-width: 800px ){
	button:active {
		outline: none !important;
		border: none !important;
	}
	button:hover {
		outline: none !important;
		border: none !important;
	}
}

@media ( max-device-width: 625px ) {
	.left-side {
		display: none;
	}
	.mobile-info-header {
		display: flex;
		justify-content: space-between;
	}
	.inputs-contain {
		margin: 2% 0.67% 5%;
	}

}
</style>