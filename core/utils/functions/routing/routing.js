import {
  navigateConfig,
  generateBaseUrl,
  // generateLanguagePathParameter,
  navigateHandlers,
} from './routing.subComponents';

const { possibleQueries, possibleQueriesWithOnlyOnePossibleValue, setValuesParamHandlers } =
  navigateConfig;

const navigate = (
  setValues,
  pathArrData,
  paramsData,
  queryData,
  resetValues,
  language,
  forceAbsolutePath,
  shouldReturnUrl,
  // eslint-disable-next-line consistent-return
) => {
  let pathArr = [];
  let queryObj = queryData;
  if (resetValues) queryObj = {};

  let baseUrl = '';
  if (forceAbsolutePath) baseUrl = generateBaseUrl();

  // even if baseUrl is empty this insert is important to generate
  // the relative url with a leading / so that it creates the correct
  // navigation in the browser
  pathArr.push(baseUrl);

  // const languagePathParameter = generateLanguagePathParameter();
  // pathArr.push(languagePathParameter);

  if (setValues && Object.keys(setValues).length) {
    Object.keys(setValues).forEach(param => {
      let handlerKey = param;

      if (possibleQueries.includes(param)) handlerKey = 'possibleQueries';
      else if (possibleQueriesWithOnlyOnePossibleValue.includes(param))
        handlerKey = 'possibleQueriesWithOnlyOnePossibleValue';

      const handler = setValuesParamHandlers[handlerKey];

      let calculatedValues = {};
      if (navigateHandlers && handler && navigateHandlers[handler]) {
        calculatedValues = navigateHandlers[handler](
          pathArr,
          pathArrData,
          paramsData,
          queryObj,
          param,
          setValues[param],
          language,
          resetValues,
        );
        ({ pathArr, queryObj } = calculatedValues);
      }
    });
  }

  const pathString = pathArr.join('/');
  const queryString = Object.keys(queryObj)
    .map(query => `${query}=${queryObj[query]}`)
    .join('&');
  let url = pathString;
  if (queryString) url = `${url}?${queryString}`;

  if (shouldReturnUrl) return url;
  if (typeof window !== 'undefined' && window.location?.href) window.location.href = url;
};

export default navigate;
