import React from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { hideNotification } from "src/Common/Notification/hideNotification";
import { showNotification } from "src/Common/Notification/showNotification";
import { errorColor } from "src/Common/styles";
import { Country } from "./types";

type Config = {
  url: string;
  headers?: { [key: string]: string };
};

class Api {
  private url: string;
  private headers: Config["headers"];

  constructor(config: Config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  public getCountries = async () => {
    const countries = await this.handleRequest(() =>
      fetch(`${this.url}/all`, { headers: this.headers }),
    );
    const countriesData: Country[] = (await countries.json()) as Country[];
    return countriesData;
  };

  private handleRequest = async (
    request: () => Promise<Response>,
  ): Promise<Response> => {
    try {
      const res = await request();
      hideNotification();
      return res;
    } catch (e) {
      showNotification(
        <>
          <Text>reconnecting</Text>
          <ActivityIndicator style={styles.spinner} color={errorColor} />
        </>,
      );
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const res = await this.handleRequest(request);
      return res;
    }
  };
}

const styles = StyleSheet.create({
  errorContainer: { padding: 8 },
  spinner: { marginHorizontal: 4 },
});

export default new Api({
  url: "https://restcountries.eu/rest/v2",
  headers: { "Cache-Control": "no-cache" },
});
