const generalStrings = {
  en: {
    notFoundPageData: {
      title: 'You went off limits here',
      subTitle(statusCode) {
        return `You have been hit with a ${statusCode} error status code`;
      },
    },
  },
};

export default generalStrings;
