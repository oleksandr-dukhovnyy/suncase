<template>
  <div
    class="button-contain"
  >
      <button
        class="buy action-bttn"
        @click="buyIt()"
      >
      buy
      </button>
      
      <button class="add-to-cart-bttn action-bttn"
        @click="addToCartIt( productData.id )"
      >
        
        <svg v-if="animateOn" class="checkmark" viewBox="0 0 52 52">
            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>

        <div v-if="!animateOn"
            class="add-to-cart-container"
        >
            <span class="add-to-cart-bttn-plus">+</span>
            <span>to cart</span>
        </div>
        <!-- <div v-if="animateOn" class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div> -->

      </button>
  </div>
</template>

<script>
export default {
    name: 'SliderBuy',
    props: ["productData"],
    data(){
        return {
            animateOn: false,
            animationSetting: {
                timeLoad: 3,
                timeShowingDone: 3
            },
            animateDoneOn: false
        }
    },
    methods: {
        buyIt( id ){
            this.$emit( 'buyIt', this.productData.id );
        },
        addToCartIt( id ){
            this.animateOn = true;
            this.$emit( 'addToCart', id );
            setTimeout( () => {
                this.animateOn = false;
            }, 2000);
        }
    }
}
</script>

<style>
    .add-to-cart-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .add-to-cart-bttn {
        border: 1px solid black;
        margin-top: 10px;
        color: black;

    }
    .add-to-cart-bttn:hover {
        transition: 0.8s;
        color: #000;
        border: 1px solid #000;
    }

    .add-to-cart-bttn-plus {
        font-size: 16px;
    }

    .action-bttn {
        background-color: transparent;
        transition: 0.5s;
        width: 160px;
        height: 43px !important;
        min-height: 43px;
        border-radius: 5px;
        font-size: 12px;
        letter-spacing: 0.45em;
        font-weight: 300;
        text-transform: uppercase;
    }

    .buy {
        border: 1px solid #e86868;
        color:#e86868;

    }
    .buy:hover {
        background-color: rgb( 227, 38, 54 );
        color: white;
        transition: 0.5s;
    }

    .done {
        color: green !important;
        transition: 0.5s;
    }

    .button-contain {
        display: flex;
        flex-direction: column;
        height: 70%;
        justify-content: flex-end;
        align-items: flex-start;
    }


    .lds-ring {
        display: inline-block;
        position: relative;
        width: 20px;
        height: 20px;
    }
    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 20px;
        height: 20px;
        margin: 2px;
        border: 2px solid #6a6969;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier( 0.7, 0, 0.7, 1 ) infinite;
        border-color: #6a6969 transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes lds-ring {
        0% {
            transform: rotate( 0deg );
        }
        80%{
            transform: rotate( 350deg );
        }
        100% {
            transform: rotate( 360deg );
        }
    }

/* // */
    .checkmark {
        width: 38px;
        height: 38px;
        display: block;

        stroke: #000;
        animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
        margin-left: 38%;
        margin-top: -3px;
    }
    .checkmark__check {
        transform-origin: 60% 60%;
        stroke-dasharray: 48;
        stroke-dashoffset: 48;
        animation: stroke 0.3s cubic-bezier( 0, 0, 0.45, 1 ) 0.8s forwards;
    }
    .small {
        display: none;
    }
    @keyframes stroke {
        100% {
            stroke-dashoffset: 1;
        }
    }
    @keyframes scale {
        0%, 100% {
            transform: none;
        }
        50% {
            transform: scale3d(1.6, 1.6, 1.5);
        }
    }
/*  */

@media ( max-device-width: 650px ) and ( orientation: portrait ) {
    .button-contain {
        height: 120px;
        align-items: flex-end;
        width: max-content;
        margin: 0 auto;
    }
}

@media ( max-device-width: 395px ) and ( orientation: portrait ) {
    .button-contain {
        margin-top: 8%;
    }
}

@media ( orientation: portrait ) {
    .button-contain {
        margin: 0 15px 0 auto;
    }
}
</style>