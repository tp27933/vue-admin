import service from '@/utils/user_request.js';

export function Deposit(data) {
  return service.request({
    method: 'post',
    url: '/deposit',
    params: {
      key: data
    }
  });
}

export function Withdraw(data) {
  return service.request({
    method: 'post',
    url: '/withdraw',
    params: {
      key: data
    }
  });
}

export function GETPROFILE(data) {
  return service.request({
    method: 'get',
    url: '/getprofile',
    responseType: 'arraybuffer',
    params: {
      id: data
    }
  });
}
export function Search(data) {
  return service.request({
    method: 'post',
    url: '/search',
    params: {
      key: data
    }
  });
}

export function Signup(data, pic) {
  return service.request({
    method: 'post',
    url: '/signup',
    data: pic,
    params: data
  });
}

export function PersonalHistory(data) {
  return service.request({
    method: 'get',
    url: '/personalHistory',
    params: {
      key: data
    }
  });
}

export function UsersHistory(data) {
  return service.request({
    method: 'get',
    url: '/usersHistory',
    params: {
      key: data
    }
  });
}

export function UpdataUserData(data) {
  return service.request({
    method: 'post',
    url: '/updataUserData',
    params: {
      key: data
    }
  });
}
