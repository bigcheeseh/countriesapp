declare module "react-native-flags" {
  export default class Flag extends React.Component<{
    code: string;
    size: number;
    type?: "flat" | "shiny";
  }> {}
}
