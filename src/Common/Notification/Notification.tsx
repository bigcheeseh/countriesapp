import Subscriber from "src/Subscriber";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from 'react-native';
import { getShadowStyle, backgroundColor, errorColor } from "src/Common/styles";

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

  return (<>
      {notification ? <View style={styles.container}>{notification}</View> : null}
      {props.children}
    </>
  )
}

const styles = StyleSheet.create({
  container: { margin: 16, backgroundColor, borderRadius: 8, borderWidth: 1, borderColor: errorColor, ...getShadowStyle(4)}
})

export default Notification;
