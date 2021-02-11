<template>

	<div class="mobileContain"
		@click="showBttns"
	>
	
		<div v-if="isShowBttns"
			class="mobileButtonsContain"
		>
			<button
				class="mobileBuy"
				@click="buyIt"
			>
				buy
			</button>
			<button
				class="mobileWiew"
				@click="openIt"
			>
				wiew
			</button>
			<button
				class="mobileDelete"
				@click="deleteIt"
			>
				delete
			</button>
		</div>

	</div>

</template>

<script>

export default {
	name: 'ButtonsMobile',
	props: ['id'],
	data(){
		return {
			isShowBttns: false
		}
	},
	methods: {
		showBttns () {
			this.$emit( 'closeMobileButtons' );
			this.isShowBttns = true;
		},
		dontShowButtns () {
			this.isShowBttns = false;
		},
		openIt(){
            this.$emit( 'openIt', this.id );
        },
        deleteIt(){
            this.$emit( 'deleteIt', this.id );
        },
        buyIt(){
            this.$emit( 'buyIt', this.id );
        }
	}
}

</script>

<style scoped>

	.mobileContain {
		position: absolute;
		height: 150px;
		width: 152px;

		z-index: 3;
		display: flex;
		justify-content: center;
	}

	.mobileButtonsContain {
		width: 110%;
		text-align: center;
		background-color: rgba( 255, 255, 255, .6 );
	}

	.mobileContain button {
		transition: 0.7s;

		width: 100%;
		height: 35px;
        line-height: 35px;
        font-size: 9px;
        letter-spacing: 0.45em;
        text-transform: uppercase;
        border-radius: 5px;
		margin-bottom: 20px;
		background-color: transparent;
		border: 1px solid black;
	}

	.mobileBuy {
		background-color: red !important;
		border-color: red !important;
		color: white;
	}

</style>