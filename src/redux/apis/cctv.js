import Config from 'react-native-config';

import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
} from '../../utils/keychain';
import http from './http';

const _tokenTeader = async () => {
  const token = await getAccessToken();
  return {
    Authorization: 'Bearer ' + token,
  };
};

export const setTDXToken = async () => {
  await removeAccessToken();
  const body = {
    grant_type: 'client_credentials',
    client_id: Config.CLIENT_ID,
    client_secret: Config.CLIENT_SECRET,
  };
  return http
    .post('auth/realms/TDXConnect/protocol/openid-connect/token', body)
    .then(res => res.json())
    .then(ans => setAccessToken(ans.access_token));
};

export const getTaipeiList = async () => {
  const headers = await _tokenTeader();
  return http.get(
    'api/basic/v2/Road/Traffic/CCTV/City/NewTaipei',
    {
      $top: 30,
    },
    headers,
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
  const headers = await _tokenTeader();
  return http.get(
    `api/basic/v2/Road/Traffic/CCTV/City/${city}`,
    {
      $top: 30,
      $format: 'JSON',
    },
    headers,
  );
};

// 發現差不多過 15 秒會有白屏的問題
export const getFreeCCTVList = async () => {
  const headers = await _tokenTeader();
  return http.get(
    'api/basic/v2/Road/Traffic/CCTV/Freeway',
    {
      $top: 30,
      $format: 'JSON',
    },
    headers,
  );
};

// 發現差不多過 15 秒會有白屏的問題
export const getHighwayCCTVList = async () => {
  const headers = await _tokenTeader();
  return http.get(
    'api/basic/v2/Road/Traffic/CCTV/Highway',
    {
      $top: 30,
      $format: 'JSON',
    },
    headers,
  );
};
