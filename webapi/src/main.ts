import axios, { AxiosResponse } from "axios";
import { Quote, Author } from "./datatypes";

const textInputTable1 = document.getElementById("inputTable1");
const searchButtonTable1 = document.getElementById("btnSearchTable1");
const table1 = document.getElementById("getAuthorInfo");

const textInputTable2 = document.getElementById("inputTable2");
const searchButtonTable2 = document.getElementById("btnSearchTable2");
const table2 = document.getElementById("getQuotesByAuthor");

// Define a click listener on the button 
// Also need to check logic for determining
// if an author exsits
searchButtonTable1?.addEventListener("click", () => {
  removeTable1Data();
  fetchTable1Data();
});

searchButtonTable2?.addEventListener("click", () => {
  removeTable2Data();
  fetchTable2Data();
});

function removeTable1Data() {
  // Use the class name fromAPI to select all the rows
  // in the table which are generated axios data
  const rows: NodeListOf<HTMLTableRowElement> =
    document.querySelectorAll(".fromAPI");

  for (let k = 0; k < rows.length; k++) {
    // Remove the row from the parent (myTable)
    table1?.removeChild(rows[k]);
  }
}

// Using https://programming-quotes-api.herokuapp.com/index.html as documentation
function fetchTable1Data() {
  // Use the text input to find the author
  const input = (textInputTable1 as HTMLInputElement).value;
  const encodedInput = encodeURI((textInputTable1 as HTMLInputElement).value);
  const lookupUrl = "https://programming-quotes-api.herokuapp.com/Authors/" + encodedInput;
  axios
    .request({
      method: "GET",
      url: lookupUrl,
      params: { },
      headers: {
        accept: 'application/json',
      },
      //data: { }
    })
    .then((resp: AxiosResponse) => resp.data)
    .then((a: Author) => {
      // Check if the author exists
      if (a.quoteCount === undefined) {
        // Author does not exist!
        const aRow = document.createElement("tr");
        aRow.setAttribute("class", "fromAPI");
        aRow.setAttribute("id", "notFound");
        table1?.appendChild(aRow);

        const authorCell = document.createElement("td");
        authorCell.innerText = "Author not found in API database"
        aRow.appendChild(authorCell);

        const wikiCell = document.createElement("td");
        wikiCell.innerText = " ";
        aRow.appendChild(wikiCell);

        const numCell = document.createElement("td");
        numCell.innerText = " ";
        aRow.appendChild(numCell);
      } 
      else {
        const aRow = document.createElement("tr");
        aRow.setAttribute("class", "fromAPI");
        table1?.appendChild(aRow);

        const authorCell = document.createElement("td");
        authorCell.innerText = a.name;
        aRow.appendChild(authorCell);

        const wikiCell = document.createElement("td");
        //wikiCell.innerText = encodeURI(a.wikiUrl);
        const wikiCellLink = document.createElement("a");
        wikiCellLink.setAttribute("href", encodeURI(a.wikiUrl));
        wikiCell.appendChild(wikiCellLink);
        const wikiCellDiv = document.createElement("div");
        wikiCellDiv.innerText = encodeURI(a.wikiUrl);
        wikiCellLink.appendChild(wikiCellDiv);
        aRow.appendChild(wikiCell);

        const numCell = document.createElement("td");
        numCell.innerText = a.quoteCount.toString();
        aRow.appendChild(numCell);
      }
    });
}

function removeTable2Data() {
  // Use the class name fromAPI to select all the rows
  // in the table which are generated axios data
  const rows: NodeListOf<HTMLTableRowElement> =
    document.querySelectorAll(".fromAPI2");

  for (let k = 0; k < rows.length; k++) {
    // Remove the row from the parent (myTable)
    table2?.removeChild(rows[k]);
  }
}

function fetchTable2Data() {
  // Use the text input to find the author
  const input = (textInputTable2 as HTMLInputElement).value;
  const encodedInput = encodeURI((textInputTable2 as HTMLInputElement).value);
  const lookupUrl = "https://programming-quotes-api.herokuapp.com/Quotes/author/" + encodedInput;
  axios
    .request({
      method: "GET",
      url: lookupUrl,
      params: { },
      headers: {
        accept: 'application/json',
      },
      //data: { }
    })
    .then((resp: AxiosResponse) => resp.data)
    .then((quoteArray: Array<Quote>) => {
      if (quoteArray.length === 0) {
        const aRow = document.createElement("tr");
          aRow.setAttribute("class", "fromAPI2");
          aRow.setAttribute("id", "notFound");
          table2?.appendChild(aRow);
  
          const authorCell = document.createElement("td");
          authorCell.innerText = "Author not found in API database"
          aRow.appendChild(authorCell);
  
          const quoteCell = document.createElement("td");
          quoteCell.innerText = " ";
          aRow.appendChild(quoteCell);
  
          const idCell = document.createElement("td");
          idCell.innerText = " ";
          aRow.appendChild(idCell);
      }
      for (let k = 0; k < quoteArray.length; k++) {
        const aQuote = quoteArray[k];
        
        const aRow = document.createElement("tr");
        aRow.setAttribute("class", "fromAPI2");
        table2?.appendChild(aRow);
        
        const authorCell = document.createElement("td");
        authorCell.innerText = aQuote.author;
        aRow.appendChild(authorCell);
        
        const quoteCell = document.createElement("td");
        quoteCell.innerText = "\"" +  aQuote.en + "\"";
        aRow.appendChild(quoteCell);
        
        const idCell = document.createElement("td");
        idCell.innerText = aQuote.id;
        aRow.appendChild(idCell);
        
      }
    });
}

fetchTable1Data();
fetchTable2Data();
