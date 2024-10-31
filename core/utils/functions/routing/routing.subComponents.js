const generateProtocol = () => {
  const protocol = (process.env.NODE_ENV === 'production' && 'https://') || 'http://';

  return protocol;
};

const generateSubDomain = () => process.env.CONFIGURABLE_SUB_DOMAINS || 'www';

const generateRootDomain = () => process.env.CONFIGURABLE_ROOT_DOMAINS || 'dcircles';

const generateTopLevelDomain = () => process.env.CONFIGURABLE_TOP_LEVEL_DOMAINS || 'com';

const generatePortNumber = () => {
  let portNumber = '';

  if (process.env.NODE_ENV !== 'production') portNumber = process.env.PORT || 3000;

  return (portNumber && `:${portNumber}`) || '';
};

/* ******************************************************* */
/* ********************* Handlers ************************ */
/* ******************************************************* */
const possibleQueriesWithOnlyOnePossibleValueHandler = (
  pathArr,
  pathArrData,
  _,
  queryObj,
  paramKey,
  paramValue,
  _2,
  resetValues,
) => {
  const updatedQueryObj = { ...queryObj };
  updatedQueryObj[paramKey] = paramValue;

  if (!paramValue) delete updatedQueryObj[paramKey];

  if (resetValues === false) pathArr.push(pathArrData);
  return { pathArr, queryObj: updatedQueryObj };
};

const genericHandler = (pathArr, _, _2, queryObj, _3, paramValue) => {
  const updatedPathArr = [...pathArr];
  updatedPathArr.push(paramValue);
  return { pathArr: updatedPathArr, queryObj };
};
/* ******************************************************* */
/* ******************* End Handlers ********************** */
/* ******************************************************* */

export const navigateConfig = {
  possibleQueries: [],
  possibleQueriesWithOnlyOnePossibleValue: [],
  setValuesParamHandlers: {
    possibleQueriesWithOnlyOnePossibleValue: 'possibleQueriesWithOnlyOnePossibleValueHandler',
    generic: 'genericHandler',
  },
};

export const generateBaseUrl = () => {
  const pathArr = [];

  const protocol = generateProtocol();

  const subDomain = generateSubDomain();
  if (subDomain) pathArr.push(subDomain);

  const rootDomain = generateRootDomain();
  pathArr.push(rootDomain);

  const topLevelDomain = generateTopLevelDomain();
  const portNumber = generatePortNumber();
  pathArr.push(`${topLevelDomain}${portNumber}`);

  return `${protocol}${pathArr.join('.')}`;
};

export const generateLanguagePathParameter = () => '';

export const navigateHandlers = {
  possibleQueriesWithOnlyOnePossibleValueHandler,
  genericHandler,
};
