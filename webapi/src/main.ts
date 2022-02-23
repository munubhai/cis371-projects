import axios, { AxiosResponse } from "axios";
import { AuthorResponse, Author } from "./datatypes";

const limitInput: Element | null = document.getElementById("input1");
const fetchBtn = document.getElementById("btn1");
const myTable = document.getElementById("mars");

// Define a click listener on the button
// fetchBtn?.addEventListener("click", () => {
//   removeOldData();
//   fetchNewData();
// });

// function removeOldData() {
//   // Use the class name fromAPI to select all the rows
//   // in the table which are generated axios data
//   const rows: NodeListOf<HTMLTableRowElement> =
//     document.querySelectorAll(".fromAPI");

//   for (let k = 0; k < rows.length; k++) {
//     // Remove the row from the parent (myTable)
//     myTable?.removeChild(rows[k]);
//   }
// }
// Using https://programming-quotes-api.herokuapp.com/index.html as documentation
function fetchNewData() {
  // Use the user input to control the number of random users to fetch
  //const fetchLimit = (limitInput as HTMLInputElement)?.value ?? 10;
  axios
    .request({
      method: "GET",
      url: "https://programming-quotes-api.herokuapp.com/Authors/Tony%20Hoare",
      params: { },
      headers: {
        accept: 'application/json',
      },
      //data: { }
    })
    .then((resp: AxiosResponse) => resp.data)
    .then((a: Author) => {
      console.log(a.name);
      // for (let k = 0; k < ru.results.length; k++) {
      //   const u: Author = ru.results[k];
      //   const aRow = document.createElement("tr");
      //   console.log(u.name);
      //   // Use a unique class name so it is easy to remove rows later
      //   aRow.setAttribute("class", "fromAPI");
      //   myTable?.appendChild(aRow);

      //   // Create a table data cell to show first name and last name
      //   const nameCell = document.createElement("td");
      //   //nameCell.innerText = `${u.name.first} ${u.name.last}`;
      //   nameCell.innerText = u.name;
      //   aRow.appendChild(nameCell);

      //   // Create a table data cell to show date of birth
      //   const DOBCell = document.createElement("td");
      //   //DOBCell.innerText = u.dob.date.substring(0, 10);
      //   aRow.appendChild(DOBCell);
      //   aRow.appendChild(DOBCell);

      //   // Create a table data cell to show the picture
      //   const photoCell = document.createElement("td");
      //   aRow.appendChild(photoCell);
      //   const image = document.createElement("img");
      //   //image.setAttribute("src", u.picture.thumbnail);
      //   photoCell.appendChild(image);
      // }
    });
}

fetchNewData();
