import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const customDataProviderFactory = (apiUrl) => {
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

  return {
    ...dataProvider,

    getList: (resource, params) => {
      const { filter, pagination, sort } = params;
      const { page, perPage } = pagination;
      const { field, order } = sort;

      const needsCompanyId = [
        'inventory-item-categories',
        'inventory-items',
        'factories',
        'warehouses',
      ].includes(resource);

      if (needsCompanyId) {
        filter['company_id'] = localStorage.getItem('current_company');
      }

      const query = {
        ...Object.keys(filter).reduce((acc, key) => {
          if (filter[key] !== undefined && filter[key] !== "") {
            acc[key] = filter[key];
          }
          return acc;
        }, {}),
        page,
        perPage,
        sortField: field,
        sortDirection: order,
      };

      const url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;

      return httpClient(url).then(({ headers, json }) => ({
        data: json.data,
        total: json.total,
      }));
    },

    getOne: (resource, params) => dataProvider.getOne(resource, params),

    getMany: (resource, params) => {
      const filter = { ...params.filter };

      if (['inventory-item-categories', 'inventory-items', 'factories', 'warehouses'].includes(resource)) {
        filter['company_id'] = localStorage.getItem('current_company');
      }

      const query = Object.keys(filter).reduce((acc, key) => {
        if (filter[key]) {
          acc[key] = filter[key];
        }
        return acc;
      }, {});

      const url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;

      return httpClient(url).then(({ json }) => ({
        data: json.data,
      }));
    },

    create: (resource, params) => {
      if (['inventory-item-categories', 'inventory-items', 'factories', 'warehouses'].includes(resource)) {
        params.data.company_id = parseInt(localStorage.getItem('current_company')) || '';
      }

      return dataProvider.create(resource, params);
    },

    update: (resource, params) => dataProvider.update(resource, params),

    delete: (resource, params) =>
      dataProvider.delete(resource, params).then((res) => ({
        data: res.data.data,
      })),

    deleteMany: (resource, params) =>
      httpClient(`${apiUrl}/${resource}`, {
        method: 'DELETE',
        body: JSON.stringify({ ids: params.ids }),
      }).then(({ json }) => ({
        data: json?.data?.ids || [],
      })),
  };
};

export default customDataProviderFactory;
