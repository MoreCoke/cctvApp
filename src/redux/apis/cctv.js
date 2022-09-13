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
