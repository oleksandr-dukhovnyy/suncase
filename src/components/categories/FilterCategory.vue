<template>
  <div class="filters">
      <button
        v-for="(value, name, index) of filterCategies"
        :key="index"
        :class="{
            filtersBttn: true,
            selected: value,
            'menu-button': true,
            screen: !touchScreen
        }"

        @click="selectedIt( name )"
      >
        {{ name | toNormalName }}
      </button>
  </div>
</template>

<script>
export default {
    name: 'FilterCategory',
    props: ["filterCategies"],
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
    },
    mounted(){
        this.touchScreen = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ) );
    }
}
</script>

<style>
    .filters {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .filtersBttn {
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
    .selected::after {
        content: '';
        background-image: url( https://img.icons8.com/ios/13/000000/checkmark.png );
        width: 13px;
        height: 13px;
        /* z-index: 10; */
        position: absolute;
    }
    .F_checkmark {
        transition: 0.5s;
        margin-left: -8px;
        margin-right: -13px;
    }
    .filtersBttn.screen:hover {
        transition: 0.15s;
        color: #565454;
        /* font-size: 13px; */
    }
    .filtersBttn.selected {
        color: black;
    }
</style>