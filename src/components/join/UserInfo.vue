<template>
  <div class="contents">
    <div class="contents-header"><h3>회원 정보 및 약관 동의</h3></div>
    <form name="joinForm">
      <div class="content">
        <div class="grid-flex">
          <!-- Left Side -->
          <div class="column column-left">
            <!-- 사용자 계정 -->
            <div class="row user-account">
              <div class="form-title-wrap">
                <p class="txt-form-title">사용자 계정</p>
              </div>
              <div>
                <div class="form-row">
                  <div
                    class="text-field"
                    :class="{ 'text-field-error': errors.has('name') }"
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="이름"
                      autocomplete="name"
                      maxlength="15"
                      v-validate="'required'"
                      v-model="userInfoData.name"
                    />
                  </div>
                  <p v-if="errors.has('name')" class="txt-error">
                    이름을 입력해주세요.
                  </p>
                </div>
                <div class="form-row">
                  <div
                    :class="{ 'text-field-error': errors.has('email') }"
                    class="text-field"
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="이메일"
                      autocomplete="email"
                      maxlength="50"
                      v-validate="'required|email'"
                      v-model="userInfoData.email"
                    />
                  </div>
                  <p class="txt-error" v-if="errors.has('email')">
                    이메일을 정확하게 입력해주세요.
                  </p>
                </div>
                <div class="form-row">
                  <div
                    :class="{ 'text-field-error': errors.has('password') }"
                    class="text-field"
                  >
                    <input
                      type="password"
                      name="password"
                      placeholder="비밀번호 8자리 이상의 영문,숫자,특수문자(!@#$%^&*) 포함"
                      autocomplete="new-password"
                      maxlength="256"
                      ref="password"
                      v-validate="{
                        required: true,
                        regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}/
                      }"
                      v-model="userInfoData.password"
                      @keyup="pwdCheck(errors.has('password'))"
                    />
                  </div>
                  <p class="txt-error" v-show="errors.has('password')">
                    {{ pwdMsg }}
                  </p>
                </div>
                <div class="form-row">
                  <div
                    class="text-field"
                    :class="{
                      'text-field-error': errors.has('passwordConfirm')
                    }"
                  >
                    <input
                      type="password"
                      name="passwordConfirm"
                      placeholder="비밀번호 확인"
                      autocomplete="new-password"
                      maxlength="256"
                      v-validate="'required|confirmed:password'"
                    />
                  </div>
                  <p class="txt-error" v-if="errors.has('passwordConfirm')">
                    비밀번호가 일치하지 않습니다.
                  </p>
                </div>
              </div>
            </div>
            <!-- 휴대폰 번호 -->
            <div class="row">
              <div class="form-title-wrap">
                <p class="txt-form-title">휴대폰 번호</p>
              </div>
              <div class="form-row">
                <div class="grid-flex grid-fixed">
                  <div
                    class="text-field column"
                    :class="{ 'text-field-error': errors.has('phone') }"
                  >
                    <input
                      type="tel"
                      name="phone"
                      placeholder="( - 없이 입력)"
                      autocomplete="tel-national"
                      maxlength="14"
                      v-validate="{
                        required: true,
                        regex: /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})/
                      }"
                      v-model="userInfoData.phone"
                    />
                  </div>
                  <div class="column w-31 o-2">
                    <button
                      type="button"
                      class="btn btn-secondary h-50"
                      id="phoneVerify"
                      @click="clickPhoneVerify"
                    >
                      인증
                    </button>
                  </div>
                </div>
                <p class="txt-error" v-if="errors.has('phone')">
                  휴대전화를 입력해주세요.
                </p>
              </div>
              <div v-show="phoneAuthData.showPhoneAuthArea" class="form-row">
                <div class="grid-flex grid-fixed">
                  <div class="column text-field">
                    <input
                      type="text"
                      name="phoneAuthNumber"
                      placeholder="인증번호"
                      autocomplete="tel-extension"
                      v-model="phoneAuthData.authNumber"
                    />
                  </div>
                  <div class="column w-31 o-2">
                    <button
                      type="button"
                      class="btn btn-secondary h-50"
                      id="authKeyConfirm"
                      @click="authKeyConfirm"
                    >
                      확인
                    </button>
                  </div>
                </div>
                <p class="txt-error" v-if="phoneAuthData.showPhoneAuthTimer">
                  {{ phoneAuthData.msgPhoneAuthTimer }}
                </p>
              </div>
            </div>
            <!-- 주소 -->
            <div class="row">
              <div class="form-title-wrap">
                <p class="txt-form-title">주소</p>
              </div>
              <div class="form-row">
                <div class="grid-flex grid-fixed">
                  <div
                    class="column text-field"
                    :class="{ 'text-field-error': errors.has('zipcode') }"
                  >
                    <input
                      type="text"
                      name="zipcode"
                      placeholder="우편번호"
                      autocomplete="postal-code"
                      readonly
                      v-validate="'required'"
                      v-model="userInfoData.zipcode"
                      @click="openPostCode"
                    />
                  </div>
                  <div class="column w-31 o-2">
                    <button
                      type="button"
                      class="btn btn-secondary h-50"
                      @click="openPostCode"
                    >
                      주소찾기
                    </button>
                  </div>
                </div>
                <p></p>
              </div>
              <div class="form-row" v-show="isPostCode">
                <div class="postcode-wrap" id="postCode"></div>
              </div>
              <div class="form-row">
                <div
                  class="text-field"
                  :class="{ 'text-field-error': errors.has('address') }"
                >
                  <input
                    type="text"
                    name="address"
                    placeholder="주소"
                    autocomplete="address-line1"
                    maxlength="30"
                    readonly
                    v-validate="'required'"
                    v-model="userInfoData.addr"
                    @click="openPostCode"
                  />
                </div>
                <p class="txt-error" v-if="errors.has('address')">
                  주소가 입력되지 않았습니다.
                </p>
              </div>
              <div class="form-row">
                <div
                  class="text-field"
                  :class="{ 'text-field-error': errors.has('detail_address') }"
                >
                  <input
                    type="text"
                    name="detail_address"
                    placeholder="상세주소"
                    autocomplete="address-line2"
                    maxlength="30"
                    ref="detailAddress"
                    v-validate="'required'"
                    v-model="userInfoData.addrDetail"
                  />
                </div>
                <p class="txt-error" v-if="errors.has('detail_address')">
                  상세주소가 입력되지 않았습니다.
                </p>
                <p class="txt-delivery">
                  ※ 현재 서울 전지역과 경기 일부 지역에 한하여 서비스를 제공하고
                  있습니다.
                  <a
                    href="/pdf/shipping_area.pdf"
                    target="_blank"
                    class="txt-link"
                    >(배송지역 보기)</a
                  >
                </p>
              </div>
            </div>
          </div>
          <!-- Right Side -->
          <div class="column column-right">
            <!-- 공동 현관 비밀번호 -->
            <div class="row">
              <div class="form-title-wrap">
                <p class="txt-form-title">공동 현관 비밀번호</p>
                <p class="txt-form-explain">
                  (문 앞까지 가기 전에 공동 현관이 있는 경우)
                </p>
              </div>
              <div>
                <div
                  class="text-field"
                  :class="{ 'text-field-error': errors.has('lobbyPassword') }"
                >
                  <input
                    type="text"
                    v-model="userInfoData.lobbyPassword"
                    class="form-input"
                    v-validate="'required'"
                    name="lobbyPassword"
                    placeholder="공용 현관이 없는 경우 없음을 입력해주세요."
                  />
                </div>
                <p class="txt-error" v-if="errors.has('lobbyPassword')">
                  공동 현관 비밀번호를 입력해 주세요.
                </p>
              </div>
            </div>
            <!-- 연령대 -->
            <div class="row">
              <FlexList
                title="연령대"
                :data="ageData"
                textExpress="text"
                @extractFunc="setAgeRange"
                extractData="code"
                :column="3"
                :height="50"
                :watchData="userInfoData.age"
              />
            </div>
            <!-- 기념일 -->
            <div class="row more-info">
              <div class="form-title-wrap">
                <p class="txt-form-title">[선택] 기념일</p>
              </div>
              <div class="form-row">
                <div
                  class="text-field"
                  :class="{ 'text-field-error': errors.has('ann') }"
                >
                  <input
                    type="text"
                    name="ann"
                    placeholder="예) 0803"
                    v-validate="{
                      regex: /(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])/
                    }"
                    v-model="userInfoData.ann"
                  />
                </div>
                <p class="txt-error" v-if="errors.has('ann')">
                  기념일을 정확히 입력해 주세요.
                </p>
              </div>
            </div>
            <!-- 체크박스 -->
            <div class="checkbox-wrap">
              <div class="custom-checkbox">
                <input
                  class="custom-control-input"
                  type="checkbox"
                  name="private_flag"
                  id="private_flag"
                />
                <label class="custom-control-label" for="private_flag">
                  개인정보의 수집 및 이용에 대한 동의
                </label>
                <a href="#" class="txt-link" @click="viewModal('private')"
                  >자세히보기</a
                >
              </div>
              <div class="custom-checkbox">
                <input
                  class="custom-control-input"
                  type="checkbox"
                  name="use_flag"
                  id="use_flag"
                />
                <label class="custom-control-label" for="use_flag">
                  이용약관
                </label>
                <a href="#" class="txt-link" @click="viewModal('use')"
                  >자세히보기</a
                >
              </div>
              <div class="custom-checkbox">
                <input
                  class="custom-control-input"
                  type="checkbox"
                  name="marketingFlag"
                  id="marketingFlag"
                />
                <label
                  class="custom-control-label"
                  @click="toggleMarketing"
                  for="marketingFlag"
                >
                  [선택] 마케팅 정보 수신 동의
                </label>
                <a
                  href="#"
                  class="txt-link"
                  @click="viewModal('marketing')"
                >
                  자세히보기
                </a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-complete">
        <button
          class="btn btn-primary h-56"
          type="button"
          @click="clickComplete"
        >
          다음(3/4)
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import CodesAPI from '@/library/api/codes';
import AuthAPI from '@/library/api/auth';
import CommonModal from '@/components/common/modal/CommonModal';
import FlexList from '@/components/common/FlexList';

export default {
  name: 'signUp-first',
  components: {
    CommonModal,
    FlexList
  },
  data() {
    return {
      pwdMsg: '비밀번호를 입력해주세요.',
      isPwd: false,
      phoneAuthData: {
        showPhoneAuthArea: false,
        showPhoneAuthTimer: false,
        msgPhoneAuthTimer: '',
        authId: null,
        authNumber: null,
        isPhoneAuthComplete: false
      },
      // 연령대 데이터 리스트
      ageData: [
        {
          text: '20대 초반',
          code: 16001
        },
        {
          text: '20대 중반',
          code: 16002
        },
        {
          text: '20대 후반',
          code: 16003
        },
        {
          text: '30대 초반',
          code: 16004
        },
        {
          text: '30대 중반',
          code: 16005
        },
        {
          text: '30대 후반',
          code: 16006
        },
        {
          text: '40대 초반',
          code: 16007
        },
        {
          text: '40대 중반',
          code: 16008
        },
        {
          text: '40대 후반',
          code: 16009
        }
      ],
      // 회원가입 정보
      userInfoData: {
        age: null,
        name: '',
        email: '',
        password: '',
        phone: '',
        ann: null,
        zipcode: '',
        addr: '',
        addrDetail: '',
        marketingAgree: 'N',
        lobbyPassword: null
      },
      resultPostCode: {}, // 주소 결과값,
      isPostCode: false,
      // 알럿창 옵션
      dialogOptions: {
        okText: '확인',
        customClass: 'zuly-alert',
        backdropClose: true
      }
    };
  },
  computed: {
    ...mapGetters({
      UserInfoForMembership: 'join/UserInfoForMembership'
    })
  },
  methods: {
    ...mapActions({
      ADD_USER_INFO_DATA: 'join/ADD_USER_INFO_DATA'
    }),
    openPostCode() {
      if (!this.isPostCode) {
        const daum = window.daum;
        daum.postcode.load(() => {
          new window.daum.Postcode({
            width: '100%',
            height: '498px',
            onresize: () => {},
            // onclose: state => {
            //   if (state === 'COMPLETE_CLOSE') {
            //   }
            // },
            oncomplete: async data => {
              const validZipCode = await CodesAPI.GetZipCodes(data.zonecode);
              if (!validZipCode.data.result) {
                this.$dialog.alert(
                  '입력하신 주소는 현재 서비스 지역이 아닙니다.',
                  this.dialogOptions
                );
              }
              this.completePostCode(data);
            }
          }).embed(document.getElementById('postCode'), {});
        });
        this.isPostCode = true;
      }
    },
    closePostCode() {
      this.isPostCode = false;
    },
    completePostCode(result) {
      if (result.userSelectedType === 'R') {
        //  도로명 주소
        this.userInfoData.addr = result.roadAddress;
      } else {
        //  지번 주소
        this.userInfoData.addr = result.jibunAddress;
      }
      this.userInfoData.zipcode = result.zonecode;
      this.$refs.detailAddress.focus();
      this.closePostCode();
    },
    viewModal(param) {
      if (param === 'private') {
        this.$refs.private.open();
      } else if (param === 'use') {
        this.$refs.use.open();
      } else if (param === 'marketing') {
        this.$refs.marketing.open();
      }
    },
    closeModal() {
      this.$refs.private.close();
      this.$refs.use.close();
      this.$refs.marketing.close();
    },
    pwdCheck(isBoolean) {
      const pwd = document.querySelector('input[name=password]');
      let checkBoolean = isBoolean;
      if (pwd.value === '') {
        if (!checkBoolean) checkBoolean = !checkBoolean;
        this.pwdMsg = '비밀번호를 입력해주세요.';
      } else {
        this.pwdMsg =
          '비밀번호 형식에 맞지 않습니다. 8자리 이상의 영문,숫자,특수문자(!@#$%^&*) 포함';
      }

      this.isPwd = !checkBoolean;
    },
    async clickPhoneVerify(event) {
      const joinForm = document.joinForm;
      const email = joinForm.email;
      const phone = joinForm.phone;
      const phoneAuthNumber = joinForm.phoneAuthNumber;
      // 이메일을 입력하지 않은 경우 알럿창을 띄움
      if (!this.userInfoData.email) {
        this.$dialog.alert('이메일을 입력해주세요.', this.dialogOptions);
        return;
      }
      if (!this.userInfoData.phone) {
        this.$dialog.alert('휴대폰 번호를 입력해주세요.', this.dialogOptions);
        return;
      }

      const emailValidator = await this.$validator.validate(
        'email',
        email.value
      );
      const phoneValidator = await this.$validator.validate(
        'phone',
        phone.value
      );

      if (emailValidator && phoneValidator) {
        const phoneData = {
          email: _.trim(this.userInfoData.email),
          phone: _.trim(this.userInfoData.phone)
        };
        const resultData = await AuthAPI.PostPhone(phoneData);
        if (resultData.data.result) {
          // 전달받은 authId 저장.
          this.phoneAuthData.authId = resultData.data.authId;

          this.phoneAuthData.showPhoneAuthArea = true;
          this.phoneAuthData.showPhoneAuthTimer = true;

          // 더이상 값을 바꿀 수 없게 ReadOnly 속성.
          phone.readOnly = true;
          // 중복 클릭 방지를 위한 버튼 Disabled 속성.
          event.target.disabled = true;

          this.startTimer();
          phoneAuthNumber.focus();
        } else {
          if (resultData.data.emailDuplicated) {
            this.$dialog.alert(
              '이미 등록된 이메일 주소입니다. 다시 확인해 주세요.',
              this.dialogOptions
            );
          } else if (resultData.data.phoneDuplicated) {
            this.$dialog.alert(
              '이미 등록된 휴대폰 번호입니다. 다시 확인해 주세요.',
              this.dialogOptions
            );
          }
        }
      } else {
        if (!emailValidator) {
          this.$dialog.alert(
            '올바른 이메일을 입력해주세요.',
            this.dialogOptions
          );
        } else if (!phoneValidator) {
          this.$dialog.alert(
            '올바른 휴대폰 번호를 입력해주세요.',
            this.dialogOptions
          );
        }
      }
    },
    async authKeyConfirm() {
      if (!this.phoneAuthData.authId) {
        this.$dialog.alert(
          '먼저 휴대폰 번호를 입력하고 인증버튼을 눌러주세요.',
          this.dialogOptions
        );
        return;
      }

      if (!this.phoneAuthData.authNumber) {
        this.$dialog.alert('인증번호를 입력해주세요.', this.dialogOptions);
        return;
      }

      const formData = {
        authId: this.phoneAuthData.authId,
        authNumber: this.phoneAuthData.authNumber
      };
      const resultData = await AuthAPI.PatchPhone(formData);

      if (resultData.data.result === 0) {
        // 결과값이 0이면 인증번호에 잘못된 값 입력한것
        this.$dialog.alert(
          '인증번호를 다시 확인하시고 진행해주세요.',
          this.dialogOptions
        );
      } else if (resultData.data.result >= 1) {
        // 결과값이 1이상이면 성공
        this.$dialog.alert('인증되었습니다.', this.dialogOptions);
        this.phoneAuthData.showPhoneAuthTimer = false;
        this.phoneAuthData.showPhoneAuthArea = false;
        // 폰인증 검증 완료
        this.phoneAuthData.isPhoneAuthComplete = true;
        clearInterval(window.interval);
      }
    },
    startTimer() {
      const timer =
        Date.parse(new Date(new Date().getTime() + 3 * 60 * 1000)) / 1000;
      let minutes;
      let seconds;

      if (window.interval) clearInterval(window.interval);

      const interval = setInterval(() => {
        const currentTime = Date.parse(new Date()) / 1000;
        const printTimer = timer - currentTime;

        minutes = parseInt(printTimer / 60, 10);
        seconds = parseInt(printTimer % 60, 10);

        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        this.phoneAuthData.msgPhoneAuthTimer = `메시지를 확인하시고 인증번호를 입력해주세요.  ${minutes}:${seconds}`;

        if (printTimer <= 0) {
          clearInterval(interval);
          this.$dialog.alert(
            '시간이 초과되었습니다. 다시 인증해주십시오.',
            this.dialogOptions
          );
          document.querySelector('#phoneVerify').disabled = false;
          this.phoneAuthData.showPhoneAuthTimer = false;
        }
      }, 1000);

      window.interval = interval;
    },
    setAgeRange(param) {
      this.userInfoData.age = param;
    },
    toggleMarketing() {
      const isChecked = document.joinForm.marketingFlag.checked;
      if (isChecked) {
        this.userInfoData.marketingAgree = 'N';
      } else {
        this.userInfoData.marketingAgree = 'Y';
      }
    },
    clickComplete() {
      const joinForm = document.joinForm;
      this.$validator.validateAll().then(result => {
        if (result) {
          const privateFlag = joinForm.private_flag.checked;
          const useFlag = joinForm.use_flag.checked;
          if (!this.phoneAuthData.isPhoneAuthComplete) {
            this.$dialog.alert(
              '휴대전화 인증을 진행해주세요.',
              this.dialogOptions
            );
            return;
          }
          if (!this.userInfoData.age) {
            this.$dialog.alert('연령대를 선택해 주세요.', this.dialogOptions);
            return;
          }
          if (!privateFlag) {
            this.$dialog.alert(
              '개인정보의 수집 및 이용에 동의해주세요.',
              this.dialogOptions
            );
            return;
          }
          if (!useFlag) {
            this.$dialog.alert('이용약관을 확인해주세요.', this.dialogOptions);
            return;
          }
          if (!_.isEmpty(this.userInfoData.ann)) {
            // mmdd 형식의 정규식.
            const dateExp = /(0\d{1}|1[0-2])([0-2]\d{1}|3[0-1])/;

            if (dateExp.test(this.userInfoData.ann)) {
              const dateResult = this.userInfoData.ann;
              const monthResult = dateResult.substring(0, 2);
              const dayResult = dateResult.substring(2);
              this.userInfoData.ann = monthResult + '.' + dayResult;
            } else {
              this.$dialog.alert('기념일을 확인해주세요.', this.dialogOptions);
              return;
            }
          }
          this.ADD_USER_INFO_DATA({ ...this.userInfoData });
          this.$router.push({
            path: '/join/payment-info'
          });
        } else {
          document
            .querySelectorAll('.text-field-error input')[0]
            .setAttribute('tabindex', -1);
          document.querySelectorAll('.text-field-error input')[0].focus();
          document
            .querySelectorAll('.text-field-error input')[0]
            .setAttribute('tabindex', null);
        }
      });
    }
  },
  created() {
    // 기존에 입력하던 유저 정보가 있다면 그 값을 넣어준다.
    if (!_.isEmpty(this.UserInfoForMembership)) {
      const convertData = _.assign(this.UserInfoForMembership, {
        ann:
          this.UserInfoForMembership.ann.substring(0, 2) +
          this.UserInfoForMembership.ann.substring(3)
      });
      this.userInfoData = { ...convertData };
    }
    // POSTCODE
    const htmlScript = document.createElement('script');
    htmlScript.setAttribute(
      'src',
      'https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false'
    );
    document.head.appendChild(htmlScript);
    clearInterval(window.interval);
  },
  destroy() {
    clearInterval(window.interval);
  }
};
</script>

<style scoped lang="scss" src="@/assets/css/join-style.scss"></style>
<style scoped lang="scss">
.contents {
  .content {
    .column {
      // Left
      .row {
        margin-top: 30px;
      }
      &.column-left {
        .row {
          &:first-child {
            margin-top: 0;
          }
        }
      }

      .custom-checkbox {
        margin-bottom: 8px;
      }
    }
  }
}
.txt-delivery {
  @include fontSize(14px);
  color: $color-secondary;
  margin-top: 10px;
}
.form-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}

.checkbox-wrap {
  margin-top: 10px;
}

.postcode-wrap {
  border: 1px solid $color-primary;
  max-height: 500px;
  -webkit-overflow-scrolling: touch;
}

@media (min-width: 768px) {
  .contents {
    padding-left: 0;
    padding-right: 0;
    .content {
      .column {
        &.column-right {
          .row {
            &:first-child {
              margin-top: 0;
            }
          }
        }
      }
    }
  }
}
</style>
