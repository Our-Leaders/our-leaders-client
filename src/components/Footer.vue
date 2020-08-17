<template>
 <div class="bg-primary">
   <div class="lg-footer bg-primary">
     <div class="footer-elements">
       <div class="footer-col">
         <div class="footer-logo-elements">
           <img class="footer-logo" src="@/assets/img/logo-w.svg"/>
         </div>
       </div>
       <div class="footer-col">
         <h3>Company</h3>
         <router-link :to="{ name: 'about-us' }"><a href="#">About Us</a></router-link>
         <a href="https://medium.com/@ourleaders.a" target="_blank">Blog</a>
         <router-link :to="{ name: 'careers' }"><a href="#">Careers</a></router-link>
         <router-link :to="{ name: 'donate' }"><a href="#">Donate</a></router-link>
       </div>
       <div class="footer-col">
         <h3>Help</h3>
         <router-link :to="{ name: 'contact-us' }"><a href="#">Contact Us</a></router-link>
         <router-link :to="{ name: 'faqs' }"><a href="#">FAQs</a></router-link>
       </div>
       <div class="footer-col">
         <h3>Links</h3>
         <router-link :to="{ name: 'privacy' }"><a href="#">Privacy Policy</a></router-link>
         <router-link :to="{ name: 'terms' }"><a href="#">Terms &amp; Conditions</a></router-link>
       </div>
       <div class="footer-col">
         <h3>We're Social</h3>
           <div class="footer-social-elements">
             <a href="https://facebook.com/ourleaders.africa" target="_blank"><img class="social-icon" src="@/assets/img/facebook-white.svg"/></a>
             <a href="https://twitter.com/OurLeaders_A" target="_blank"><img class="social-icon" src="@/assets/img/twitter-white.svg"/></a>
             <a href="https://instagram.com/ourleaders.africa" target="_blank"><img class="social-icon" src="@/assets/img/instagram-white.svg"/></a>
           </div>
       </div>
     </div>
      <hr class="text-white w-9/12 mt-5 mb-10 mx-auto"/>
      <div class="footer-copy text-sm text-white mt-8">Kingdom Principles</div>
      <div class="footer-copy text-white">&copy; Olubrain leadership Foundation, 2019</div>
   </div>

   <div class="sm-footer">
     <div class="footer-elements">
       <div>
         <img class="footer-logo" src="@/assets/img/logo-w.svg"/>
       </div>
       <div class="footer-group">
         <div class="footer-col">
           <h3>Company</h3>
           <router-link :to="{ name: 'about-us' }"><a href="#">About Us</a></router-link>
           <a href="https://medium.com/@ourleaders.a" target="_blank">Blog</a>
           <router-link :to="{ name: 'careers' }"><a href="#">Careers</a></router-link>
           <router-link :to="{ name: 'donate' }"><a href="#">Donate</a></router-link>
         </div>
         <div class="footer-col">
           <h3>Links</h3>
           <router-link :to="{ name: 'privacy' }"><a href="#">Privacy Policy</a></router-link>
           <router-link :to="{ name: 'terms' }"><a href="#">Terms &amp; Conditions</a></router-link>
         </div>
       </div>
       <div class="footer-group">
         <div class="footer-col">
           <h3>Help</h3>
           <router-link :to="{ name: 'contact-us' }"><a href="#">Contact Us</a></router-link>
           <router-link :to="{ name: 'faqs' }"><a href="#">FAQs</a></router-link>
         </div>
         <div class="footer-col">
           <h3>We're Social</h3>
           <div class="footer-social-elements">
             <a href="https://facebook.com/ourleaders.africa" target="_blank"><img class="social-icon" src="@/assets/img/facebook-white.svg"/></a>
             <a href="https://twitter.com/OurLeaders_A" target="_blank"><img class="social-icon" src="@/assets/img/twitter-white.svg"/></a>
             <a href="https://instagram.com/ourleaders.africa" target="_blank"><img class="social-icon" src="@/assets/img/instagram-white.svg"/></a>
           </div>
         </div>
       </div>
     </div>
     <div class="footer-copy text-sm text-white mt-8">Kingdom Principles</div>
     <div class="footer-copy">&copy; Olubrain leadership Foundation, 2019</div>
   </div>
 </div>
</template>

<script>
export default {
  name: 'our-footer',
};
</script>

<style scoped lang="scss">
  .lg-footer {
    font-family: 'Circular Std', serif;
    width: 100%;

    .footer-elements {
      width: 87%;
      margin-left: auto;
      margin-right: auto;
      padding: 50px 40px;
      display: flex;
      flex-direction: row;

      .footer-col {
        width: 20%;

        h3 {
          color: white;
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 6px;
        }

        a {
          color: #ffffff;
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
        }

        .social-icon {
          width: 22px;
          height: 22px;
          margin-right: 30px;
        }
      }
    }
  }

  .footer-logo {
    height: 100px;
    width: 100px;
  }

  .footer-copy {
    text-align: center;
    font-size: 14px;
  }

  .sm-footer {
    display: none;
    font-family: 'Circular Std', serif;
    width: 100%;
    color:  white;
    background-color: #C79947;
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 20px;

    .footer-elements {
      width: 95%;
      margin-left: auto;
      margin-right: auto;
      border-style: solid;
      border-color: #ffffff;
      border-bottom-width: 1px;
      padding: 50px 0;


      .footer-group {
        margin-top: 20px;
        display: flex;
        flex-direction: row;

        .footer-col {
          width: 50%;

          h3 {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 6px;
          }

          a {
            font-size: 14px;
            text-decoration: none;
            margin-top: 10px;
            display: block;
          }

          .footer-social-elements {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;

            a {
              display: inline;
            }

            .social-icon {
              width: 22px;
              height: 22px;
              margin-right: 15px;
            }
          }
        }
      }

      .footer-logo {
        margin: auto;
        margin-bottom: 30px;
      }
    }
  }

  @media only screen and (max-device-width: 768px) {
    .lg-footer {
      display: none;
    }

    .sm-footer{
      display: block;
    }
  }
</style>
