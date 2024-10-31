import { usePageContext } from 'core/utils/context/pageContext';

export const useLanguage = (stringsObj, stringsKey) => {
  const pageData = usePageContext();
  const { languageData } = pageData;
  const { language } = languageData;

  const localizedStrings = stringsObj[language];

  return localizedStrings[stringsKey];
};
