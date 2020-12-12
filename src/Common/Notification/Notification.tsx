import Subscriber, { NotificationEvent } from "src/Subscriber";
import React from "react";
import { View } from 'react-native';
import { getShadowStyle } from "src/Common/styles";

interface Props {

  onHideNotification?(): void;
}

interface State {
  isVisible: boolean;
  notification: NotificationEvent;
}

class Notification extends React.PureComponent<Props, State> {

  public initialNotificationEvent = {
    text: "",
  };
  public state: State = {
    notification: this.initialNotificationEvent,
    isVisible: false,
  };
  public componentDidMount = () => {
    Subscriber.subscribeShowNotification(this.showNotification);
    Subscriber.subscribeHideNotification(this.hideNotification);
  };
  public render() {
    if (!this.state.isVisible) {
      return null;
    }

    return <View style={{ margin: 16, backgroundColor: "#fff", borderRadius: 8, borderWidth: 1, borderColor: "red", ...getShadowStyle(4)}}>{this.state.notification.text}</View>
  }

  private showNotification = (e: NotificationEvent) => {
    this.setState({ notification: e, isVisible: true });
  };

  private hideNotification = () => {
    this.setState(
      { notification: this.initialNotificationEvent, isVisible: false },
      this.props.onHideNotification,
    );
  };
}

export default Notification;
