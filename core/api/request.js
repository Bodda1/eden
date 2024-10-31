import getConfig from 'next/config';
import axios from 'axios';
import qs from 'qs';

import { mockData } from 'core/utils/functions/mockingEngine';
import { errorStatusCodeEnum } from 'core/modules/common/enums';

const { publicRuntimeConfig } = getConfig();
const { flags } = publicRuntimeConfig;
const { isOffline } = flags;

const request = {
  get(headers, url, params) {
    const configOptions = {
      params,
      headers,
      validateStatus(status) {
        return status <= errorStatusCodeEnum.internalServerError;
      },
      paramsSerializer(paramsData) {
        return qs.stringify(paramsData);
      },
    };

    const apiCallPromis = axios.get(url, configOptions);
    return apiCallPromis;
  },

  post(headers, url, params, queryParams) {
    const configOptions = {
      headers,
      validateStatus(status) {
        return status <= errorStatusCodeEnum.internalServerError;
      },
    };

    let updatedUrl = url;
    if (queryParams) {
      const queryArr = [];
      Object.keys(queryParams).forEach(queryKey => {
        queryArr.push(`${queryKey}=${queryParams[queryKey]}`);
      });
      const queryString = queryArr.join('&');
      updatedUrl = `${url}?${queryString}`;
    }

    const apiCallPromis = axios.post(updatedUrl, params, configOptions);
    return apiCallPromis;
  },

  put(headers, url, params) {
    const configOptions = {
      headers,
      validateStatus(status) {
        return status <= errorStatusCodeEnum.internalServerError;
      },
    };

    const apiCallPromis = axios.put(url, params, configOptions);
    return apiCallPromis;
  },

  patch(headers, url, params) {
    const configOptions = {
      headers,
      validateStatus(status) {
        return status <= errorStatusCodeEnum.internalServerError;
      },
    };

    const apiCallPromis = axios.patch(url, params, configOptions);
    return apiCallPromis;
  },

  delete(headers, url, data) {
    const configOptions = {
      data,
      headers,
      validateStatus(status) {
        return status <= errorStatusCodeEnum.internalServerError;
      },
    };

    const apiCallPromis = axios.delete(url, configOptions);
    return apiCallPromis;
  },
};

const wrapAnonymous =
  method =>
  // eslint-disable-next-line consistent-return
  async (customHeaders = {}, replaceHeaders = false, ...props) => {
    if (isOffline) return Promise.resolve(mockData[props[2]]);
    props.pop();

    let headers = {
      // you can add any global headers here
      ...customHeaders,
    };
    if (replaceHeaders) headers = customHeaders;

    return request[method](headers, ...props);
  };

export const anonymousRequests = {
  get: wrapAnonymous('get'),
  post: wrapAnonymous('post'),
  put: wrapAnonymous('put'),
};
