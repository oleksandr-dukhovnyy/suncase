<template>
    <div class="error__contain">
        <div class="error__404">ERROR</div>
        <div class="number">404</div>
        <button class="go__to__the__home"
            @click="toHome"
        >to home</button>
    </div>
</template>

<script>

export default {
    name: 'Error404',
    methods: {
        toHome(){
            this.$emit( 'toHome' );
        }
    },
}

</script>

<style scoped>
    .error__404 {
        margin-top: 10%;
        letter-spacing: 0.25em;
        font-weight: 100;
        font-size: 35px;
        /* z-index: 1000; */
        /* text-decoration: underline; */
    }
    .error__contain {
        text-align: center;
        height: 100%;
        position: fixed;
        width: 100%;
        background-color: #fff;
        z-index: 999;
    }
    .number {
        letter-spacing: 0.25em;
        font-weight: 800;
        font-size: 35px;
        /* z-index: 1000; */
    }

    .go__to__the__home {
        letter-spacing: 0.25em;
        font-weight: 400;
        font-size: 12px;
        padding: 10px;
        padding-left: 15px;
        padding-right: 15px;
        margin-top: 65px;
        border-radius: 5px;
        background-color: transparent;
        border: 1px solid black;

        text-transform: uppercase;
        /* z-index: 1000; */
    }
</style>