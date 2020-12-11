import * as React from "react";
import { Path, Svg } from "react-native-svg";

export default (props: { color?: string }) => (
  <Svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 10C20 4.47692 15.5215 0 10 0C4.47692 0 0 4.47692 0 10C0 15.5231 4.47692 20 10 20C15.5215 20 20 15.5231 20 10ZM9.30005 5.1001C9.85233 5.1001 10.3 5.54781 10.3 6.1001V9.93403L14.0607 11.1898C14.5838 11.3669 14.8643 11.9346 14.6872 12.4577C14.5102 12.9808 13.9425 13.2613 13.4194 13.0842L8.97939 11.5811C8.57332 11.4437 8.30005 11.0627 8.30005 10.6339V6.1001C8.30005 5.54781 8.74776 5.1001 9.30005 5.1001Z"
      fill={props.color || "#B4B8B4"}
    />
  </Svg>
);
