// @flow
/* eslint-disable no-unused-vars */
import variable from '../variables/platform';

export default (variables /* : * */ = variable) => {
  const contentTheme = {
    flex: 1,
    backgroundColor: 'transparent',
    'NativeBase.Segment': {
      borderWidth: 0,
      backgroundColor: 'transparent',
    },
  };

  return contentTheme;
};
