<template>

    <div class="langContain">
        <span
            v-for="( item, i ) in allLanguages"
            :key="i"
            :class="{ lang: true, _active: langActive === item }"

            @click.stop="setLanguage( item )"
        >{{ item }}</span>
    </div>

</template>

<script>

export default {
    name: 'Languages',
    props: ["langActive"],
    data(){
        return {
            allLanguages: ['eng', 'ua', 'ru']
        }
    },
    methods: {
        setLanguage( newLang ){
            this.$emit( 'setLanguage', newLang );
        }
    },
}

</script>

<style scoped>
    .lang {
        transition: 0.5s;
        font-size: 11px;
        color: #999;
        text-transform: uppercase;
        margin-right: 13px;
        letter-spacing: 0.35em;
    }
    .lang:hover {
        cursor: pointer;
    }
    ._active {
        font-weight: bold;
        transition: 0.5s;
        color: #000;
    }

    .langContain {
        z-index: 4;
        width: max-content;
        height: max-content;

        padding-top: 3px;
    }
</style>