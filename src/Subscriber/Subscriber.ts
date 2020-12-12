import React from "react";


type onShowNotification = (e: React.ReactNode) => void;
type onHideNotification = () => void;

interface ISubscriber {
  subscribeShowNotification(fn: onShowNotification): void;
  showNotification(e: React.ReactNode): void;
  subscribeHideNotification(fn: onHideNotification): void;
  hideNotification(): void;
}

class Subscriber implements ISubscriber {
  private onShowNotification?: onShowNotification;
  private onHideNotifications: onHideNotification[] = [];

  public subscribeShowNotification = (fn: onShowNotification) => {
    this.onShowNotification = fn;
  };
  public subscribeHideNotification = (fn: onHideNotification) => {
    this.onHideNotifications = [...this.onHideNotifications, fn];
  };

  public showNotification = (e: React.ReactNode) => {
    if (this.onShowNotification) {
      this.onShowNotification(e);
    }
  };

  public hideNotification = () => {
    if (this.onHideNotifications.length) {
      this.onHideNotifications.map((onHideNotification) =>
        onHideNotification(),
      );
    }
  };
}

export default Subscriber;