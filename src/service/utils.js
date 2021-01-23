import store from '../store';
import { getUnseenNotify, getUnseenNotifyByRole } from '../store/auth/service';
import { actions, selectors } from 'eoffice/store/auth';
import firebase from 'react-native-firebase';

export default {
  initPageableParams(pagable) {
    !pagable && (pagable = { page: 0, size: 1000 });
    !pagable.size && (pagable.size = 1000);
    return pagable;
  },
  async refreshNotificationUnseen() {
    try {
      const notifyUnseenByRole = await getUnseenNotifyByRole();
      const notifyUnseenByUser = await getUnseenNotify();
      store.dispatch(actions.setNotifyByRole(notifyUnseenByRole));
      firebase.notifications().setBadge(notifyUnseenByUser);
    } catch (e) {}
  },
};
