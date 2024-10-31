export const getLanguageData = () => ({
  language: 'en',
  direction: 'ltr',
});

export const getPathArr = req => req.originalUrl.split('?')[0].substr(1);

export const getQueryObj = req => req.query;

export const getPageParams = (encodedPageParamsAndQueryObj, queryObj) => {
  const pageParamsAndQueryObj = {};
  const pageParamsObj = {};

  Object.keys(encodedPageParamsAndQueryObj).forEach(param => {
    pageParamsAndQueryObj[param] = decodeURIComponent(encodedPageParamsAndQueryObj[param]);

    if (param in queryObj === false)
      pageParamsObj[param] = decodeURIComponent(encodedPageParamsAndQueryObj[param]);
  });

  return { pageParamsAndQueryObj, pageParamsObj };
};
