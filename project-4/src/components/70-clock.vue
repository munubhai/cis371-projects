<template>
  <div v-bind="{id: isPM}">
    <div>{{time}}</div>
    <div>{{date}}</div>
    <h3 class="truncate">{{label}}</h3>
    <a v-if="this.timeHour <= 12 " id="am"></a>
    <a v-if="this.timeHour >= 12 " id="pm"></a>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ZonedDateTime, ZoneId, DateTimeFormatter } from "@js-joda/core";
import "@js-joda/timezone";
import "@js-joda/locale_en-us";
import { Locale } from "@js-joda/locale_en-us";
const timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

// To show the month name, the Locale must be set
const dateFormatter = DateTimeFormatter.ofPattern("MMM d").withLocale(
  Locale.US
);
@Component
export default class WorldClock extends Vue {
  @Prop() timeZone!: string;
  @Prop() label!: string;

  zdt: ZonedDateTime | null = ZonedDateTime.now();
  timer: number | null = null;
  timeHour = 0;
  isPM = "facePM";
  get time(): string {
    this.timeHour = this.zdt!.hour();
    if (this.timeHour >= 12) {
      this.isPM = "facePM"
    }
    else {
      this.isPM = "faceAM"
    }
    return this.zdt?.format(timeFormatter) ?? "00:00";
  }

  get date(): string {
    // console.log("Local date", this.zdt?.format(dateFormatter));
    return this.zdt?.toLocalDate().format(dateFormatter) ?? "what";
  }

  mounted(): void {
    this.zdt = ZonedDateTime.now(ZoneId.of(this.timeZone));
    this.timer = setInterval(() => {
      this.zdt = ZonedDateTime.now(ZoneId.of(this.timeZone));
    }, 1000);
    // console.log("here", this.timeZone, zdt.toString());
  }

  beforeDestroy(): void {
    if (this.timer) {
      console.log("Delete timer");
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
</script>

<style scoped>
#faceAM {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
  background-color: lightblue;
  border-radius: 0.5em;
  padding: 0.5em;
  margin: 4px;
  width: 6em;
}

#facePM {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
  background-color: rgb(5, 87, 180);
  border-radius: 0.5em;
  padding: 0.5em;
  margin: 4px;
  width: 6em;
}

#faceAM:hover {
  transform: scale(1.05);
}
#faceAM div:first-child {
  font-size: 200%;
}
#facePM:hover {
  transform: scale(1.05);
}
#facePM div:first-child {
  font-size: 200%;
}
.truncate {
  max-width: 5em;
  white-space: nowrap; /* disable text wrap */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>