import PropTypes from 'prop-types';
import getConfig from 'next/config';

import { useLanguage } from 'core/utils/functions/hooks';
import generalStrings from 'core/modules/general/strings';
import SectionDivider from 'core/modules/common/components/SectionDivider';

import {
  NotFoundImgWrapper,
  NotFoundImg,
  NotFoundTitle,
  NotFoundSubTitle,
} from './NotFoundContainer.style';

const { publicRuntimeConfig } = getConfig();
const { assetPath } = publicRuntimeConfig;
const { imgPath } = assetPath;

const NotFoundContainer = ({ statusCode }) => {
  const notFoundPageDataStrings = useLanguage(generalStrings, 'notFoundPageData');

  return (
    <NotFoundImgWrapper>
      <NotFoundImg src={`${imgPath}/not-found.gif`} />
      <SectionDivider gap={8} />
      <NotFoundTitle>{notFoundPageDataStrings.title}</NotFoundTitle>
      <SectionDivider gap={8} />
      <NotFoundSubTitle>{notFoundPageDataStrings.subTitle(statusCode)}</NotFoundSubTitle>
    </NotFoundImgWrapper>
  );
};

NotFoundContainer.propTypes = {
  statusCode: PropTypes.number,
};

NotFoundContainer.defaultProps = {
  statusCode: 404,
};

export default NotFoundContainer;
