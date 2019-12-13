<template>
  <div>
    <div>
      <div>
        <div>
          <img class="xl:absolute mr-2 w-12" src="@/assets/img/logo.svg"/>
        </div>
        <div>

        </div>
      </div>
      <div class="footer-col">
        <h3>Contact</h3>
        <a href="#">8, Lawal Street, off Oweh street, Jibowu, Yaba Lagos, Nigeria</a>
        <a href="#">(234) 817 543 9754</a>
        <a href="#">Careers</a>
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
.footer-col {
  font-family: 'Circular Std',serif;

  h3 {
    color: #929497;
    font-size: 16px;
    margin-bottom: 6px;
  }

  a {
    font-size: 14px;
    text-decoration: none;
    display: block;
    margin-top: 10px;
  }
}
</style>
