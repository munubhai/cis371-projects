<template>
  <div>
    <h1>Find Author by Name</h1>
    <p><b>Table 1: Search for author information. Uses GET request to endpoint "/Authors/{author}"</b></p>
    <p>Tips: The search is CASE SENSITIVE. "Grace hopper" will not return information for "Grace Hopper"</p>
    <p><b>Try:</b> Grace Hopper, Bill Gates, Elon Musk, Linus Torvalds</p>
    <label>Author</label>
    <input type="text" v-model.lazy="inputAuthor">
    <button v-on:click="search">Search</button>
    <table v-if="authArr[0].quotes.length !== 0">
      <tr>
        <th>Author</th>
        <th>Quote Count</th>
        <th>Wikipedia URL</th>
      </tr>
      <tr v-for="(a,arrIdx) in authArr" :key="arrIdx">
        <td>{{a.name}}</td>
        <td>{{a.quoteCount}}</td>
        <td>{{a.wikiUrl}}</td>
      </tr>
    </table>
    <h3 v-if="authArr[0].quotes.length == 0">Error: Author not found in API database</h3>
  </div>
</template>
<style scoped>
input {
  margin-left: 0.5em;
}
table {
  margin-top: 8px;
}
table tr:nth-child(odd):not(:first-child) {
  background-color: hsl(113, 90%, 60%);
}
table tr:nth-child(even) {
  background-color: hsl(101, 90%, 80%);
}
table tr > td {
  padding: 0.5em;
}
</style>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import { Quote, Author, QuoteResults } from "@/datatypes";
@Component
export default class QuoteComponent extends Vue {
  authArr: Array<Author> = [];
  inputAuthor = "Edsger W. Dijkstra";
  mounted(): void {
    this.search();
  }
  search(): void {
    axios
      .request({
        method: "GET",
        url: "https://programming-quotes-api.herokuapp.com/Authors/" + encodeURI(this.inputAuthor),
        params: {
          //results: this.numUsers,
        },
      })
      .then((r: AxiosResponse) => r.data)
      .then((r: Author) => {
        //console.log(r);
        r.wikiUrl = encodeURI(r.wikiUrl);
        this.authArr.splice(0);
        this.authArr.push(r);
        console.log(this.authArr);
      });
  }
}
</script>