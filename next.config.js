require('dotenv').config()

// https://github.com/zeit/next.js/issues/7320#issuecomment-491906055
module.exports = {
  env: {
    LAB_ID: process.env.LAB_ID,
    customKey: 'my-value',
  },
}
