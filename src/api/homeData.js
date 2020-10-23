import service from '@/utils/user_request.js'

export function MemberAmount (data) {
  return service.request({
    method: 'get',
    url: '/getMemberAmount',
    params: {
      key: data,
    },
  })
}