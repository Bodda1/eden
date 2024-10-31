import { getLanguageData, getPathArr, getQueryObj, getPageParams } from './initApp.subComponents';

const initApp = async (context, requestObj, encodedPageParamsAndQueryObj = {}) => {
  const queryObj = getQueryObj(requestObj);

  const { pageParamsAndQueryObj, pageParamsObj } = getPageParams(
    encodedPageParamsAndQueryObj,
    queryObj,
  );

  const pageData = {
    context,
    languageData: getLanguageData(),
    pathArrStr: getPathArr(requestObj),
    pageParamsAndQueryObj,
    pageParamsObj,
    queryObj,
  };

  return pageData;
};

export default initApp;
