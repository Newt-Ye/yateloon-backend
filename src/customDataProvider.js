import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const apiUrl = process.env.REACT_APP_API_URL;
const httpClient = (url, options = {}) => {
  options.headers = new Headers(options.headers || {});
  options.headers.set('Accept', 'application/json');

  const authToken = localStorage.getItem("auth_token");
  if (authToken) {
    options.headers.set('Authorization', `Bearer ${authToken}`);
  }

  return fetchUtils.fetchJson(url, options);
};
const dataProvider = simpleRestProvider(apiUrl, httpClient);

const customDataProvider = {
    ...dataProvider,
    getList: (resource, params) => {
      const { filter, pagination, sort } = params;
      const { page, perPage } = pagination;
      const { field, order } = sort;

      // 轉換查詢參數為後端 API 所需格式
      const query = {
        ...Object.keys(filter).reduce((acc, key) => {
          // 只加入非空且非 undefined 的過濾條件
          if (filter[key] && filter[key] !== undefined) {
              acc[key] = filter[key];
          }
          return acc;
        }, {}),
        page: page,
        perPage: perPage,
        sortField: field,
        sortDirection: order,
      };

      const url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;

      return httpClient(url).then(({ headers, json }) => {
        const { data, total } = json;

        return {
          data: data,
          total: total
        };
      });
    },
    getOne: (resource, params) => {
      return dataProvider.getOne(resource, params).then(response => {
          const data = response.data;
          
          return {
            data: data
          };
      });
    },
    getMany: (resource, params) => {
      const { filter } = params;

      // 轉換查詢參數為後端 API 所需格式
      const query = {
        ...(filter 
          && Object.keys(filter).reduce((acc, key) => {
            // 只加入非空且非 undefined 的過濾條件
            if (filter[key] && filter[key] !== undefined) {
              acc[key] = filter[key];
            }
            return acc;
          }, {})
        )
      };

      const url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;
      
      return httpClient(url).then(({ headers, json }) => {
        const { data } = json;

        return {
          data: data
        };
      });
    },
    create: (resource, params) => {
      return dataProvider
        .create(resource, params)
        .then(response => {
          const data = response.data
          return {
            data
          };
        })
        .catch(error => {
          const message = error.message || "發生錯誤";
          throw new Error(message);
        });
    },
    update: (resource, params) => {
      return dataProvider
        .update(resource, params)
        .then(response => {
          const data = response.data;
          return {
            data
          };
        })
        .catch(error => {
          const message = error.message || "發生錯誤";
          throw new Error(message);
        });
    },
    delete: (resource, params) => {
      return dataProvider.delete(resource, params).then(response => {
        // 將原始的 API 回應格式轉換
        const data = response.data.data;
        return {
          data: data
        };
      });
    },
    deleteMany: (resource, params) => {
      return httpClient(`${apiUrl}/${resource}`, {
        method: 'DELETE',
        body: JSON.stringify({ ids: params.ids }),
      })
      .then(({ json }) => { 
        const data = json?.data?.ids || []; 
        return {
          data: data
        };
      });
    },
    getPantoneColor: (resource, params) => {
      const formData = new FormData();
      formData.append('logoImage', params.data.logoImage.rawFile);

      return httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: formData,
      })
      .then(({ json }) => { 
        const data = json.data;
        return {
          data: data
        };
      });
    },
    // 其他 CRUD 操作的自訂邏輯...
};

export default customDataProvider;
