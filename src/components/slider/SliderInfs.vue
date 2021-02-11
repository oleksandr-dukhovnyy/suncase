<template>
  <div class="info-contain">
        <div class="brend letterS250"> {{ imgData.brend }} </div>
        <div class="model letterS250"> {{ imgData.model }} </div>
        <div class="coast letterS250"> ${{ imgData.coast }} </div>
    </div>
</template>

<script>
export default {
    name: 'SliderInfs',
    props: ['imgData']
}
</script>

<style>
  .info-contain {
    display: flex;
    flex-direction: column;
    height: 20%;
  }

  .info-contain > div {
    margin: 2px 0;
  }

  .brend {
    font-size: 100%;
    font-weight: 400;
  }

  .model {
      color: #999999;
      font-size: 75%;
      font-weight: 200;
  }
  .info-contain > .coast {
      font-size: 80%;
      font-weight: 800;
      margin-top: 8px;
  }

  @media ( max-device-width: 650px ) and ( orientation: portrait ) {
    .info-contain {
      height: 80%;
      padding-left: 15px;
      padding-top: 15px;
    }
  }
</style>