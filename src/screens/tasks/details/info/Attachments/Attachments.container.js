import { connect } from 'react-redux';

import { actions, selectors } from 'eoffice/store/tasks/detail';
import Attachments from './Attachments';

const mapStateToProps = state => ({
  attachments: selectors.attachmentsSelector(state),
});

const mapDispatchToProps = {
  listAttachments: actions.listAttachments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Attachments);
