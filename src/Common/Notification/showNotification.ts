import React from "react";
import Subscriber from "src/Subscriber";

export const showNotification = (message: React.ReactNode) => {
  Subscriber.showNotification(message);
};
