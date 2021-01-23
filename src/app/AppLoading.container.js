import { connect } from 'react-redux';

import { selectors } from 'eoffice/store/app';
import AppLoading from './AppLoading';

const mapStateToProps = state => ({
  isVisible: selectors.loadingSelector(state),
});

export default connect(mapStateToProps)(AppLoading);
