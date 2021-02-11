<template>

	<section
		:class="{
			hamburger: true,
			animate__animated: true,
			hide: !show
		}"
		@click="closeMenu"

		@touchstart="startTouch"
		@touchend="checkTouchEnd"

	>
		<div :class="{
				'hamburger-content-contain': true,
				animate__animated: true,
				animate__fadeInLeft: show,
				animate__fadeOutLeft: !show
			}"
			@click.stop
			data-scroll-lock-scrollable
		>
			<button
				class="hamburger-close"
				@click="closeMenu"
			>
				<img :src="'./img/sliderControl/closeBttn.svg'" alt="x">
			</button>

			<div class="hamburger-contain">
				<nav class="hamburger-nav">
					<div
						class="hamburger-nav-flex-contain"
					>
						<div class="hamburger-nav-contain gender">
							<button
								v-for="( item, i ) in allGenderCategory"
								:key="i"

								:class="{
									'hamburger-nav-item': true,
									'selected': genderActive.indexOf( item ) !== -1
								}"

								@click="toggledCategory( item )"
							>{{ item }}
							</button>
						</div>
						<div class="line"></div>
						<div class="hamburger-nav-contain">
							<button
								v-for="( item, name, i ) in filterCategies"
								:key="i + 1000"

								:class="{
									'hamburger-nav-item': true,
									'selected': filterCategies[name]
								}"

								@click="toggledCategory( name )"
							>{{ name | toNormalName }}
							</button>
						</div>
						<div class="line"></div>
					</div>
					<div class="hamburger-nav-contain-brends">
						<button
							v-for="( item, i ) in allBrends"
							:key="i + 100"

							:class="{
								'hamburger-nav-item': true,
								'selected': brandsActive.indexOf( item ) !== -1
							}"

							@click="toggledCategory( item )"
						>{{ item }}
						</button>
					</div>
				</nav>
			</div>
		</div>
	</section>

</template>

<script>

export default {
	name: 'MobileMenu',
	props: [
		'allBrends', 'brandsActive',
		'allGenderCategory', 'genderActive',
		'filterCategies',
		'show'
	],
	data(){
		return {
			touchTimeStamp: 0,
			clientX: 0
		}
	},
	methods: {
		toggledCategory( category ) {
			this.$emit( 'toggledCategory', category );
		},
		closeMenu(){
			this.$emit( 'closeMenu' );
		},
		showE( e ){
			console.log( e );
		},
		checkTouchEnd( e ){
			if( e.changedTouches[0].clientX <= -50 ){
				if( e.timeStamp - this.touchTimeStamp >= 190 ){
					this.closeMenu();
				}
			}
			
		},
		startTouch( e ){
			this.touchTimeStamp = e.timeStamp;
			this.clientX = e.changedTouches[0].clientX;
		}
	},
	filters: {
        toNormalName( name ){
            let normalNames = {
                newActive: 'new',
                saleActive: 'sale',
                mostPopularActive: 'most popular',
                from$to$$$: 'price low to high',
                from$$$to$: 'price high to low'
            }
            for( let prop in normalNames ){
                if( name === prop ){
                    return normalNames[prop];
                }
            }
            console.warn( `App > Catalog > FilterCategory > filters > toNormalName: name (${name}) is not defined in normalNames (returned no fixed value)`, normalNames );
            return name;
        }
    }
}

</script>

<style scoped>

	.line {
		width: 45%;
		/* margin-left: 32.5%; */
		height: 1px;
		background-color: #cacaca;
		margin-bottom: 10%;
		margin-top: -10%;
	}

	.hamburger {
		overflow-y: scroll;
		height: 100%;
    	width: 100%;
		background-color: rgba( 255, 255, 255, 0.0 );
		position: fixed;
		z-index: 110;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		/* padding: 25px; */

	}

	.hamburger-content-contain {
		width: 50%;
		background-color: rgba( 255, 255, 255, 1 );
		padding: 25px 0px 25px 25px;
		height: 100%;
    	overflow-y: scroll;
		-webkit-box-shadow: 0px 0px 32px -4px rgba(0,0,0,0.75);
    	-moz-box-shadow: 0px 0px 32px -4px rgba(0,0,0,0.75);
    	box-shadow: 0px 0px 32px -4px rgba(0,0,0,0.75);
	}

	.hamburger-close {
		margin: 0px 0 0 calc( 48% - 55px );
		background: none;
		border: none;
		opacity: 0.6;
		position: fixed;
	}

	.hamburger-close > img {
		width: 25px;
	}

	.hamburger-contain {
		width: 100%;
		display: flex;
		text-align: left;
		flex-flow: column wrap;
	}

	.hamburger-nav {
		width: 100%;
		height: max-content;
		display: flex;
		flex-direction: column;
	}

	.hamburger-nav-item {
		width: 100%;
		padding: 8px;
		font-size: 11px;
		transition: 0.5s;
        border: 1px solid transparent;
        background-color: transparent;
        text-transform: uppercase;
        letter-spacing: 0.45em;
        color: #929292;
		text-align: left;
	}

	.checked-contain {
		position: relative;
		z-index: 1;
		margin-right: -25px;
	}

	.hamburger-nav-contain {
		margin-bottom: 35px;
		width: 100%;
	}

	.hamburger-nav-contain-brends {
		display: flex;
		width: 100%;

		flex-direction: row;
		flex-wrap: wrap;

		margin-bottom: 100px;
	}

	.hide {
		display: none !important;
	}

	.selected {
		color: black;
	}

	.selected::after {
        content: '';
        background-image: url( https://img.icons8.com/ios/13/000000/checkmark.png );
        width: 13px;
        height: 13px;
        position: absolute;
    }

	.gender > * {
		font-size: 17px;
	}

	@media ( max-device-width: 345px ){
		.hamburger-nav-item {
			padding: 1%;
		}
	}
</style>