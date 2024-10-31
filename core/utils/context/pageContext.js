import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const PageContext = createContext({});

export function PageWrapper({ children, data }) {
  return <PageContext.Provider value={data}>{children}</PageContext.Provider>;
}
PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.shape({}).isRequired,
};

export function usePageContext() {
  return useContext(PageContext);
}
