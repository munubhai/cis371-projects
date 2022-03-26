<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Quotes from Programmers, this time in Vue.js!</h1>
    <p>Author: Kyle Mishanec. </p>
    <p>This API consists of a database of quotes from famous programmers. There are 2 tables.
    Table 1 is to lookup an author by name and print their Wikipedia link as well as the number of quotes they have
    in the database. Table 2 is to list all the quotes from an author in the database.
    </p>
    <p>I have also implemented error checking. If an author is not found in the API's database, it will display an error. 
    Try it out!
    </p>
    <p>API: <a href="https://programming-quotes-api.herokuapp.com/index.html"><code>https://programming-quotes-api.herokuapp.com/index.html</code></a></p>
    <Author />
    <Quote />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Quote from './components/Quote.vue';
import Author from './components/Author.vue';

@Component({
  components: {
    Quote,
    Author,
  },
})
export default class App extends Vue {}
</script>
