import PropTypes from 'prop-types';
import getConfig from 'next/config';
import { Provider } from 'react-redux';

import store from 'core/redux/store';
import { PageWrapper } from 'core/utils/context/pageContext';
import MainContainer from 'core/modules/common/containers/MainContainer';
import 'styles/global.css';
import 'styles/style.css';

const App = ({ Component, pageProps }) => {
  if (typeof window !== 'undefined') {
    const { publicRuntimeConfig } = getConfig();
    process.env = {
      ...process.env,
      ...publicRuntimeConfig.envVarAvailableInClient,
    };
  }

  return (
    <Provider store={store}>
      <PageWrapper data={pageProps}>
        <MainContainer>
          <Component {...pageProps} />
        </MainContainer>
      </PageWrapper>
    </Provider>
  );
};

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape({
    context: PropTypes.string,
  }).isRequired,
};

export default App;
