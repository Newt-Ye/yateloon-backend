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
          // 將原始的 API 回應格式轉換
          const originalData = response.data.data;
          
          let data = {};
          // 處理回應的資料格式
          switch (resource) {
            case 'members':
              // 將 user 物件的屬性搬到原始物件，並移除 user key
              const { user, ...rest } = originalData;
              data = { ...rest, ...user };
              break;
            case 'logos':
              originalData.logoImage = [{
                title: originalData.fileName,
                src: originalData.imageUrl,
              }];
              originalData.colors = originalData.colors.map((item, index) => {
                return { 
                  colorHex: item.colorHex, 
                  c: item.colorCmyk?.c,
                  m: item.colorCmyk?.m,
                  y: item.colorCmyk?.y,
                  k: item.colorCmyk?.k,
                }
              });
              data = originalData;
              break;
            case 'products':
              const categories = originalData.categories || [];
              const colors = originalData.colors || [];
              const specifications = originalData.specifications || [];
              const quantityDiscounts = originalData.quantityDiscounts || [];
              const coverImage = originalData.coverImage || [];
              const templateImage = originalData.templateImage || [];
              const otherImage= originalData.otherImage || [];

              originalData.minQuantity = originalData.quantityRanges?.minQuantity;
              originalData.maxQuantity = originalData.quantityRanges?.maxQuantity;;
              originalData.incrementStep = originalData.quantityRanges?.incrementStep;;
              originalData.categories = categories.map((item) => item.categoryId);
              originalData.colors = colors.map((item, index) => {
                return { 
                  name: item.colorName, 
                  code: item.colorCode,
                  image: [
                    {
                      src: item.imageUrl,
                      title: item.fileName
                    }
                  ],
                  navImage: [
                    {
                      src: item.navImageUrl,
                      title: item.navFileName
                    }
                  ]
                }
              });
              originalData.specifications = specifications.map((item) => {
                return { 
                  name: item.specificationName 
                }
              });
              originalData.quantityDiscounts = quantityDiscounts.map((item) => {
                return { 
                  minQuantity: item.minQuantity, 
                  maxQuantity: item.maxQuantity, 
                  discountPercentage: item.discountPercentage, 
                  leadTimeDays: item.leadTimeDays
                }
              });

              originalData.coverImage = [];
              if (coverImage) {
                originalData.coverImage = [
                  {
                    title: coverImage.fileName,
                    src: coverImage.imageUrl,
                  }
                ];
              }

              originalData.templateImage = [];
              if (templateImage) {
                originalData.templateImage = [
                  {
                    title: templateImage.fileName,
                    src: templateImage.imageUrl,
                  }
                ];
              }
              originalData.otherImage = otherImage.map((item) => {
                return { 
                  title: item.fileName,
                  src: item.imageUrl 
                }
              });

              data = originalData;
              break;
            default:
              data = originalData;
          }

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
        const { rows } = json.data;

        const data = rows.map(row => ({ ...row }));
        return {
          data: data
        };
      });
    },
    create: (resource, params) => {
      return dataProvider
        .create(resource, params)
        .then(response => {
          console.log(response);
          const data = response.data
          return {
            data
          };
        });
    },
    update: (resource, params) => {
      return dataProvider
        .update(resource, params)
        .then(response => {
          // 將原始的 API 回應格式轉換
          const data = response.data.data;
          return {
            data: data
          };
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
