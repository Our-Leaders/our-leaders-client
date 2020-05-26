<template>
  <div class="overflow-x-hidden">
    <!-- Header -->
    <div class="flex flex-wrap mb-4 relative">
      <div class="w-full md:w-4/5 relative mx-auto h-auto bg-primary bg-overlay-header">
        <div id="main-header" class="flex flex-wrap px-6 pt-5 pb-24 md:py-24 text-white md:text-center">
          <div class="w-full text-center">
            <span class="text-6xl">Privacy Policy</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex my-8">
      <div class="w-full md:w-4/5 mx-auto min-h-screen px-4">
        <p class="mb-4">This Privacy Policy ("Policy") will help you understand how OurLeaders.Africa uses and protects the data you provide to us when you visit and use the website.</p>
        <p class="mb-4">By continuing to use our Website, you acknowledge that you have reviewed the privacy policy and agreed to its terms. That also means that you have consented to the use of your personal data and has accepted the applicable disclosures.</p>
        <p class="mb-4">We reserve the right to change this policy at any given time, of which you will be promptly updated. If you want to make sure that you are up to date with the latest changes, we advise you to frequently visit this page.</p>
        <ul class="our-list">
          <li class="item">
            <span class="header">What User Data We Collect</span>
            <div class="content">
              <p>When you visit the website, we may collect the following data:</p>
              <ul class="inner-list list-disc pl-10">
                <li>Your IP address.</li>
                <li>Your Name, Email address and mobile phone numbers.</li>
                <li>Other information such as your gender.</li>
                <li>Data profile regarding your online behavior on our website.</li>
              </ul>
            </div>
          </li>
          <li class="item">
            <span class="header">Why We Collect Your Data</span>
            <div class="content">
              <p>We are collecting your data for several reasons:</p>
              <ul class="inner-list list-disc pl-10">
                <li>To verify your identity and avoid bots and spam on the platform.</li>
                <li>To better understand your needs.</li>
                <li>To improve our services.</li>
                <li>To contact you when necessary, based on your preference.</li>
                <li>To contact you to participate in research.</li>
                <li>To customize our website according to your online behaviour and personal preferences.</li>
              </ul>
            </div>
          </li>
          <li class="item">
            <span class="header">Safeguarding and Securing the Data</span>
            <div class="content">
              <p>OurLeaders.Africa is committed to securing your data and keeping it confidential. OurLeaders.Africa has done all in its power to prevent data theft, unauthorized access, and disclosure by implementing the latest technologies and software, which help us safeguard all the information we collect online.</p>
            </div>
          </li>
          <li class="item">
            <span class="header">Our Cookie Policy</span>
            <div class="content">
              <p>Once you agree to allow our website to use cookies, you also agree to use the data it collects regarding your online behaviour (analyze web traffic, web pages you spend the most time on, and websites you visit.).</p>
              <p>The data we collect by using cookies is used to customize our website to your needs. After we use the data for statistical analysis, the data is completely removed from our systems.</p>
              <p>Please note that cookies don't allow us to gain control of your computer in any way. They are strictly used to monitor which pages you find useful and which you do not so that we can provide a better experience for you.</p>
              <p>If you want to disable cookies, you can do it by accessing the settings of your internet browser.</p>
              <ul class="inner-list list-disc pl-10">
                <li><a href="https://support.google.com/accounts/answer/61416?co=GENIE.Platform%3DDesktop&hl=en" target="_blank">How to disabled on Chrome.</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank">How to disabled on Safari.</a></li>
                <li><a href="https://support.mozilla.org/ro/kb/disable-third-party-cookies" target="_blank">How to disabled on Firefox.</a></li>
                <li><a href="https://support.microsoft.com/en-us/help/4468242/microsoft-edge-browsing-data-and-privacy" target="_blank">How to disabled on Edge.</a></li>
              </ul>
            </div>
          </li>
          <li class="item">
            <span class="header">Links to Other Websites</span>
            <div class="content">
              <p>Our website contains links that lead to other websites. If you click on these links, OurLeaders.Africa is not held responsible for your data and privacy protection. Visiting those websites is not governed by this privacy policy agreement. Make sure to read the privacy policy documentation of the website you go to from our website.</p>
            </div>
          </li>
          <li class="item">
            <span class="header">Restricting the Collection of your Personal Data</span>
            <div class="content">
              <p>At some point, you might wish to restrict the use and collection of your personal data. You can achieve this by doing the following:</p>
              <ul class="inner-list list-disc pl-10">
                <li>When you are filling the forms on the website, make sure to check if there is a box which you can leave unchecked, if you don't want to disclose your personal information.</li>
                <li>If you have already agreed to share your information with us, feel free to contact us via email and we will be more than happy to change this for you.</li>
                <li>OurLeaders.Africa will not sell or distribute your personal information to any third parties. We might do so if the law forces us, given reasonable clause and upon your permission to do so. Your personal information will be used when we need to send you promotional materials if you agree to this privacy policy.</li>
              </ul>
            </div>
          </li>
          <li class="item">
            <span class="header">Contact Information</span>
            <div class="content">
              <p>If you have any questions regarding this privacy policy or the personal data we collect or if you want to make any comments or complaints about anything related to this privacy policy, please contact us at the following email address (<a class="text-primary" href="mailto:thepeople@ourleaders.africa">thepeople@ourleaders.africa</a>).</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
  .our-list {
    .item {
      margin-bottom: 30px;

      .header {
        display: block;
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 20px;

        &::after {
          border-bottom: 1px solid theme('colors.primary');
          content: '';
          display: block;
          width: 10%;
        }
      }

      .content {
        line-height: 1.5rem;

        &::first-letter {
          color: theme('colors.primary');
          font-size: 1.7rem;
        }

        .inner-list {
          margin-bottom: 10px;

          li {
            line-height: 1.9rem;
          }
        }
      }
    }
  }
</style>
