import service from '@/utils/request';

export function fetchCategory({}) {
  return service.get(`/api/subject/category`);
}
export function fetchTodos() {
  return service.get(`/api/todos`);
}
export function posts(body: any) {
  return service.post(`/rent/doubanList`, body);
}
export function fetchLike(body: any) {
  return service.post(`/rent/douban/likes`, body);
}
export function fetchGroup(body: any) {
  return service.get(`/rent/doubanGroup`, body);
}
export function update({ id, data }: any) {
  console.log(id, data);
  return service.put(`/rent/douban/${id}`, data);
}
