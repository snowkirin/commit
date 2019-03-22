import Http from '@/library/HTTP';

export default {
  GetStyleType() {
    return Http.get('/member/styletype');
  },
  PostAddInfo(data) {
    return Http.post(`/member/style`, data, {
      withCredentials: true
    });
  },
  PostImages(data) {
    return Http.post('/member/images', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    });
  },
  GetStyleInfo() {
    return Http.get('/member/style', {
      withCredentials: true
    });
  },
  PatchStyleInfo(data) {
    return Http.patch('/member/style', data, {
      withCredentials: true
    });
  },
  PostCancel(data) {
    return Http.post('/member/cancel', data, {
      withCredentials: true
    });
  },

  GetMyPage() {
    return Http.get('/member/mypage', {
      withCredentials: true
    });
  }
};
