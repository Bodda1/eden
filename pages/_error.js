import PropTypes from 'prop-types';
import getConfig from 'next/config';

import initApp from 'core/utils/functions/init/initApp';
import NotFoundView from 'core/modules/general/views/NotFoundView';

const { publicRuntimeConfig } = getConfig();
const { context } = publicRuntimeConfig;
const { contextList } = context;

const Error = ({ statusCode }) => <NotFoundView statusCode={statusCode} />;

Error.getInitialProps = async ({ req, res, err }) => {
  const pageData = await initApp(contextList.error, req);

  const statusCode = res?.statusCode || err?.statusCode || 404;
  return { statusCode, ...pageData };
};

Error.propTypes = {
  statusCode: PropTypes.number,
};

Error.defaultProps = {
  statusCode: null,
};

export default Error;
