require('dotenv').config({
  path: `${process.env.ENV_FILE ? `./env/.env.${process.env.ENV_FILE}` : '.env.root'}`,
});

const imgPath = '/assets/images';
const iconPath = '/assets/icons';

const assetPath = {
  imgPath,
  iconPath,
};

module.exports = assetPath;
