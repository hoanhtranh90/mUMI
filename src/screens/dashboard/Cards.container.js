import { connect } from 'react-redux';
import { actions } from 'eoffice/store/documents/list';
import { actions as authActions } from 'eoffice/store/auth';
import { actions as summaryActions } from 'eoffice/store/administrative/summary';
import { selectors } from '../../store/auth';
import Cards from './Cards';
import NavigationService from '../../utils/NavigationService';
import { ADMINISTRATIVE_TYPE, FLOW_INFO } from 'eoffice/constants/administrative';
import _ from 'lodash';
import axios from 'eoffice/store/axios';

const mapStateToProps = state => ({
  roleId: selectors.getRoleId(state),
});

const mapDispatchToProps = {
  resetDocuments: actions.resetDocuments,
  getMenuConfig: authActions.getMenuItemConfig,
  routeToLichTuan: () => async dispatch => {
    const hcFlow = await dispatch(summaryActions.getFlowInfo(FLOW_INFO.LICH_TUAN));
    await axios.get('/hanhchinh/getFlowsAvailable?flowCode=LICH_TUAN').then(res => {
      if (res.data.hcFlows.length > 0) {
        global.deptId = res.data.hcFlows[0].deptId;
      } else {
        global.deptId = '';
      }
    });

    global.selectDeptForViewLT = '';
    global.deptSelected = '';

    if (!_.isNull(hcFlow) && !_.isUndefined(hcFlow.id)) {
      const itemTmp = {
        mode: ADMINISTRATIVE_TYPE.COMPLETE,
        flow: FLOW_INFO.LICH_TUAN,
      };
      await dispatch(summaryActions.changeModeLT(itemTmp));
    } else {
      const itemTmp = {
        mode: ADMINISTRATIVE_TYPE.PENDING,
        flow: FLOW_INFO.LICH_TUAN,
      };
      await dispatch(summaryActions.changeModeLT(itemTmp));
    }
    NavigationService.navigate('AdministrativeSummary');
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards);
