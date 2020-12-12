import Subscriber from "src/Subscriber";
import React from "react";

export const showNotification = (
  message: React.ReactNode,
) => {
  Subscriber.showNotification({
    text: message,
  });
};
