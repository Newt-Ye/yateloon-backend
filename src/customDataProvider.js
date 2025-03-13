import { fetchUtils, useRedirect } from 'react-admin';
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

const createProductFormData = (params) => {
  const formData = new FormData();
  Object.entries(params.data).forEach(([key, value]) => {
    if (key === 'otherImage' && Array.isArray(value)) {
      // 處理多檔案上傳
      value.forEach((file, index) => {
        if (file.rawFile) {
          formData.append(`otherImages`, file.rawFile);
        }
      });
    } else if ((key === 'coverImage' || key === 'templateImage') && value?.rawFile) {
      // 單檔案上傳
      formData.append(key, value.rawFile);
    } else if (key === 'colors' && Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item.name) {
          formData.append(`colors[${index}][name]`,item.name);  
          formData.append(`colors[${index}][code]`,item.code || '');  
          
          if (item.image?.rawFile) {
            formData.append(`colorImages`, item.image.rawFile);
          }

          if (item.navImage?.rawFile) {
            formData.append(`colorNavImages`, item.navImage.rawFile);
          }
        }
      });
    } else if (key === 'specifications' && Array.isArray(value)) {
      value.forEach((item, index) => {
        formData.append(`specifications[${index}]`, item.name);  
      });
    } else if (key === 'quantityDiscounts' && Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item.minQuantity && item.maxQuantity && (item.discountPercentage || item.leadTimeDays)) {
          formData.append(`quantityDiscounts[${index}][minQuantity]`,item.minQuantity || '');  
          formData.append(`quantityDiscounts[${index}][maxQuantity]`,item.maxQuantity || '');
          formData.append(`quantityDiscounts[${index}][discountPercentage]`,item.discountPercentage || '');
          formData.append(`quantityDiscounts[${index}][leadTimeDays]`,item.leadTimeDays || '');
        }
      });
    } else if (key === 'categories' && Array.isArray(value)) {
      value.forEach((value, index) => {
        formData.append(`categories[${index}]`, value);  
      });
    }  else {
      // 一般欄位
      formData.append(key, value || '');
    }
  });

  return formData;
};

const updateProductFormData = (params) => {
  const formData = new FormData();
  Object.entries(params.data).forEach(([key, value]) => {
    if (key === 'otherImage' && Array.isArray(value)) {
      let counter = 0
      value.forEach((file, index) => {
        // 如果是新上傳的檔案
        if (file.rawFile) {
          formData.append(`otherImages`, file.rawFile);
        } else {
          formData.append(`otherImageNames[${counter}]`, file.title);
        }
        counter++;
      });
    } else if ((key === 'coverImage' || key === 'templateImage')) {
      // 如果是新上傳的檔案
      if (value.rawFile) {
        formData.append(key, value.rawFile);
      } else {
        formData.append(`${key}Name`, value[0].title);
      }
    } else if (key === 'colors' && Array.isArray(value)) {
      let counter = 0
      let navCounter = 0
      value.forEach((item, index) => {
        if (item.name) {
          formData.append(`colors[${index}][name]`,item.name);  
          formData.append(`colors[${index}][code]`,item.code || '');  

          if (item.image) {
            // 如果是新上傳的檔案
            if (item.image.rawFile) {
              formData.append(`colors[${index}][fileIndex]`, counter++);
              formData.append(`colorImages`, item.image.rawFile);
            } else if (item.image[0]?.title) {
              formData.append(`colors[${index}][imageName]`, item.image[0].title);
            }
          }

          if (item.navImage) {
            // 如果是新上傳的檔案
            if (item.navImage.rawFile) {
              formData.append(`colors[${index}][navFileIndex]`, navCounter++);
              formData.append(`colorNavImages`, item.navImage.rawFile);
            } else if (item.navImage[0]?.title) {
              formData.append(`colors[${index}][navImageName]`, item.navImage[0].title);
            }
          }
        }
      });
    } else if (key === 'specifications' && Array.isArray(value)) {
      value.forEach((item, index) => {
        formData.append(`specifications[${index}]`, item.name);  
      });
    } else if (key === 'quantityDiscounts' && Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item.minQuantity && item.maxQuantity && (item.discountPercentage || item.leadTimeDays)) {
          formData.append(`quantityDiscounts[${index}][minQuantity]`,item.minQuantity || '');  
          formData.append(`quantityDiscounts[${index}][maxQuantity]`,item.maxQuantity || '');
          formData.append(`quantityDiscounts[${index}][discountPercentage]`,item.discountPercentage || '');
          formData.append(`quantityDiscounts[${index}][leadTimeDays]`,item.leadTimeDays || '');
        }
      });
    } else if (key === 'categories' && Array.isArray(value)) {
      value.forEach((value, index) => {
        formData.append(`categories[${index}]`, value);  
      });
    }  else {
      // 一般欄位
      formData.append(key, value || '');
    }
  });
  return formData;
};

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

      const resourceMap = {
        'product-categories': 'categories',
        'article-categories': 'categories',
        'member-categories': 'categories'
      }; 
      const newResource = resourceMap[resource] || resource;

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

      if (resource === 'product-categories'
        || resource === 'article-categories'
        || resource ==='member-categories') {
        query.type = resource.split('-')[0];
      }

      const url = `${apiUrl}/${newResource}?${fetchUtils.queryParameters(query)}`;
      return httpClient(url).then(({ headers, json }) => {
        const { rows, count } = json.data;

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
      if (resource === "products") {
        const formData = updateProductFormData(params);
        for (const [key, value] of formData.entries()) {
          console.log(`Key: ${key}, Value: ${value}`);
        }
        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
              method: "PUT",
              body: formData,
            })
            .then(({ json }) => { 
              const data = json.data;
              return {
                data: data
              };
            });
      }

      if (resource === "logos") {
        const formData = new FormData();
        Object.entries(params.data).forEach(([key, value]) => {
          if ((key === 'logoImage')) {
            if (value.rawFile) {
              formData.append(key, value.rawFile);
            }
          } else if (key === 'colors' && Array.isArray(value)) {
            value.forEach((item, index) => {
              if (item.colorHex) {
                formData.append(`logoColors[${index}][hex]`, item.colorHex);
              }
              
              if (item.c && item.m && item.y && item.k) {
                const colorCmyk = {
                  c: item.c,
                  m: item.m,
                  y: item.y,
                  k: item.k,
                }
                formData.append(`logoColors[${index}][cmyk]`, JSON.stringify(colorCmyk));
              }
            });
          } else if ((key === 'isPrimary')) {
            formData.append(key, value || false);
          } else {
            formData.append(key, value || '');
          }
        });
        return httpClient(`${apiUrl}/${resource}/${params.data.id}`, {
          method: "PUT",
          body: formData,
        })
        .then(({ json }) => { 
          const data = json.data;
          return {
            data: data
          };
        });
      }

      const resourceMap = {
        'product-categories': 'categories',
        'article-categories': 'categories',
        'member-categories': 'categories'
      }; 

      switch (resource) {
        case 'product-categories':
        case 'article-categories':
        case 'member-categories':
          params.data = { ...params.data, type: resource.split('-')[0]};
          break;
        default:
      }
      resource = resourceMap[resource] || resource;

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
      const resourceMap = {
        'product-categories': 'categories',
        'article-categories': 'categories',
        'member-categories': 'categories'
      }; 

      resource = resourceMap[resource] || resource;
      return dataProvider.delete(resource, params).then(response => {
        // 將原始的 API 回應格式轉換
        const data = response.data.data;
        return {
          data: data
        };
      });
    },
    deleteMany: (resource, params) => {
      const resourceMap = {
        'product-categories': 'categories',
        'article-categories': 'categories',
        'member-categories': 'categories'
      };
    
      const mappedResource = resourceMap[resource] || resource;
    
      return httpClient(`${apiUrl}/${mappedResource}`, {
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
