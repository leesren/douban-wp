import service from '@/utils/request';

export function fetchUser(id = 1) {
  return service.post(`/rent/auth/login`, {
    username: '1',
    password: '1',
  });
}
