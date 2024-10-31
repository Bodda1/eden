import PropTypes from 'prop-types';

const SectionDivider = ({ gap, mobileGap, withSeparator, separatorGap, separatorMobileGap }) => (
  <>
    <div
      className={`w-full mb-[${gap}px] ${
        (mobileGap && `mb-[${mobileGap}px] lg:mb-[${gap}px]`) || ''
      }`}
    />
    {withSeparator && (
      <>
        <hr className="border-b-1 m-0 w-full border-0 border-solid border-base-300" />
        <div
          className={`w-full mb-[${separatorGap}px] ${
            separatorMobileGap && `mb-[${separatorMobileGap}px] lg:mb-[${separatorGap}px]`
          }`}
        />
      </>
    )}
  </>
);

SectionDivider.propTypes = {
  gap: PropTypes.number,
  mobileGap: PropTypes.number,
  withSeparator: PropTypes.bool,
  separatorGap: PropTypes.number,
  separatorMobileGap: PropTypes.number,
};

SectionDivider.defaultProps = {
  gap: 0,
  mobileGap: 0,
  withSeparator: false,
  separatorGap: 0,
  separatorMobileGap: 0,
};

export default SectionDivider;
