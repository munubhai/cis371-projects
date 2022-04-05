<template>
  <div>
    <p>This sample requires an API Key from <a
        href="https://timezonedb.com">TimeZoneDB</a>.
      Once you sign up and get your API key, save it in
      <code>.env.local</code> (in the same directory with
      <code>package.json</code>) in the following format:

    <pre>
        VUE_APP_TIMEZONE_API_KEY=xxxxxxxx
    </pre>
    </p>

    <div>
      <WorldMap @map-clicked="what" />
    </div>
    <input type="text" :value="geoPosition">
    <button @click="searchCity">Add</button>
    <button @click="clearData">Clear last added clock...</button>
    <div id="clocks">
      <Clock v-for="(c,pos) in selectedCities" :key="pos"
        :time-zone="c.timeZone" :label="c.name">
      </Clock>
    </div>
  </div>
</template>

<script lang="ts">
// import ChildComponent from "./60-props-child.vue";
import axios, { AxiosResponse } from "axios";
import Clock from "./70-clock.vue";
import WorldMap from "./70-world-map.vue";
import { Vue, Component } from "vue-property-decorator";
import { CitiesFromDB } from "../views/HomeView.vue";
const timezoneDBUrl = "http://api.timezonedb.com/v2.1";
let Cities = Array<City>();

type City = {
  name: string;
  timeZone: string;
};

export { Cities };
type TimeZoneData = {
  countryName: string;
  gmtOffset: number;
  regionName: string;
  zoneName: string;
};
@Component({ components: { Clock, WorldMap } })
export default class Sample extends Vue {
  geoPos: { lat?: number; lng?: number } = {};
  selectedCities: Array<City> = [];
  apiKey = "";
  mounted(): void {
    Cities = [];
    this.selectedCities = [];
    
    this.apiKey = process.env.VUE_APP_TIMEZONE_API_KEY;

    Cities=(CitiesFromDB);
    this.selectedCities = Cities;
  }
  get geoPosition(): string {
    if (this.geoPos.lat && this.geoPos.lng)
      return `${this.geoPos.lat.toPrecision(5)},${this.geoPos.lng.toPrecision(
        5
      )}`;
    else return "N/A";
  }
  clearData(): void {
    const length = this.selectedCities.length;
    this.selectedCities.pop();
  }

  searchCity(): void {
    const param = new URLSearchParams();
    param.append("key", this.apiKey);
    param.append("format", "json");
    param.append("by", "position");
    param.append("lat", this.geoPos.lat!.toString());
    param.append("lng", this.geoPos.lng!.toString());
    const tzUrl = `${timezoneDBUrl}/get-time-zone?` + param.toString();
    // Use a Web Proxy Server to get around CORS issue
    // since timezonedb.com does not allow CORS
    axios
      .request({
        method: "GET",
        url: "https://api.allorigins.win/get",
        params: {
          url: tzUrl,
        },
      })
      .then((r: AxiosResponse) => {
        return r.data;
      })
      .then((r: any) => JSON.parse(r.contents))
      .then((r: TimeZoneData) => {
        // Add the selected location to our array
        // Check if this city is already in the array
        if (this.selectedCities.findIndex((c) => c.name === r.regionName) === -1) {
          this.selectedCities.push({
            name: r.regionName,
            timeZone: r.zoneName,
          });
          Cities.push({
            name: r.regionName,
            timeZone: r.zoneName,
          });
        }
        console.log(Cities);
        //this.selectedCities.push({ name: r.regionName, timeZone: r.zoneName });
      });
  }

  what(geoPos: { lat: number; lng: number }): void {
    // When the user pans the map left/right the longitude
    // angle can be out of the [-180,+180] range
    while (geoPos.lng > 180) geoPos.lng -= 360;
    while (geoPos.lng < -180) geoPos.lng += 360;
    this.geoPos = { ...geoPos };
  }
}
</script>

<style scoped>
#clocks {
  margin-top: 1em;
}
pre {
  white-space: normal;
  padding: 0.5em;
  border: 2px solid gray;
}
</style>