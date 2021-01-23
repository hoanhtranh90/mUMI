import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen, RemoteMessage } from 'react-native-firebase';
import handlerNotification from '../utils/handlerNotification';

class HandleNotifications extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {});

    // setting channel for notification
    const channel = new firebase.notifications.Android.Channel(
      'channelId',
      'Channel Name',
      firebase.notifications.Android.Importance.Max
    ).setDescription('A natural description of the channel');
    firebase.notifications().android.createChannel(channel);

    // showing notification when app is in foreground.
    this.foregroundStateListener = firebase.notifications().onNotification(async notification => {
      notification.android.setChannelId('channelId');
      firebase
        .notifications()
        .displayNotification(notification)
        .catch(err => console.error(err));
    });

    // app tapped/opened in killed state
    this.appKilledStateListener = firebase
      .notifications()
      .getInitialNotification()
      .then((notificationOpen: NotificationOpen) => {
        if (notificationOpen) {
          global.remoteMessage = notificationOpen.notification;
        }
      });

    // app tapped/opened in foreground and background state
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(async (notificationOpen: NotificationOpen) => {
        // ...anything you want to do with notification object.....
        await handlerNotification(notificationOpen.notification.data);
      });

    this.removeNotificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed((notification: Notification) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      });
    this.removeNotificationListener = firebase
      .notifications()
      .onNotification(async (notification: Notification) => {
        // Process your notification as required
      });
  }

  componentWillUnmount() {
    // this.appKilledStateListener();
    this.notificationOpenedListener();
    this.foregroundStateListener();
    this.removeNotificationDisplayedListener();
    this.removeNotificationListener();
    this.messageListener();
  }

  render() {
    return null;
  }
}

export default HandleNotifications;
