import { HttpsAgent } from 'agentkeepalive';
import axios, { AxiosInstance, Method, AxiosRequestConfig } from 'axios';
import tmpl from 'string-template';
import qs from 'qs';

export const version = '2.0.2';
export const defaultHttpsAgent = new HttpsAgent({ keepAlive: true });
export const defaultTimeout = 10000;
export const userAgent = `google-maps-services-node-${version}`;
export const acceptEncoding = 'gzip';
export const X_GOOG_MAPS_EXPERIENCE_ID = 'X-GOOG-MAPS-EXPERIENCE-ID';

const defaultConfig: AxiosRequestConfig = {
	timeout: defaultTimeout,
	httpsAgent: defaultHttpsAgent,
	headers: {
		'X-Request-With': 'XMLHttpRequest',
		'Access-Control-Allow-Origin': '*',

		'User-Agent': userAgent,
		'Accept-Encoding': acceptEncoding
	}
};

export const defaultAxiosInstance = axios.create(defaultConfig);

//   export interface ClientOptions {
// 	/** AxiosInstance to be used by client. Provide one of axiosInstance or config. */
// 	axiosInstance?: AxiosInstance;
// 	/** Config used to create AxiosInstance. Provide one of axiosInstance or config. */
// 	config?: Config;
// 	experienceId?: string[];
//   }

// interface IResourceFactory {
//     default: any

// }
