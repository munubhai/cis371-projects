<template>
  <div>
    <h1>Quotes by Author</h1>
    <p><b>Table 2: List all quotes from a given author in the database. Uses GET request to endpoint "/Quotes/author/{author}"</b></p>
    <p>Tips: The search is CASE SENSITIVE. "Grace hopper" will not return information for "Grace Hopper"</p>
    <p><b>Try:</b> Grace Hopper, Bill Gates, Elon Musk, Linus Torvalds</p>
    <label>Author</label>
    <input type="text" v-model.lazy="inputAuthor">
    <button v-on:click="search">Search</button>
    <table v-if="quoteArr.length > 0">
      <tr>
        <th>Author</th>
        <th>Quote</th>
        <th>ID</th>
      </tr>
      <tr v-for="(q,arrIdx) in quoteArr[0]" :key="arrIdx">
        <td>{{q.author}}</td>
        <td>{{q.en}}</td>
        <td>{{q.id}}</td>
      </tr>
    </table>
    <h3 v-if="quoteArr[0].length == 0">Error: Author not found in API database</h3>
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
  background-color: hsl(199, 90%, 60%);
}
table tr:nth-child(even) {
  background-color: hsl(184, 90%, 80%);
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
  quoteArr: Array<Quote> = [];
  inputAuthor = "Elon Musk";
  mounted(): void {
    this.search();
  }
  search(): void {
    axios
      .request({
        method: "GET",
        url: "https://programming-quotes-api.herokuapp.com/Quotes/author/" + encodeURI(this.inputAuthor),
        params: {
          //results: this.numUsers,
        },
      })
      .then((r: AxiosResponse) => r.data)
      .then((r: Quote) => {
        //console.log(r);
        this.quoteArr.splice(0);
        this.quoteArr.push(r);
        console.log(this.quoteArr);
      });
  }
}
</script>