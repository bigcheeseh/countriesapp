import Subscriber from "src/Subscriber";
import React from "react";
import { View, StyleSheet } from 'react-native';
import { getShadowStyle, backgroundColor, errorColor } from "src/Common/styles";

interface Props {

  onHideNotification?(): void;
}

interface State {
  isVisible: boolean;
  notification?: React.ReactNode;
}

class Notification extends React.PureComponent<Props, State> {
  public state: State = {
    isVisible: false,
  };
  public componentDidMount = () => {
    Subscriber.subscribeShowNotification(this.showNotification);
    Subscriber.subscribeHideNotification(this.hideNotification);
  };

  public render() {
    return (
      <>
        {this.state.notification ? <View style={styles.container}>{this.state.notification}</View> : null}
        {this.props.children}
      </>
    )
  }

  private showNotification = (e: React.ReactNode) => {
    this.setState({ notification: e, isVisible: true });
  };

  private hideNotification = () => {
    this.setState(
      { notification: undefined, isVisible: false },
      this.props.onHideNotification,
    );
  };
}

const styles = StyleSheet.create({
  container: { margin: 16, backgroundColor, borderRadius: 8, borderWidth: 1, borderColor: errorColor, ...getShadowStyle(4)}
})

export default Notification;
