import http from '@/utils/http';

export function getList(search) {
  console.log("search" , search)
  return http.get('/api/system/dictionary/list',{
      params: search
  })
}

export function create(data) {
    return http.post('/api/system/dictionary/list',{
        data
    })
}