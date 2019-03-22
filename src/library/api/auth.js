import Http from '@/library/HTTP';

export default {
  PostJoin(data) {
    return Http.post(`/auth/join`, data, { withCredentials: true });
  },
  PostLogin(data) {
    return Http.post(`/auth/login`, data, { withCredentials: true });
  },
  PostLogout() {
    return Http.post(`/auth/logout`, { withCredentials: true });
  },
  PostPhone(data) {
    return Http.post('/auth/phone', data);
  },
  PatchPhone(data) {
    return Http.patch('/auth/phone', data);
  }
};
