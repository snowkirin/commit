import Http from '@/library/HTTP';

export default {
  GetMembership(data = 1) {
    return Http.get(`/payment/membership`, {
      params: {
        id: data
      }
    });
  },
};
