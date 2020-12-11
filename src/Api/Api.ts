import { Country } from "./types";

type Config = {
  url: string
}
class Api {
  private url: string;
  constructor(config: Config) {
    this.url = config.url;
  }

  public getCountries = async () => {
    const countries = await fetch(`${this.url}/all`);
    const countriesData: Country[] = await countries.json();
    console.log(countriesData[0], "getcountriesdata")
    return countriesData;
  };

}



export default new Api({url: "https://restcountries.eu/rest/v2"});
