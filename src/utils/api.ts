import Cookies from 'js-cookie';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const getHeaders = () => {
  const headers: Record<string, string> = {
    'source': 'web_pwa',
    'app_version_code': process.env.NEXT_PUBLIC_APP_VERSION_CODE as string,
    'app_version_name': process.env.NEXT_PUBLIC_APP_VERSION_NAME as string,
    'Accept-Language': 'en',
    'accept': 'application/json, text/javascript, */*; q=0.01'
  };

  if (typeof window !== 'undefined') {
    headers['System-Language'] = window.navigator.language.split('-')[0];
  }

  return headers;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getFunction = async (api: string) => {
  try {
    const response = await fetch(api, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const postFunction = async (api: string, data: any) => {
  try {
    const response = await fetch(api, {
      method: 'POST',
      headers: {
        ...getHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || 'Failed to post data';
      throw new Error(errorMessage);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const API_ENDPOINTS = {
  sendOtpMobile: `${API_BASE_URL}api/auth/mobile/v1/send-otp`,
  verifyOtpMobile: `${API_BASE_URL}api/auth/mobile/v1/verify-otp`,
  sendOtpEmail: `${API_BASE_URL}api/auth/email/v1/send-otp`,
  verifyOtpEmail: `${API_BASE_URL}api/auth/email/v1/verify-otp`,
  verifyGoogleAuth: `${API_BASE_URL}api/auth/google/v1/login`,
  getListCalculator: `${API_BASE_URL}api/calculator/list`,
  getCalculatorResult: `${API_BASE_URL}api/calculator/result/`,
};

export const setCookieData = (userdata: any, router: AppRouterInstance) => {
  const exprie_date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const otherCookieattr = {
    expires: exprie_date,
    path: '/',
    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || '',
    secure: true,
    sameSite: 'none' as 'none'
  };

  Cookies.set('is_logged_in', 'true', otherCookieattr);
  Cookies.set('PHPSESSID', userdata.api_token, otherCookieattr);

  if (userdata.status === 'authentic') {
    Cookies.set('stage', 'match', otherCookieattr);
    Cookies.set('user_id', userdata.user_id, otherCookieattr);
    Cookies.set('user_status', userdata.status, otherCookieattr);
    Cookies.set('new_suggestion_screen', userdata.experiment_suggestion_new_screen, otherCookieattr);
    Cookies.set('country_name', 'India', otherCookieattr);
    router.push(process.env.NEXT_PUBLIC_WEB_APP_URL + 'match');

  } else if (userdata.status === 'incomplete') {
    Cookies.set('reg_screen_list', JSON.stringify(userdata.reg_screen_list), otherCookieattr);
    Cookies.set('nri_flow', JSON.stringify(userdata.nri_flow), otherCookieattr);
    Cookies.set('user_id', userdata.user_id, otherCookieattr);
    Cookies.set('user_status', userdata.status, otherCookieattr);
    Cookies.set('new_suggestion_screen', userdata.experiment_suggestion_new_screen, otherCookieattr);
    Cookies.set('experiment_registration_new_screen', userdata.experiment_registration_new_screen, otherCookieattr);
    Cookies.set('country_name', 'India', otherCookieattr);
    Cookies.set('stage', 'gender', otherCookieattr);
    router.push(process.env.NEXT_PUBLIC_WEB_APP_URL + 'gender');
  }
};
