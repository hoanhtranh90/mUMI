import { connect } from 'react-redux';

import { actions, selectors } from 'eoffice/store/tasks/detail';
import RelatedDocs from './RelatedDocs';

const mapStateToProps = state => ({
  relatedDocs: selectors.relatedDocsSelector(state),
  task: selectors.taskSelector(state),
});

const mapDispatchToProps = {
  listRelatedDocs: actions.listRelatedDocs,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RelatedDocs);
