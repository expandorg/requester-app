import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { NotificationAnimated } from '@expandorg/components/app';

import { clearNotification } from '@expandorg/app-utils/app';

import { notificationSelector } from '../../selectors/uiStateSelectors';

const mapStateToProps = state => ({
  notification: notificationSelector(state),
});

const mapdDispatchToProps = dispatch =>
  bindActionCreators({ onClear: clearNotification }, dispatch);

export default connect(
  mapStateToProps,
  mapdDispatchToProps
)(NotificationAnimated);
