<template>
<div class="brends">
    <button
        v-for="( item, i ) in allBrends"
        :key="i"
        :class="{
            brendBttn: true,
            active: brandsActive.indexOf( item ) !== -1,
            'menu-button': true,
            screen: touchScreen
        }"
        @click="selectIt( item )"
    >{{ item }}
    </button>
</div>
  
</template>

<script>
    export default {
        name: 'BrendCategory',
        props: ['allBrends', 'brandsActive'],
        data(){
            return {
                touchScreen: false
            }
        },
        methods: {
            selectIt( category ){   
                this.$emit( 'toggledCategory', category );
            }
        },
        mounted(){
            this.touchScreen = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ) );
        }
    }
</script>

<style>

    .brends {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .brendBttn {
        width: 100%;
        font-size: 12px;
        text-align: right;
        border: 1px solid transparent;
        background-color: transparent;
        text-transform: uppercase;
        letter-spacing: 0.45em;
        color: #999;
        transition: 2s;

        margin-bottom: 12%;
    }
    .active::after {
        content: '';
        background-image: url( https://img.icons8.com/ios/13/000000/checkmark.png );
        width: 13px;
        height: 13px;
        /* z-index: 10; */
        position: absolute;
    }
    .brendBttn.screen:hover {
        transition: 0.15s;
        color: #565454;
    }
    .brendBttn.active {
        color: black;
    }
    .B_checkmark {
        margin-left: -8px;
        margin-right: -13px;
    }
</style>