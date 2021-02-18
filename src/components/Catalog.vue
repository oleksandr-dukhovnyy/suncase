<template>
  <div class="shop" id="shop">
    <div class="hamburger-menu">
        <img :src="'./img/menuControlls/icons8-menu.svg'" alt="menu"
            @click.stop="opendHamburger"
            class="hamburger-menu-icon"
        >
        <MobileMenu
            :show="openedHamburger"

            :allBrends="allBrends"
            :brandsActive="brandsActive"

            :allGenderCategory="allGenderCategory"
            :genderActive="genderActive"
            
            :filterCategies="{
                newActive,
                saleActive,
                mostPopularActive,
                from$to$$$,
                from$$$to$
            }"

            @toggledCategory='toggledCategory'
            @closeMenu="closeMobileHamburger"
        />
    </div>
    <div class="menu">
        <GenderCategory
            :categories='allGenderCategory'
            :genderActive='genderActive'
            @toggledCategory='toggledCategory'
        />
        <span class="line"></span>
        <FilterCategory
            :filterCategies="{
                newActive,
                saleActive,
                mostPopularActive,
                from$to$$$,
                from$$$to$
            }"
            @toggledCategory='toggledCategory'
        />
        <div class="line"></div>
        <BrendCategory
            :allBrends='allBrends'
            :brandsActive='brandsActive'
            @toggledCategory='toggledCategory'
        />
    </div>

      <div
        :class="{ catalog: true,
            'space-evenly': false
        }"        
      >

        <button :class="{
            'contain-bttn': true
        }"
            v-for="( item, i ) in filtredItems"
            :key="i"
            @click="openItInModal( item.id )"
        >
            <img class="small-img-icon"
                :src="`./img/${item.id}/1.jpg`"
                alt="pict"
            >
            <div class="c-info-contain">
                <span class="c-brend">
                    {{ item.brend }}
                </span>
                <span class="c-model">
                    {{ item.model }}   
                </span>
                <span class="C_coast"
                    v-if="!item.sale" >
                    ${{ item.coast }}
                </span>
                <span class="C_sale"
                    v-else
                >
                    <span class="old-price">${{ item.oldCoast }}</span>
                    <span class="new-price">${{ item.coast }}</span>
                </span>

                <div class="new"
                    v-if="item.isNew"
                >new</div>
            </div>
            
      </button>
    </div>

  </div>
</template>

<script>
// funks
    import { generatedFiltredItems } from '../js/generatedFiltredItems.js';

// components
    import GenderCategory from './categories/GenderCategory.vue';
    import FilterCategory from './categories/FilterCategory.vue';
    import BrendCategory from './categories/BrendCategory.vue';
    import MobileMenu from './hamburger for mobile/Menu.vue';

export default {
    name: 'Catalog',
    props: [
        "allItemsInTheCatolog",
        "itemsInCart",
        "totalPrice",
        "showCartIcon",
        "genderActive"
    ],
    components: {
        GenderCategory, FilterCategory, BrendCategory, MobileMenu
    },
    data(){
        return {
            filtredItems: [],
            brandsActive: [''],
            newActive: false,
            saleActive: false,
            mostPopularActive: false,
            from$to$$$: false,
            from$$$to$: false,
            allGenderCategory: ['man', 'woman', 'kids'],
            allBrends: ['Levis','Ray-Ban','Oakley','Prada','Persol','Versace','Polaroid', 'Saint Laurent', 'Christian Dior', 'Maui Jim'],
            showLength: 12,
            showMoreClicked: false,
            openedHamburger: false
        }
    },
    methods: {
        openItInModal( id ){
            this.closeMobileHamburger();
            this.$emit( 'openSlider', id );
        },
        refreshFilters(){         
            this.filtredItems = generatedFiltredItems( this._data, this.allItemsInTheCatolog, this.genderActive );
        },
        showMore(){
            if( this.showLength+12 > this.allItemsInTheCatolog.length && this.showLength !== this.allItemsInTheCatolog.length ){
                this.showLength = this.allItemsInTheCatolog.length;
            } else {
                this.showLength += 12;
            }
            this.refreshFilters();
            this.showMoreClicked = true;
        },
        openCart(){
            this.closeMobileHamburger();
            this.$emit( 'openCart' );
        },
        toggledCategory( category ){
            this.showMoreClicked = false;
            this.showLength = Infinity;
            
            if( this.allGenderCategory.indexOf( category ) !== -1 ){
                if( this.genderActive[0] === '' ){
                    this.genderActive.splice( 0, 1 );
                }
                let genderIndex = this.genderActive.indexOf( category );
                if( genderIndex === -1 ){
                    this.genderActive.push( category );
                } else {
                    this.genderActive.splice( genderIndex, 1 );
                }
            }
            if( this.allBrends.indexOf( category ) !== -1 ){
                let brandIndex = this.brandsActive.indexOf( category );
                if( this.brandsActive[0] === '' ){
                    this.brandsActive.splice( 0, 1 );
                }
                if( brandIndex === -1 ){
                    this.brandsActive.push( category );
                } else {
                    this.brandsActive.splice( brandIndex, 1 );
                }
            }
            if( category === 'newActive' ){
                this.newActive = !this.newActive;
            }
            if( category === 'saleActive' ){
                this.saleActive = !this.saleActive;
            }
            if( category === 'mostPopularActive' ){
                this.mostPopularActive = !this.mostPopularActive;
            }
            if( category === 'from$to$$$' ){
                this.from$to$$$ = !this.from$to$$$;
                if( this.from$to$$$ === true && this.from$$$to$ === true ){
                    this.from$$$to$ = false;
                }
            }
            if( category === 'from$$$to$' ){
                this.from$$$to$ = !this.from$$$to$;
                if( this.from$to$$$ && this.from$$$to$ ){
                    this.from$to$$$ = false;
                }
            }
            this.refreshFilters();
        },
        closeMobileHamburger(){
            this.$emit( 'addBodyScroll' );
            this.openedHamburger = false;
        },
        opendHamburger(){
            this.$emit( 'removeBodyScroll' );
            this.openedHamburger = true;
        }
    },
    mounted() { this.refreshFilters(); }
}
</script>

<style scoped>
.space-evenly {
    justify-content: space-evenly;
}


/* catalog item card */
    .contain-bttn {
        border: none;
        background-color: transparent;
        display: flex;
        flex-direction: column;
        width: 22.31%;
        min-width: 210px;
        height: 200px;
        margin-bottom: 2.31%;
        
        margin-left: 2.31%;
        /* background-color: darkorange; */

        padding: 15px;
    }

    @media ( max-device-width: 690px ){
        .contain-bttn {
            min-width: 150px;
            padding: 1%;
        }
    }

    .shop {
        width: 96.5%;
        max-width: 1300px;
        text-align: center;
        margin: 50px auto 0;
        display: flex;
    }
    .catalog {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 0 30px 30px;
        align-items: flex-start;
        width: 100%;
        height: max-content;
        margin: 0 auto;

        justify-content: space-evenly;
    }
    .menu {
        z-index: 0;
        width: calc( 12.69% + 60px );
        display: flex;
        /* background-color: midnightblue; */
        flex-direction: column;
        padding: 2.31%;
    }

    .small-img-icon {
        width: 100%;
    }



/* ///////////////////// */
    .c-info-contain {
        text-align: left;
        width: 100%;
        margin-left: 7px;
    }
    .c-info-contain > * {
        display: block;
        letter-spacing: 0.45em;
        font-weight: lighter;
        font-size: 12px;
    }
    .c-brend {
        transition: 0.5s;
        font-size: 15px;
        margin-bottom: 12px;
    }
    .c-model {
        transition: 0.5s;
        height: 12px;
        margin-bottom: 16px;
        color: #999;
    }
    .new {
        position: relative;
        top: -104px;
        left: 70%;
        text-transform: uppercase;
        width: 51px;
        height: 51px;
        text-align: center;
        line-height: 51px;
        color: red;
        font-size: 10px;
        font-weight: 400;
        border: 1px solid red;
        border-radius: 50%;

        transform: rotate( -15deg );
        letter-spacing: normal;
    }
    @-webkit-keyframes rotating /* Safari and Chrome */ {
            from {
                -webkit-transform: rotate(0deg);
                -o-transform: rotate(0deg);
                transform: rotate(0deg);
            }
            to {
                -webkit-transform: rotate(360deg);
                -o-transform: rotate(360deg);
                transform: rotate(360deg);
            }
        }
        @keyframes rotating {
            from {
                -ms-transform: rotate(0deg);
                -moz-transform: rotate(0deg);
                -webkit-transform: rotate(0deg);
                -o-transform: rotate(0deg);
                transform: rotate(0deg);
            }
        to {
            -ms-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }
        }
    .new {
        -webkit-animation: rotating 12s linear infinite;
        -moz-animation: rotating 12s linear infinite;
        -ms-animation: rotating 12s linear infinite;
        -o-animation: rotating 12s linear infinite;
        animation: rotating 12s linear infinite;
        }

    .new-shtamp {
        text-transform: uppercase;
        width: 51px;
        height: 51px;
        text-align: center;
        line-height: 51px;
        color: red;
        font-size: 10px;
        font-weight: 400;
        border: 1px solid red;
        border-radius: 50%;

        transform: rotate( -25deg );

        position: relative;
        top: -61px;
        right: -152px;
    }

    .ghost {
        opacity: 0;
    }
    .old-price {
        text-decoration: line-through;
    }
    .new-price {
        margin-left: 5px;
        color: red;
    }
    .active-menu {
        color: black;
    }
    .line {
        margin-top: 20px;
        margin-bottom: 20px;
        width: 60%;
        margin-left: 40%;
        height: 1px;
        background-color: #999;
    }
/*  */

    .hamburger-menu {
        width: 100%;
        display: none;
    }

    .hamburger-menu-icon {
        width: 68px;
        height: 55px;
        opacity: 0.5;
        margin-bottom: 7%;
    }

@media ( max-device-width: 530px ){
    .menu {
        display: none;
    }
    .hamburger-menu {
        display: flex;
    }
    .catalog {
        padding: 0px;
        width: 100%;
    }
    .shop {
        flex-direction: column;
    }
    .contain-bttn {
        margin: 0 0 10px;
    }
}

/*


@media ( max-device-width: 768px ){
    .hamburger-menu {
        font-size: 12px !important;
    }
}

@media ( max-device-width: 600px ) and ( orientation: landscape ){
    .shop {
        justify-content: center;
    }
    .catalog {
        margin-left: -18%;
    }
}

@media ( max-device-width: 425px ) and ( orientation: portrait ){
    .contain-bttn {
        width: 83%;
    }
    .catalog {    
        margin-left: -27%;
    }
} */
</style>