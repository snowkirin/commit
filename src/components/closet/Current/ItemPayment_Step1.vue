<template>
  <div class="step1">
    <!-- Mobile -->
    <div class="mobile" v-if="$mq === 'sm'">
      <div class="list">
        <div
          v-for="(item, idx) in data.result.products"
          :key="idx"
          v-if="item.id !== null"
          class="item"
        >
          <div class="left-side">
            <div class="image">
              <img
                :src="$common.IMAGEURL() + item.image.path"
                @click="emitProductDetails(item.barcode)"
              />
            </div>
          </div>
          <div class="right-side">
            <div>
              <p class="txt-name">{{ item.name }}</p>
              <p class="txt-brand">{{ item.brand_kor_name }}</p>
            </div>
            <div v-if="item.is_sellable">
              <p class="txt-price">
                <span class="desc">구매 가격:</span>
                <span class="amount">{{
                  _.parseInt(item.sale_price) | currency('', 0)
                }}</span>
                <span class="unit">원</span>
              </p>
              <p class="txt-notice">
                (구매 시 다음 달 구독 요금 {{productCalc.length === 1 ? '40%': '20%'}} 할인)
              </p>
            </div>
            <div class="button-wrap" v-if="item.is_sellable">
              <button
                class="btn btn-primary h-40"
                type="button"
                @click="selectProduct(idx)"
              >
                이용 중인 상품 구매 
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <p class="txt-link" @click="showTooltip"
          >이용 중 상품 구매란?</p
        >
        <button
          type="button"
          class="btn btn-primary h-50"
          v-if="this.productCalc.sellable >= 2"
          @click="selectProduct"
        >
          {{ this.productCalc.sellable }}개 상품 모두 구매
        </button>
      </div>
    </div>
    <!-- Desktop -->
    <div class="desktop" v-else>
      <div class="payment-table">
        <table>
          <colgroup>
            <col width="*" />
            <col width="26.48148148148148%" />
            <col width="170" />
          </colgroup>
          <thead>
            <tr>
              <th>상품 정보</th>
              <th>구매 가격</th>
              <th>구매</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, idx) in data.result.products"
              :key="idx"
              v-if="item.id !== null"
            >
              <td>
                <div class="product-info">
                  <div class="left-side">
                    <div class="image">
                      <img
                        :src="$common.IMAGEURL() + item.image.path"
                        @error="imageNotExist"
                        @click="emitProductDetails(item.barcode)"
                      />
                    </div>
                  </div>
                  <div class="right-side">
                    <div>
                      <p class="txt-name">{{ item.name }}</p>
                      <p class="txt-brand">{{ item.brand_kor_name }}</p>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div v-if="item.is_sellable">
                  <p class="txt-price" >
                  <span class="amount">{{
                    _.parseInt(item.sale_price) | currency('', 0)
                  }}</span
                  ><span class="unit">원</span>
                  </p>
                  <p class="txt-notice">
                    (구매 시 다음 달 구독 요금 {{productCalc.length === 1 ? '40%': '20%'}} 할인)
                  </p>
                </div>
              </td>
              <td>
                <div v-if="item.is_sellable">
                  <button
                    class="btn btn-primary h-40"
                    type="button"
                    @click="selectProduct(idx)"
                  >
                    이용 중인 상품 구매
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="footer">
        <p class="txt-link" @click="showTooltip"
          >이용 중 상품 구매란?</p
        >
        <button
          type="button"
          class="btn btn-primary h-50"
          @click="selectProduct"
          v-if="this.productCalc.sellable >= 2"
        >
          {{ this.productCalc.sellable }}개 상품 모두 구매
        </button>
      </div>
    </div>
    <template v-if="tooltipToggle">
      <div class="tooltip" :style="tooltipStyle">
        <p class="tooltip-title">이용 중 상품 구매란?</p>
        <p class="tooltip-content">
          현재 고객님께서 이용 중인 옷을 반납하지 않고 소유하실 수 있도록 상품
          금액을 결제하는 과정입니다. 상품 구매 가격은 이용 중인 상품의 상태에
          따라 정상 구매 가격보다 할인된 가격으로 개별 책정되어 있습니다.
        </p>

        <div class="modal-close">
          <a class="btn-close" @click="hideTooltip">
            <span class="icon-close"></span>
          </a>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ItemPayment_Step1',
  props: {
    data: Object
  },
  data() {
    return {
      tooltipToggle: false,
      tooltipStyle: {
        left: 0,
        top: 0
      },
    };
  },
  computed: {
    productCalc() {
      return this.calcProduct();
    }
  },
  methods: {
    changeSequence() {
      this.$emit('sequence', 'step2');
    },
    imageNotExist(event) {
      console.log(event);
      event.target.src = this.$common.DEFAULT_IMAGE();
    },

    calcProduct() {
      const product = {
        sellable: 0,
        length: 0
      };
      _.forEach(this.data.result.products, value => {
        if (value.barcode !== null) {
          product.length++;
          if (value.is_sellable) {
            product.sellable++;
          }
        }
      });
      return product;
    },
    selectProduct(param) {
      // 상품을 선택했을때
      const productsInfo = this.calcProduct();
      let productsInfoData = {
        products: [],
        info: {}
      };
      productsInfoData.info = {
        sale_rate: productsInfo.length === 1 ? 40 : 20
      };
      if (_.isNumber(param)) {
        productsInfoData.products.push(this.data.result.products[param]);
        this.$emit('selectProduct', productsInfoData);
      } else {
        _.forEach(this.data.result.products, value => {
          if (value.is_sellable && value.product_id !== null) {
            productsInfoData.products.push(value);
          }
        });
        this.$emit('selectProduct', productsInfoData);
      }
      this.$emit('sequence', 'step2');
    },
    showTooltip(event) {
      event.preventDefault();
      const _target = event.target;

      if (this.$mq === 'sm') {
        //  Mobile
        this.tooltipStyle = {
          left: `${_target.offsetLeft}px`,
          top: `${_target.offsetTop + _target.offsetHeight}px`,
          width: `calc(100% - ${_target.offsetLeft * 2}px)`
        };
      } else {
        //  Tablet & Desktop
        this.tooltipStyle = {
          left: `${_target.offsetLeft + _target.offsetWidth + 11}px`,
          top: `${_target.offsetTop + _target.offsetHeight - 10}px`
        };
      }

      this.tooltipToggle = true;
    },
    hideTooltip() {
      this.tooltipToggle = false;
    },
    emitProductDetails(param) {
      this.$emit('productDetail', param);
    }
  },
  mounted() {
  }
};
</script>

<style scoped lang="scss">
.step1 {
  position: relative;
}
.mobile {
  .list {
    border: 2px solid #e9e9e9;
    padding: 17px;
    .item {
      display: flex;
      padding-top: 16px;
      padding-bottom: 15px;
      border-top: 1px solid #e9e9e9;
      &:first-child {
        padding-top: 0;
        border-top: 0;
      }
      &:last-child {
        padding-bottom: 0;
      }
      .left-side {
        @include small-mobile {
          flex: 0 0 85px;
        }
        flex: 0 0 108px;
        margin-right: 15px;
        img {
          width: 100%;
          /*height: 145px;*/
        }
      }
      .right-side {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .txt-name,
        .txt-brand {
          @include fontSize(14px);
        }
        .txt-name {
        }
        .txt-brand {
          color: #797979;
          margin-bottom: 7px;
        }
        .txt-price {
          .desc,
          .amount,
          .unit {
          }
          .desc {
            @include fontSize(14px);
          }

          .amount,
          .unit {
            font-weight: 700;
          }
          .amount {
            @include fontSize(17px, en);
            margin-left: 10px;
          }
          .unit {
            @include fontSize(17px);
          }
        }
        .txt-notice {
          @include fontSize(12px);
          color: #797979;
          margin-bottom: 9px;
        }
        .button-wrap {
          button {
            @include fontSize(14px);
            width: 140px;
          }
        }
      }
    }
  }
  .footer {
    @include clearfix;
    margin-top: 20px;
    .txt-link {
      @include fontSize(14px);
      display: inline-block;
    }
    button {
      width: 163px;
      float: right;
    }
  }
}
.desktop {
  .payment-table {
    border-top: 2px solid #3d3d35;
    table {
      table-layout: fixed;
      width: 100%;
    }
    th,
    td {
      border-bottom: 1px solid #e9e9e9;
      vertical-align: middle;
    }
    thead {
      th {
        @include fontSize(15px);
        font-weight: 700;
        text-align: center;
        height: 44px;
        vertical-align: middle;
        &:nth-child(2) {
        }
      }
    }
    tbody {
      td {
        padding-top: 20px;
        padding-bottom: 21px;
        &:nth-child(1) {
          padding-left: 30px;
        }
        &:nth-child(2) {
          text-align: center;
        }
        &:nth-child(3) {
          text-align: center;
          button {
            @include fontSize(14px);
            max-width: 140px;
          }
        }
      }
    }

    .txt-name {
      @include fontSize(15px);
    }
    .txt-brand {
      @include fontSize(14px);
      color: #797979;
    }
    .txt-price {
      font-weight: 700;
      .amount {
        @include fontSize(17px, en);
      }
      .unit {
        @include fontSize(17px);
      }
    }
    .txt-notice {
      @include fontSize(12px);
      color: #797979;
    }
    .product-info {
      display: flex;
      align-items: center;
    }
    .left-side,
    .right-side {
    }
    .left-side {
      margin-right: 13px;
      .image {
        img {
          /* Image Size Fix */
          width: 70px;
          height: 94px;
        }
      }
    }
    .right-side {
    }
  }
  .footer {
    @include clearfix;
    margin-top: 30px;
    .txt-link,
    button {
      display: inline-block;
    }
    .txt-link {
      @include fontSize(14px);
      display: inline-block;
    }
    button {
      float: right;
      width: 252px;
    }
  }
}

.tooltip {
  width: 410px;
  padding: 15px 10px 15px 20px;
  border: 1px solid #3d3d35;
  position: absolute;
  background-color: #fff;
  z-index: 9999;
  .tooltip-title {
    @include fontSize(15px);
    font-weight: 700;
  }
  .tooltip-content {
    @include fontSize(14px);
    margin-top: 15px;
  }

  .modal-close {
    position: absolute;
    top: 10px;
    right: 15px;
    overflow: hidden;
    z-index: 10;
    .btn-close {
      cursor: pointer;
      display: block;
      width: 30px;
      height: 30px;
    }
    .icon-close {
      display: block;
      width: 25px;
      height: 25px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      &::before,
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: #333;
        position: absolute;
        transform-origin: 50% 50%;
        top: 50%;
        left: 0;
      }
      &::before {
        transform: rotate(45deg);
      }
      &::after {
        transform: rotate(-45deg);
      }
    }
  }
}
</style>
