const axios = require('axios');

const baseUrl = 'https://api.korbit.co.kr';  // TODO change these
const apiKey = 'API_KEY_HERE';
const apiSecret = 'API_SECRET_HERE';

async function newAccessToken(baseUrl, apiKey, apiSecret) {
  const qs = `client_id=${apiKey}&client_secret=${apiSecret}&grant_type=client_credentials`;
  const resp = await axios.post(`${baseUrl}/v1/oauth2/access_token?${qs}`);
  return resp.data;
}

async function getBalances(baseUrl, token) {
  const headers = {
    'Authorization': `Bearer ${token.access_token}`,
  };
  const resp = await axios.get(`${baseUrl}/v1/user/balances`, { headers });
  return resp.data;
}

(async () => {
  const token = await newAccessToken(baseUrl, apiKey, apiSecret);
  console.log('token:', token);
  console.log('balances:', await getBalances(baseUrl, token));
})();


