import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { backgroundColor, errorColor, errorShadowColor, getShadowStyle } from "src/Common/styles";
import Subscriber from "src/Subscriber";

interface Props {
  children: JSX.Element | JSX.Element[] | null;
}

const Notification = (props: Props) => {
  const [notification, setNotification] = useState<React.ReactNode>();
  useEffect(() => {
    Subscriber.subscribeShowNotification(showNotification);
    Subscriber.subscribeHideNotification(hideNotification);
  }, []);

  const showNotification = (e: React.ReactNode) => {
    setNotification(e);
  };

  const hideNotification = () => {
    setNotification(undefined);
  };

  return (
    <View style={styles.container}>
      {notification ? (
        <View style={styles.notificationContainer}>{notification}</View>
      ) : null}
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
  },
  notificationContainer: {
    margin: 16,
    backgroundColor,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: errorColor,
    padding: 8,
    alignItems: "center",
    flexDirection: "row",
    ...getShadowStyle(4, errorShadowColor),
  },
});

export default Notification;
