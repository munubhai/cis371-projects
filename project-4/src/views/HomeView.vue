<template>
  <div class="home">
    <h2>Timezone - CIS 371 - Project 4</h2>
    <p>This is the main page. I got here via {{byWayOf}}</p>
    <p>Author: Kyle Mishanec. Everything is (hopefully) correctly <b>:)</b>. If the time is AM its color will be light blue, if it is PM it will be dark blue.</p>
    <p>{{userInfo}}</p>
    <img :src="userPhotoURL" v-if="userPhotoURL.length > 0" width="64">
    <button @click="logout">Logout</button>
    <button @click="saveData">Save</button>
    <button @click="deleteAccount">Delete Account</button>
    <WorldTime/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import WorldTime from "../components/70-world-time.vue";
import {
  getAuth,
  onAuthStateChanged,
  User,
  Auth,
  signOut,
  deleteUser,
} from "firebase/auth"; 
import { CollectionReference, collection, DocumentReference, doc, updateDoc, Firestore, addDoc, setDoc, getDoc } from "firebase/firestore";
import { firebaseConfig, app, db } from "@/myconfig";
import { Cities } from "../components/70-world-time.vue";
import 'firebase/firestore';

type City = {
  name: string;
  timeZone: string;
};
let CitiesFromDB = Array<City>();
export { CitiesFromDB };

@Component({ components: { WorldTime } })
export default class HomeView extends Vue {
  @Prop() readonly byWayOf!: string;

  userPhotoURL = "";
  auth: Auth | null = null;
  userInfo = "";
  mounted(): void {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, (user: User | null) => {
      console.log("Auth changed", user);
      if (user) {
        this.userPhotoURL = user.photoURL ?? "";
        this.userInfo = `${user.displayName ?? "No Name"}`;
        this.getData();
      }
    });
  }

  logout(): void {
    for (let k in Cities) {
      Cities.pop();
    }
    if (this.auth) signOut(this.auth);
    CitiesFromDB = [];
    Cities.splice(0);
    console.log("logout");
    console.log(CitiesFromDB);
    // Back to the previous page
    this.$router.go(-1);
    //window.location.reload();
  }
 
  saveData(): void {
    const saveDataColl:CollectionReference = collection(db, "saveData");
    const userSaveDataDocument:DocumentReference = doc(saveDataColl, this.auth?.currentUser?.uid);

    const userID = this.auth?.currentUser?.uid;
    const userID2 = "" + userID;
    setDoc(doc(db, "saveData", userID2), {
        dataArray: {
          Cities: Cities,
        }
    });
    
    // db.collection("saveData").doc(this.auth?.currentUser?.uid).set({
    //   dataArray: {
    //     Cities: Cities,
    //   }
    // });
  }
  getData(): void {
    const userID = this.auth?.currentUser?.uid;
    const userID2 = "" + userID;
    getDoc(doc(db, "saveData", userID2)).then((doc) => {
      for (let k in doc.data()?.dataArray?.Cities) {
        if (CitiesFromDB.findIndex((c) => c.name === doc.data()?.dataArray?.Cities[k].name) === -1) {
          CitiesFromDB.push(doc.data()?.dataArray?.Cities[k]);
        }
      }
    })  
  }
  deleteAccount(): void {
    const userAuth = getAuth();
    const user = userAuth.currentUser;
    user?.delete().then(() => {
      this.logout();
      console.log("User deleted");
    }).catch((error) => {
      // Some error occurred
    });
  }
}
</script>
