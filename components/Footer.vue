<template>
  <footer class="footer">
    <!-- <div>
      <div style="display: flex; gap: 10px; justify-content: space-between">
        <ul>
          <li>Levis</li>
          <li>Prada</li>
          <li>Oakley</li>
        </ul>

        <ul>
          <li>Persol</li>
          <li>Versace</li>
          <li>Ray Ban</li>
          <li>Polaroid</li>
        </ul>

        <ul>
          <li>Maui Jim</li>
          <li>Saint Laurent</li>
          <li>Christian Dior</li>
        </ul>
      </div>
      <div class="copyright">
        <div>
          © <a :href="`mailto:${email}`">{{ email }}</a>
        </div>
      </div>
    </div> -->

    <div class="footer__content">
      <div class="footer__logo" @click="scrollToTop">
        <img
          width="42"
          height="42"
          :src="image('suncase-logo.png')"
          alt="sun"
        />
        <strong> SUNCASE </strong>
      </div>

      <!-- <div>brands</div> -->

      <div class="copyright">
        <a :href="`mailto:${email}`"
          ><span>© </span><span class="copyright__email">{{ email }}</span></a
        >
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  position: absolute;
  left: 0;
  display: flex;
  width: 100vw;
  height: 200px;
  background-color: #f3f3f3;
  color: $color-black;
  font-size: 12px;
  cursor: pointer;
  transition: 0.3s;

  &__content {
    position: relative;
    display: flex;
    gap: 48px;
    justify-content: flex-start;
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    padding: 48px 0;

    // > * {
    //   outline: 1px dotted coral;
    // }
  }

  &__logo {
    display: flex;
    gap: 16px;
    align-items: center;
    height: max-content;
    margin: 0 auto;

    strong {
      font-size: 25px;
      font-weight: 700;
      letter-spacing: 0.5em;
      text-align: center;
      text-transform: uppercase;
    }
  }

  .copyright {
    $width: 310px;

    position: absolute;
    bottom: 30px;
    left: calc(50% - ($width / 2));
    display: flex;
    width: $width;
    border-top: 1px solid $color-black;

    &__email {
      text-decoration: underline;
    }

    a {
      display: block;
      margin: 0 auto;
      padding-top: 10px;
      color: $color-muted;
      text-align: center;
      text-decoration: none;
    }
  }
}
</style>
