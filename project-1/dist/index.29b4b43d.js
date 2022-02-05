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
// Stuff under About Me
const personalInfo = {
    name: "Kyle Mishanec",
    email: "mishanky@mail.gvsu.edu",
    pets: 3,
    hobby: [
        "Skiing",
        "Hiking",
        "Board games"
    ],
    hasStudentLoan: true
};
const anyInfo = personalInfo;
// Make a new table element
const tableMain = document.createElement("table");
tableMain.id = "personalInfoTable";
tableMain.setAttribute("border", "1px solid black");
tableMain.setAttribute("width", "40%");
tableMain.setAttribute("height", "40%");
spanTop?.appendChild(tableMain);
for(let i in personalInfo){
    // Add the elements to the table
    const row = document.createElement("tr");
    const title = document.createElement("td");
    const data = document.createElement("td");
    // Add the main row element
    tableMain.appendChild(row);
    // Add the leftmost column (title)
    data.innerText = anyInfo[i];
    title.innerText = i;
    row.appendChild(title);
    // Check for array
    if (Array.isArray(anyInfo[i])) {
        const list = document.createElement("ul");
        for(let j in anyInfo[i]){
            const listItem = document.createElement("li");
            listItem.innerText = anyInfo[i][j];
            list.appendChild(listItem);
        }
        row.appendChild(list);
        continue;
    }
    // If not an array, just add the data
    row.appendChild(data);
}
// Course arrays
const onGoing = [
    {
        code: "CIS 343",
        name: "Structure of a Programming Language",
        credits: 3,
        classTimes: [
            "Mon 12-12:50",
            "Wed 12-12:50",
            "Fri 12-12:50"
        ]
    },
    {
        code: "CIS 371",
        name: "Web Application Development",
        credits: 3,
        classTimes: [
            "Mon 2-2:50",
            "Wed 2-2:50",
            "Fri 2-2:50"
        ]
    },
    {
        code: "CIS 351",
        name: "Computer Organization and Assembly Language",
        credits: 4,
        classTimes: [
            "Mon 3-3:50",
            "Wed 3-3:50",
            "Fri 3-3:50"
        ]
    },
    {
        code: "CIS 290",
        name: "Professional Responsibilities and Practices",
        credits: 3,
        classTimes: [
            "Tue 10-11:15",
            "Thu 10-11:15"
        ]
    }
];
const completed = [
    {
        code: "MTH 201",
        name: "Calculus I",
        credits: 4,
        semesterCompleted: "Fall 2019"
    },
    {
        code: "CIS 163",
        name: "Computer Science II",
        credits: 4,
        semesterCompleted: "Fall 2019"
    },
    {
        code: "HNR 280",
        name: "Water in a Changing World",
        credits: 6,
        semesterCompleted: "Fall 2019"
    },
    {
        code: "HNR 280",
        name: "SWS Water in a Changing World",
        credits: 6,
        semesterCompleted: "Winter 2020"
    },
    {
        code: "MTH 225",
        name: "Discrete Structures: Computer Science",
        credits: 3,
        semesterCompleted: "Winter 2020"
    },
    {
        code: "STA 215",
        name: "Introductory Applied Statistics",
        credits: 3,
        semesterCompleted: "Winter 2020"
    },
    {
        code: "COM 201",
        name: "Speech",
        credits: 3,
        semesterCompleted: "Winter 2020"
    },
    {
        code: "BMS 202",
        name: "Anatomy and Physiology",
        credits: 4,
        semesterCompleted: "Fall 2020"
    },
    {
        code: "GEO 111",
        name: "Exploring the Earth",
        credits: 4,
        semesterCompleted: "Fall 2020"
    },
    {
        code: "STA 216",
        name: "Intermediate Applied Statistics",
        credits: 3,
        semesterCompleted: "Fall 2020"
    },
    {
        code: "WRT 350",
        name: "SWS Business Communication",
        credits: 3,
        semesterCompleted: "Fall 2020"
    },
    {
        code: "CIS 263",
        name: "Data Structures and Algorithms",
        credits: 3,
        semesterCompleted: "Winter 2021"
    },
    {
        code: "ART 271",
        name: "Digital 3-D Modeling and Design",
        credits: 3,
        semesterCompleted: "Winter 2021"
    },
    {
        code: "MTH 325",
        name: "Discrete Structures: Computer Science 2",
        credits: 3,
        semesterCompleted: "Winter 2021"
    },
    {
        code: "CLA 231",
        name: "Health and Science in Antiquity",
        credits: 3,
        semesterCompleted: "Winter 2021"
    },
    {
        code: "ECO 210",
        name: "Introductory Macroeconomics",
        credits: 3,
        semesterCompleted: "Winter 2021"
    },
    {
        code: "CIS 353",
        name: "Database",
        credits: 3,
        semesterCompleted: "Fall 2021"
    },
    {
        code: "CIS 350",
        name: "Introduction to Software Engineering",
        credits: 3,
        semesterCompleted: "Fall 2021"
    },
    {
        code: "HNR 350",
        name: "Remembering 9/11",
        credits: 3,
        semesterCompleted: "Fall 2021"
    },
    {
        code: "CIS 241",
        name: "System-Level Programming and Utilities",
        credits: 3,
        semesterCompleted: "Fall 2021"
    }
];
spanTop?.appendChild(heading3);
// Courses in progress
const listCourseProgress = document.createElement("ol");
spanTop?.appendChild(listCourseProgress);
for(let i1 in onGoing){
    const course = document.createElement("li");
    course.innerText = onGoing[i1].code + " " + onGoing[i1].name + " (" + onGoing[i1].credits + " credits)";
    listCourseProgress.appendChild(course);
    const times = document.createElement("ul");
    course.appendChild(times);
    for(let j in onGoing[i1].classTimes){
        const time = document.createElement("li");
        time.innerText = onGoing[i1].classTimes[j];
        times.appendChild(time);
    }
}
spanTop?.appendChild(heading4);
// Courses completed
const tableCourseCompleted = document.createElement("table");
spanTop?.appendChild(tableCourseCompleted);
// Table heading row
const tableHeadingRow = document.createElement("tr");
tableCourseCompleted.appendChild(tableHeadingRow);
const tableHeading1 = document.createElement("th");
const tableHeading2 = document.createElement("th");
const tableHeading3 = document.createElement("th");
tableHeading1.innerText = "Course";
tableHeading2.innerText = "Credit";
tableHeading3.innerText = "Completed";
tableHeadingRow.appendChild(tableHeading1);
tableHeadingRow.appendChild(tableHeading2);
tableHeadingRow.appendChild(tableHeading3);
let totalCredits = 0;
// For loop for the courses
for(let i2 in completed){
    totalCredits += completed[i2].credits;
    const newRow = document.createElement("tr");
    tableCourseCompleted.appendChild(newRow);
    const codeName = document.createElement("td");
    const credits = document.createElement("td");
    const semesterCompleted = document.createElement("td");
    codeName.innerText = completed[i2].code + " " + completed[i2].name;
    credits.innerText = completed[i2].credits.toString();
    semesterCompleted.innerText = completed[i2].semesterCompleted;
    newRow.appendChild(codeName);
    newRow.appendChild(credits);
    newRow.appendChild(semesterCompleted);
}
// Total credits row
const totalRow = document.createElement("tr");
tableCourseCompleted.appendChild(totalRow);
const totalName = document.createElement("td");
const totalNameB = document.createElement("b");
totalNameB.innerText = "Total Credits Completed: ";
totalRow.appendChild(totalName);
totalName.appendChild(totalNameB);
const totalNum = document.createElement("td");
totalNum.innerText = totalCredits.toString();
totalRow.appendChild(totalNum);

//# sourceMappingURL=index.29b4b43d.js.map
