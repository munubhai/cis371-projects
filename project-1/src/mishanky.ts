// Get the topmost span element
const spanTop = document.getElementById("insertHere");

// Insert headings
const mainHeading = document.createElement("h1");
const heading2 = document.createElement("h2");
const heading3 = document.createElement("h2");
const heading4 = document.createElement("h2");

mainHeading.id = "main";
heading2.id = "about";
heading3.id = "progress";
heading4.id = "completed";

mainHeading.innerText = "Using TypeScript and HTML";
heading2.innerText = "About me";
heading3.innerText = "Courses in Progress";
heading4.innerText = "Courses Completed";

spanTop?.appendChild(mainHeading);
spanTop?.appendChild(heading2);
spanTop?.appendChild(heading3);
spanTop?.appendChild(heading4);

const personalInfo = {
    name: "Kyle Mishanec",
    email: "mishanky@mail.gvsu.edu",
    pets: 3,
    hobby: ["Skiing", "Hiking", "Board games"],
    hasStudentLoan: true,
 }
 