import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext({});

export function ThemeWrapper({ children, data }) {
  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
}
ThemeWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.shape({}).isRequired,
};

export function usePageContext() {
  return useContext(ThemeContext);
}
