<template>
    <div class="line">
    
		<div class="first"></div>

        <div class="second">
            <div class="offer">
                <span>sunglass</span>
                <span>that you'll</span>
                <span>never</span>
                <span>take off</span>
                <button
                    class="browse"
                    @click="browse"

                >browse</button>
            </div>
        </div>

        <div class="third"></div>

        <div class="fourth"></div>

    </div>
    
</template>

<script>

export default {
    name: 'LineSlider',
    methods: {
        browse() {
            this.$emit( 'browse' );
        }
    },
}

</script>

<style scoped>
	
    .line {

        display: flex;
        flex-direction: row;
        overflow: hidden;

        justify-content: space-around;

        margin: 30px auto 0;

        width: 1300px;
        max-width: 1600px;
    }

    .line > div {
		height: 530px;
        margin-right: 30px;

        background-repeat: no-repeat;
        background-position: center;
        
	}

    .line > div:last-child {        
        margin-right: 0px;
    }

    .first {
        width: 407px;

        background-image: url( '../../../public/img/LineSlider/1/1.jpg' );
        background-size: auto 550px;
    }

    .second {
        width: 347px;

        display: flex;
        flex-direction: column;
        text-align: center;
    }

    .offer {
        display: flex;
        flex-direction: column;
        text-align: left;
        width: max-content;
        height: max-content;
        margin: auto;

        text-transform: uppercase;
    }

    .offer span {
        font-size: 20px;
        letter-spacing: 0.45em;
        font-weight: thin;
    }

    .browse {
        margin-top: 17px;
        width: 163px;
        height: 43px;
        border: 1px solid black;
        border-radius: 5px;
        background: transparent;

        font-size: 12px;
        letter-spacing: 0.45em;
        font-weight: 300;

        text-transform: uppercase;
    }

    .third {
        background-image: url( '../../../public/img/LineSlider/1/3.jpg' );
        background-size: auto 600px;

        width: 470px;
    }

    .fourth {
        width: 481px;
        background-image: url( '../../../public/img/LineSlider/1/4.jpg' );
        background-size: auto 600px;
    }

    @media ( max-device-width: 1350px ) {
        .fourth {
            display: none;
        }

        .line > div {
            width: 30%;
        }

        .line {
            width: 100%;
            margin: 30px auto 0;
            margin-left: 17px;
        }
    }
    @media ( max-device-width: 768px ){
        .first {
            display: none;
        }
        .line > div {
            width: 50%;
        }
        .line {
            width: 100%;
            margin: 30px auto 0;
            margin-left: 17px;
        }
    }
    @media ( max-device-width: 620px ){
        .third {
            display: none;
        }
    }

</style>