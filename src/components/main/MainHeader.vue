<template>
  <header class="header header-main" :class="calcClassName">
    <div class="header-wrap">
      <router-link to="/" class="logo">
        <ZulyLogoSVG class="logo-svg" viewBox="0 0 66 20" />
      </router-link>
      <nav class="global-navigation">
        <ul>
          <li v-if="isAuthenticated">
            <router-link to="/closet/tomorrow" class="menu-title">
              나만의 옷장
            </router-link>
          </li>
          <li>
            <router-link v-if="!isAuthenticated" to="/login">
              로그인
            </router-link>
            <span v-else @click="clickLogout"> 로그아웃 </span>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import ZulyLogoSVG from '@/assets/img/logo.svg?inline';
import HeaderMixin from '@/library/mixins/Header';

export default {
  name: 'zuly-header',
  data() {
    return {};
  },
  mixins: [HeaderMixin],
  components: {
    ZulyLogoSVG
  },
  computed: {
    calcClassName() {
      if (this.isAuthenticated) {
        return 'is-login';
      } else {
        return '';
      }
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
// Mobile
.header {
  // 안에 있는 컨텐츠의 가운데 정렬
  display: flex;
  justify-content: center;
  .header-wrap {
    width: 100%;
    display: flex;
    // 가운데 정렬
    justify-content: space-between;
    align-items: center;
    padding: 21px 18px;
  }
  .logo {
    .logo-svg {
      width: 66px;
      height: 20px;
      /deep/ path {
        fill: $color-primary;
      }
    }
  }
  .global-navigation {
    // 네비게이션 왼쪽 정렬
    margin-left: auto;
    font-size: 0;
    li {
      @include fontSize(15px);
      line-height: 1;
      display: inline-block;
      margin-right: 20px;
      position: relative;
      cursor: pointer;
      vertical-align: top;
      &:last-child {
        margin-right: 0;
      }
      &:not(:last-child):after {
        display: block;
        content: '';
        width: 3px;
        height: 3px;
        position: absolute;
        top: 50%;
        right: -13px;
        transform: translateY(-50%);
        background-color: #797979;
        overflow: hidden;
        border-radius: 2px;
      }
    }
  }

  &.header-main {
    // main 기본값 + 비 로그인 상태일때
    position: absolute;
    width: 100%;
    z-index: 10;
    .header-wrap {
      display: none;
    }
    .logo {
      .logo-svg {
        /deep/ path {
          fill: #fff;
        }
      }
    }
    .global-navigation {
      display: none;
      color: #fff;
      li {
        &:not(:last-child):after {
          background-color: #fff;
        }
      }
    }
    // 로그인 상태 일때
    &.is-login {
      .header-wrap {
        display: flex;
      }
      .global-navigation {
        display: block;
      }
    }
  }
  &.join {
    .global-navigation {
      display: none;
    }
  }
}

@media (min-width: 768px) {
  .header {
    border-bottom: 1px solid #dadada;
    .header-wrap {
      width: 708px;
      padding-left: 0;
      padding-right: 0;
      padding-top: 18px;
      padding-bottom: 15px;
    }
    .global-navigation {
      margin-top: 0;
      li {
        margin-right: 26px;
        &:not(:last-child):after {
        }
      }
    }
    &.header-main {
      border: 0;
      .header-wrap {
        width: 100%;
        padding-left: 45px;
        padding-right: 45px;
        display: flex;
      }
      &.is-login {
        .header-wrap {
          display: flex;
        }
      }
    }
    &.closet {
      border-bottom: 0;
    }
  }
}
@media (min-width: 1080px) {
  .header {
    .header-wrap {
      width: 1080px;
      padding-top: 25px;
      padding-bottom: 20px;
    }
    .logo {
      .logo-svg {
        width: 85px;
        height: 25px;
      }
    }
    .global-navigation {
      li {
        @include fontSize(17px);
        line-height: 25px;
      }
    }
    &.header-main {
      .header-wrap {
        width: 1080px;
        padding-top: 35px;
        padding-left: 0;
        padding-right: 0;
      }
    }
  }
}
</style>
