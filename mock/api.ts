import fetch from 'node-fetch';
export default {
  // 支持值为 Object 和 Array
  'GET /api/todos': async (req: any, res: any) => {
    // 添加跨域请求头
    const data = await fetch('http://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch(error => {
        console.error(error);
      });
    res.json(data);
  },
  // GET 可忽略
  '/api/users/1': { id: 1 },
  // 支持自定义函数，API 参考 express@4
  'GET /api/usersInfo': async (req: any, res: any) => {
    // 添加跨域请求头
    console.log(req.body, req.params, req.query);
    const data = await fetch(
      `http://jsonplaceholder.typicode.com/users/${req.query.id}`,
    )
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch(error => {
        console.error(error);
      });
    res.json(data);
  },
};
