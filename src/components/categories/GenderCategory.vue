<template>
    <div class="gender">
        <button
            v-for="( item ,i ) in categories"
            :key="i"
            
            :class="{
                genderBttn: true,
                selected: genderActive.indexOf( item ) !== -1,
                screen: !touchScreen
            }"
            @click="selectedIt( item )"

            >{{ item }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'GenderCategory',
    props: ["categories", 'genderActive'],
    data(){
        return {
            touchScreen: null
        }
    },
    methods: {
        selectedIt( category ){
            this.$emit( 'toggledCategory', category );
        }
    },
    mounted(){
        this.touchScreen = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ) );
    }
}
</script>

<style>
    .gender {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
    .genderBttn {
        width: 100%;
        font-size: 18px;
        text-align: right;
        border: 1px solid transparent;
        background-color: transparent;
        text-transform: uppercase;
        letter-spacing: 0.45em;
        color: #999;
        transition: 2s;

        margin-bottom: 12%;
    }
    .selected::after {
        content: '';
        background-image: url( https://img.icons8.com/ios/13/000000/checkmark.png );
        width: 13px;
        height: 13px;
        position: absolute;
    }
    .G_checkmark {
        margin-left: -13px;
        margin-right: -13px;
    }
    .genderBttn.screen:hover {
        /* font-size: 19px; */
        transition: 0.15s;
        color: #565454;
    }
    .genderBttn.selected {
        color: black;
    }
    
</style>