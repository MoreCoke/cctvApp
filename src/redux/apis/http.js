const host = 'https://tdx.transportdata.tw';

const http = {
  get: (path, params, header) => {
    const headers = new Headers({
      accept: 'application/json',
      ...header,
    });
    let searchParams = params
      ? `?${new URLSearchParams(params).toString()}`
      : '';
    return fetch(`${host}/${path}${searchParams}`, {
      method: 'GET',
      headers,
    });
  },
  post: (path, params, header) => {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      ...header,
    });
    const body = new URLSearchParams(params);
    return fetch(`${host}/${path}`, {
      method: 'POST',
      headers,
      body,
    });
  },
  // TODO
  put: () => {},
  // TODO
  delete: () => {},
};

export default http;
