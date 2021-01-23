// import { connect } from 'react-redux';
// import { Alert } from 'react-native';
// import { actions, selectors } from 'eoffice/store/documents/list';
// import { actions as detailActions } from 'eoffice/store/documents/detail';

// import Documents from './Documents';

// const mapStateToProps = state => ({
//   documents: selectors.documentsSelector(state),
//   loading: selectors.isLoadingSelector(state),
//   mode: selectors.modeSelector(state),
//   total: selectors.totalSelector(state),
//   countToTrinh: selectors.countToTrinhSelector(state),
//   query: selectors.querySelector(state),
// });

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   listDocuments: () => dispatch(actions.listDocuments()),
//   refreshDocuments: () => dispatch(actions.refreshDocuments()),
//   countDocuments: () => dispatch(actions.countDocuments()),

//   onDocumentPressed: async (docUserView, online) => {
//     global.hasDeeplink = null;
//     if (online) {
//       dispatch(detailActions.refreshDocument());
//       dispatch(actions.viewDetail(docUserView));
//       return ownProps.onDocumentPressed(docUserView.docId);
//     }
//     Alert.alert('Thông báo', 'Mất kết nối mạng', [{ text: 'Đóng', style: 'destructive' }]);
//     return ownProps.onDocumentPressed(docUserView.docId);
//   },
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Documents);
