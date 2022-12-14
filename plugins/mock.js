import mock from '~/mocks/com-mock.js';
const framework = process.env.framework;
export default ({ $axios }) => {
  if (framework.onlyUseMockup || process.env.NODE_ENV === 'development') {
    if (framework.useMockup) {
      mock($axios);
    }
  }
};
