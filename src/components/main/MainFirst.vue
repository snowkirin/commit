<template>
  <div class="contents">
    <div
      class="content"
      :class="{ 'is-login': isAuthenticated }"
    >
      <div class="banner-wrap" v-if="false">
        <div class="center-align">
          <p>지금 가입하시면 <span class="txt-free">첫달 무료 ♥</span></p>
        </div>
        <a href="#" class="btn-close" @click="clickBannerHide">
          <CloseIconSVG />
        </a>
      </div>

      <div class="center-align">
        <div class="content-inner">
          <div class="logo-wrap" v-if="!isAuthenticated && this.$mq === 'sm'">
            <ZulyLogoSVG class="logo-svg" />
          </div>
          <div class="text-wrap">
            <div class="slogan-wrap">
              <p>Save money</p>
              <p>Save time</p>
              <p>Save the space</p>
            </div>
            <div class="phrases-wrap"><p>데일리룩 구독 서비스 줄라이</p></div>
            <div class="link-wrap" v-if="!isAuthenticated">
              <div class="center-align">
                <div class="grid-flex">
                  <div class="column">
                    <router-link to="/login" class="link link-login"
                      >로그인</router-link
                    >
                  </div>
                  <div class="column not-mobile">
                    <router-link to="/join" class="link link-sign-up"
                      >회원가입</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="arrow-wrap"><ArrowIconSVG /></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import vhCheck from 'vh-check';
import CloseIconSVG from '@/assets/img/main/btn_close.svg?inline';
import ZulyLogoSVG from '@/assets/img/logo.svg?inline';
import ArrowIconSVG from '@/assets/img/main/btn_arrow.svg?inline';

export default {
  name: 'MainFirst',
  components: {
    CloseIconSVG,
    ZulyLogoSVG,
    ArrowIconSVG
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'common/isAuthenticated',
    })
  },
  methods: {
    ...mapActions({
    }),
    clickBannerHide(event) {
    }
  },
  created() {
    if (this.isAuthenticated) {
    }
  },
  mounted() {
    vhCheck();
  }
};
</script>

<style lang="scss" scoped>
.not-mobile {
  display: none;
}
.btn-sticky {
  width: 100% !important;
  left: 0;
  z-index: 100;
  bottom: 0;
  top: auto !important;
}
.content {
  height: 100vh;
  /*height: calc(var(--vh, 1vh) * 100);*/
  height: calc(100vh - var(--vh-offset, 0px));
  background: url('~@/assets/img/main/img_main_small.png') no-repeat 50% 50%;
  background-size: cover;
  position: relative;
}
.banner-wrap {
  @include fontSize(12px);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  height: 40px;
  background-image: linear-gradient(97deg, #f5e3c7, #d0ebcb);
  width: 100%;
  .txt-free {
    color: $color-pink-main;
    font-weight: 700;
  }
  .btn-close {
    position: absolute;
    right: 13px;
    top: 13px;
    line-height: 1;
  }
}
.content-inner {
  max-width: 100%;
  flex: 0 0 100%;
  padding: 10px 25px 0 25px;
}
.logo-wrap {
  text-align: center;
  margin-bottom: 9%;
  .logo-svg {
    width: 66px;
    height: 20px;
    /deep/ path {
      fill: #fff;
    }
  }
}

.slogan-wrap {
  text-align: center;
  font-family: 'Cormorant', serif;
  font-size: 48px;
  line-height: 46px;
  color: #f5e3c7;
}
.phrases-wrap {
  @include fontSize(18px);
  color: #fff;
  text-align: center;
  margin-top: 5.541%;
  margin-bottom: 15%;
}
.link-wrap {
  .grid-flex {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .column {
    &:nth-child(1) {
      margin-bottom: 10px;
    }
  }
  .link {
    @include fontSize(15px);
    line-height: 56px;
    display: block;
    height: 56px;
    width: 100%;
    text-align: center;
    color: #fff;
  }
  .link-login {
    background-color: #d05a68;
  }
  .link-sign-up {
    background-color: $color-primary;
  }
}
.arrow-wrap {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  animation-name: arrow;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-play-state: running;
}

@keyframes arrow {
  0% {
    bottom: 2%;
  }
  75% {
    bottom: 3%;
  }
  100% {
    bottom: 2%;
  }
}
@-webkit-keyframes arrow {
  0% {
    bottom: 2%;
  }
  75% {
    bottom: 3%;
  }
  100% {
    bottom: 2%;
  }
}

@media (min-width: 768px) {
  .only-mobile {
    display: none;
  }
  .not-mobile {
    display: block;
  }

  .content {
    background-image: url('~@/assets/img/main/img_main_large.png');
    height: 630px;
  }
  .banner-wrap {
    @include fontSize(13px);
  }
  /* 768px 부터 Header */
  .logo-wrap {
    display: none;
  }
  .arrow-wrap {
    display: none;
  }
  .text-wrap {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .slogan-wrap {
    font-size: 70px;
    line-height: 64px;
    margin-bottom: 60px;
  }
  .phrases-wrap {
    @include fontSize(26px);
    order: -1;
    margin-top: 20px;
    margin-bottom: 16px;
    font-weight: 100;
  }
  .link-wrap {
    .grid-flex {
      flex: 0 0 530px;
      max-width: 530px;
    }
    .column {
      &:nth-child(1) {
        margin-right: 10px;
        margin-bottom: 0;
      }
    }
  }
}

// 로그인 상태일때
.content {
  &.is-login {
    .phrases-wrap {
      margin-bottom: 0;
      @media (min-width: 768px) {
        margin-bottom: 16px;
      }
    }
    .slogan-wrap {
      @media (min-width: 768px) {
        margin-bottom: 0;
      }
    }
  }
}
</style>
