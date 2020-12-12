import React from 'react';
import { Country } from "./types";
import { showNotification} from "src/Common/Notification/showNotification"
import { hideNotification } from "src/Common/Notification/hideNotification"
import { Text, ActivityIndicator } from 'react-native';

type Config = {
  url: string
  headers?: { [key: string]: string}
}
class Api {
  private url: string;
  private headers: Config["headers"];
  constructor(config: Config) {
    this.url = config.url;
    this.headers = config.headers
  }

  public getCountries = async () => {
    const countries = await this.handleRequest(() => fetch(`${this.url}/all`, { headers: this.headers }));
    const countriesData: Country[] = await countries.json();
    return countriesData;
  };

  private handleRequest = async (request: () => Promise<Response>): Promise<Response> => {
    try {
      const res = await request();
      hideNotification();
      return res;
    } catch(e) {
      showNotification(<Text style={{padding: 8 }}>
        <Text>reconnecting</Text>
        <ActivityIndicator style={{ width: 50, height: 10 }} color="red" />
      </Text>)
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const res = await this.handleRequest(request);
      return res;
    }
  }
}



export default new Api({ 
    url: "https://restcountries.eu/rest/v2",
    headers: {'Cache-Control': 'no-cache'}
  });
