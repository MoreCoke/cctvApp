import Config from 'react-native-config';

import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
} from '../../utils/keychain';

const _header = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded',
});

const _body = new URLSearchParams();

_body.append('grant_type', 'client_credentials');
_body.append('client_id', Config.CLIENT_ID);
_body.append('client_secret', Config.CLIENT_SECRET);

export const setTDXToken = async () => {
  await removeAccessToken();
  return fetch(
    'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token',
    {
      headers: _header,
      body: _body,
      method: 'POST',
    },
  )
    .then(res => res.json())
    .then(ans => setAccessToken(ans.access_token));
};

export const getTaipeiList = async () => {
  const token = await getAccessToken();
  const headers = new Headers({
    accept: 'application/json',
    Authorization: 'Bearer ' + token,
  });
  return fetch(
    'https://tdx.transportdata.tw/api/basic/v2/Road/Traffic/CCTV/City/NewTaipei?%24top=30',
    {
      method: 'GET',
      headers,
    },
  );
};

export const getCityList = () => {
  return new Promise(resolve => {
    const citys = [
      {
        code: 'Taipei',
        name: '台北',
      },
      {
        code: 'NewTaipei',
        name: '新北',
      },
      {
        code: 'YilanCounty',
        name: '宜蘭',
      },
      {
        code: 'ChanghuaCounty',
        name: '彰化',
      },
      {
        code: 'YunlinCounty',
        name: '雲林',
      },
      {
        code: 'PingtungCounty',
        name: '屏東',
      },
      {
        code: 'TaitungCounty',
        name: '台東',
      },
      {
        code: 'Keelung',
        name: '基隆',
      },
      {
        code: 'Taichung',
        name: '台中',
      },
      {
        code: 'Tainan',
        name: '台南',
      },
      {
        code: 'Taoyuan',
        name: '桃園',
      },
    ];

    resolve(citys);
  });
};

export const getCCTVList = async city => {
  const token = await getAccessToken();
  const headers = new Headers({
    accept: 'application/json',
    Authorization: 'Bearer ' + token,
  });
  return fetch(
    `https://tdx.transportdata.tw/api/basic/v2/Road/Traffic/CCTV/City/${city}?%24top=30&%24format=JSON`,
    {
      method: 'GET',
      headers,
    },
  );
};

// 發現差不多過 15 秒會有白屏的問題
export const getFreeCCTVList = async () => {
  const token = await getAccessToken();
  const headers = new Headers({
    accept: 'application/json',
    Authorization: 'Bearer ' + token,
  });
  return fetch(
    'https://tdx.transportdata.tw/api/basic/v2/Road/Traffic/CCTV/Freeway?%24top=30&%24format=JSON',
    {
      method: 'GET',
      headers,
    },
  );
};

// 發現差不多過 15 秒會有白屏的問題
export const getHighwayCCTVList = async () => {
  const token = await getAccessToken();
  const headers = new Headers({
    accept: 'application/json',
    Authorization: 'Bearer ' + token,
  });
  return fetch(
    'https://tdx.transportdata.tw/api/basic/v2/Road/Traffic/CCTV/Highway?%24top=30&%24format=JSON',
    {
      method: 'GET',
      headers,
    },
  );
};
