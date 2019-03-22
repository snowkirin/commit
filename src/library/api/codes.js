import Http from '@/library/HTTP';

export default {
  /*
  * 사이즈 목록 가져오기
  * */
  GetSizes() {
    return Http.get(`/code/customer/sizes`);
  },
  /*
  * 연령대 목록 가져오기
  * */
  GetAges() {
    return Http.get(`/code/customer/ages`);
  },
  /*
  * 고객 추가 정보 목록 가져오기
  * */
  GetOptions() {
    return Http.get(`/code/customer/options`);
  },
  /*
  * 주소 검증
  * */
  GetZipCodes(data) {
    return Http.get(`/code/address/zipcodes`, {
      params: {
        zipcode: data
      }
    });
  },
};
