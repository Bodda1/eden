import getConfig from 'next/config';

import initApp from 'core/utils/functions/init/initApp';
import HomeView from 'core/modules/general/views/HomeView';

const { publicRuntimeConfig } = getConfig();
const { context } = publicRuntimeConfig;
const { contextList } = context;

const HomePage = () => <HomeView />;

export async function getServerSideProps({ req, query }) {
  if (req.originalUrl.includes('_next')) return {};

  const pageData = await initApp(contextList.home, req, query);

  return {
    props: {
      ...pageData,
    },
  };
}

export default HomePage;
