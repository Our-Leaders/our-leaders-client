<template>
  <div class="overflow-x-hidden">
    <!-- Header -->
    <div class="flex flex-wrap mb-4 relative">
      <div class="w-full md:w-4/5 relative mx-auto h-auto bg-primary bg-overlay-header">
        <div id="main-header" class="flex flex-wrap px-6 pt-5 pb-24 md:py-24 text-white md:text-center">
          <div class="w-full text-center">
            <span class="text-6xl">Terms &amp; Conditions</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex my-8">
      <div class="w-full md:w-4/5 mx-auto min-h-screen px-4">
        <ul class="our-list">
          <li class="item">
            <span class="header">Introduction</span>
            <div class="content">
              <p>These Website Standard Terms and Conditions written on this webpage shall manage your use of our website (OurLeaders.Africa).</p>
              <p>These Terms will be applied fully and affect your use of this Website. By using this Website, you agree to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions.</p>
            </div>
          </li>
          <li class="item">
            <span class="header">Intellectual Property Rights</span>
            <div class="content">
              <p>Other than the content you own, under these Terms, Olubrain Leadership Foundation and/or its licensors own all the intellectual property rights and materials contained in this Website.</p>
              <p>You are granted limited license only for purposes of viewing the material contained on this Website.</p>
            </div>
          </li>
          <li class="item">
            <span class="header">Restrictions</span>
            <div class="content">
              <p>You are specifically restricted from all of the following:</p>
              <ul class="inner-list list-disc pl-10">
                <li>Selling, sublicensing and/or otherwise commercializing any Website material;</li>
                <li>Using this Website in any way that is or may be damaging to this Website;</li>
                <li>Using this Website in any way that impacts user access to this Website;</li>
                <li>Using this Website contrary to applicable laws and regulations, or in any way that may cause harm to the Website, or to any person or business entity;</li>
                <li>Engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</li>
                <li>Using this Website to engage in any advertising or marketing.</li>
              </ul>
              <p>Certain areas of this Website are restricted from being accessed by you and Olubrain Leadership Foundation may further restrict access by you to any areas of this Website, at any time, in absolute discretion. Any user ID and password you may have for this Website are confidential and you must maintain confidentiality as well.</p>
            </div>
          </li>
          <li class="item">
            <span class="header">No warranties</span>
            <div class="content">
              <p>This Website is provided "as is," with all faults, and Olubrain Leadership Foundation express no representations or warranties of any kind related to this Website or the materials contained on this Website.</p>
            </div>
          </li>
          <li class="item">
            <span class="header">Limitation of liability</span>
            <div class="content">
              <p>In no event shall Olubrain Leadership Foundation, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Olubrain Leadership Foundation, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>
            </div>
          </li>
          <li class="item">
            <span class="header">Indemnification</span>
            <div class="content">
              <p>You hereby indemnify to the fullest extent Olubrain Leadership Foundation from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.</p>
            </div>
          </li>
          <li class="item">
            <span class="header">Severability</span>
            <div class="content">
              <p>If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.</p>
            </div>
          </li>
          <li class="item">
            <span class="header">Variation of Terms</span>
            <div class="content">
              <p>Olubrain Leadership Foundation is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.</p>
            </div>
          </li>
          <li class="item">
            <span class="header">Assignment</span>
            <div class="content">
              <p>Olubrain Leadership Foundation is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.</p>
            </div>
          </li>
          <li class="item">
            <span class="header">Entire Agreement</span>
            <div class="content">
              <p>These Terms constitute the entire agreement between Olubrain Leadership Foundation and you in relation to your use of this Website and supersede all prior agreements and understandings.</p>
            </div>
          </li>
          <li class="item">
            <span class="header">Governing Law &amp; Jurisdiction</span>
            <div class="content">
              <p>These Terms will be governed by and interpreted in accordance with the laws of the Federation of Nigeria, and you submit to the jurisdiction of the state and federal courts located in Nigeria for the resolution of any disputes.</p>
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
