<template>
  <div class="footer">
    <div class="footer-elements">
      <div class="footer-col">
        <div class="footer-logo-elements">
          <img class="footer-logo" src="@/assets/img/logo.svg"/>
        </div>
        <div class="footer-social-elements">
          <a href="#"><img class="social-icon" src="@/assets/img/facebook-black.svg"/></a>
          <a href="#"><img class="social-icon" src="@/assets/img/twitter-black.svg"/></a>
          <a href="#"><img class="social-icon" src="@/assets/img/linkedin-black.svg"/></a>
          <a href="#"><img class="social-icon" src="@/assets/img/instagram-black.svg"/></a>
        </div>
      </div>
      <div class="footer-col">
        <h3>Contact</h3>
        <a href="#">8, Lawal Street, off Oweh street, Jibowu, Yaba Lagos, Nigeria</a>
        <a href="tel:+2348175439754">(234) 817 543 9754</a>
        <a href="mailto:hello@ourloaders.africa">hello@ourleaders.africa</a>
      </div>
      <div class="footer-col">
        <h3>Company</h3>
        <a href="#">About us</a>
        <a href="#">Blog</a>
        <a href="#">Careers</a>
      </div>
      <div class="footer-col">
        <h3>Help</h3>
        <a href="#">Contact us</a>
        <a href="#">FAQs</a>
      </div>
      <div class="footer-col">
        <h3>Links</h3>
        <a href="#">Privacy Policy</a>
        <a href="#">Sitemap</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'our-footer',
};
</script>

<style scoped lang="scss">
  .footer {
    font-family: 'Circular Std', serif;
    width: 100%;

    .footer-elements {
      width: 87%;
      margin-left: auto;
      margin-right: auto;
      border-style: solid;
      border-color: #dbdbdb;
      border-top-width: 1px;
      padding: 50px 40px;
      display: flex;
      flex-direction: row;

      .footer-col {
        width: 20%;

        h3 {
          color: #929497;
          font-size: 16px;
          margin-bottom: 6px;
        }

        a {
          font-size: 14px;
          text-decoration: none;
          margin-top: 10px;
          display: block;
        }

        .footer-logo-elements {
          display: flex;
          justify-content: center;
        }

        .footer-social-elements {
          display: flex;
          margin-top: 20px;
          justify-content: center;
        }
      }
    }
  }

  .footer-logo {
    width: 100px;
    height: 100px;
  }

  .social-icon {
    width: 22px;
    height: 22px;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
