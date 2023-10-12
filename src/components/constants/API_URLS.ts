export const BASE_URL = "http://localhost:8081/api/v1";
export const LOGIN_URL = `${BASE_URL}/login`;
export const USER_URL = `${BASE_URL}/user`;
export const POSTS_URL = `${BASE_URL}/posts`;

export const ENDPOINTS = {
  CUSTOMER_GET_ALL: () => `${BASE_URL}/customer/getall`,
  CUSTOMER_GET_FILTERED: () => `${BASE_URL}/customer/getwithfilter`,
  CUSTOMER_ADD: () => `${BASE_URL}/customer/add`,

  CUSTLIST_GET_ALL: () => `${BASE_URL}/custlist/getall`,
  CUSTLIST_ADD: () => `${BASE_URL}/custlist/add`,

  LIVECAMPAIGN_GET_ALL: () => `${BASE_URL}/livecampaign/getall`,
  LIVECAMPAIGN_ADD_DUMMY: () => `${BASE_URL}/livecampaign/createdummy`,

  CAMPAIGN_GET_ALL: () => `${BASE_URL}/campaign/getall`,
  CAMPAIGN_GET_BY_ID: (campaignId: string) => `${BASE_URL}/campaign/${campaignId}`,
  CAMPAIGN_GET_LIVE: () => `${BASE_URL}/campaign/getlivecampaigns`,
  CAMPAIGN_ADD: () => `${BASE_URL}/campaign/add`,
};
