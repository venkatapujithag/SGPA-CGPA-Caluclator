let subjects = [];

let totalCredits = 0;
let totalGradePoints = 0;

let semesterCount = 0;

let currentSemesterCredits = 0;
let currentSemesterGradePoints = 0;


// ADD SUBJECT
function addSubject() {

    let subjectName = document.getElementById("subjectName").value;
    let marks = Number(document.getElementById("marks").value);
    let credits = Number(document.getElementById("credits").value);

    if (
        subjectName === "" ||
        document.getElementById("marks").value === "" ||
        document.getElementById("credits").value === ""
    ) {
        alert("Please enter all subject details.");
        return;
    }

    if (marks < 0 || marks > 100) {
        alert("Marks should be between 0 and 100.");
        return;
    }

    let grade;
    let gradePoint;


    // SAME GRADING SYSTEM AS JAVA

    if (marks >= 90 && marks <= 100) {
        grade = "S";
        gradePoint = 10;
    }
    else if (marks >= 81 && marks <= 89) {
        grade = "A";
        gradePoint = 9;
    }
    else if (marks >= 71 && marks <= 80) {
        grade = "B";
        gradePoint = 8;
    }
    else if (marks >= 61 && marks <= 70) {
        grade = "C";
        gradePoint = 7;
    }
    else if (marks >= 51 && marks <= 60) {
        grade = "D";
        gradePoint = 6;
    }
    else if (marks >= 41 && marks <= 50) {
        grade = "E";
        gradePoint = 5;
    }
    else {
        grade = "F";
        gradePoint = 4;
    }


    subjects.push({
        name: subjectName,
        marks: marks,
        credits: credits,
        grade: grade,
        gradePoint: gradePoint
    });


    displaySubjects();


    document.getElementById("subjectName").value = "";
    document.getElementById("marks").value = "";
    document.getElementById("credits").value = "";
}



// DISPLAY SUBJECTS

function displaySubjects() {

    let table = document.getElementById("subjectTable");

    table.innerHTML = "";


    subjects.forEach(function(subject) {

        let row = table.insertRow();

        row.insertCell(0).innerHTML = subject.name;
        row.insertCell(1).innerHTML = subject.marks;
        row.insertCell(2).innerHTML = subject.credits;
        row.insertCell(3).innerHTML = subject.grade;
        row.insertCell(4).innerHTML = subject.gradePoint;

    });
}



// CALCULATE SGPA

function calculateSGPA() {

    if (subjects.length === 0) {
        alert("Please add subjects first.");
        return;
    }


    let semesterCredits = 0;
    let semesterGradePoints = 0;


    subjects.forEach(function(subject) {

        semesterCredits =
            semesterCredits + subject.credits;

        let product =
            subject.credits * subject.gradePoint;

        semesterGradePoints =
            semesterGradePoints + product;

    });


    let SGPA =
        semesterGradePoints / semesterCredits;


    // Display SGPA

    document.getElementById("sgpaResult").innerHTML =
        "SGPA: " + SGPA.toFixed(2);


    // Display in Final Result

    document.getElementById("finalSGPA").innerHTML =
        "SGPA: " + SGPA.toFixed(2);


    // Save current semester temporarily

    currentSemesterCredits =
        semesterCredits;

    currentSemesterGradePoints =
        semesterGradePoints;


    document.getElementById("semesterSGPA").value =
        SGPA.toFixed(2);
}



// ADD SEMESTER

function addSemester() {

    if (subjects.length === 0) {
        alert("Please add subjects and calculate SGPA first.");
        return;
    }


    if (currentSemesterCredits === 0) {
        alert("Please calculate SGPA first.");
        return;
    }


    // Add current semester to total

    totalCredits =
        totalCredits + currentSemesterCredits;

    totalGradePoints =
        totalGradePoints + currentSemesterGradePoints;


    semesterCount++;


    document.getElementById("semesterList").innerHTML =
        "Semesters added: " + semesterCount;


    // Clear subjects for next semester

    subjects = [];

    displaySubjects();


    // Reset current semester values

    currentSemesterCredits = 0;
    currentSemesterGradePoints = 0;


    document.getElementById("semesterSGPA").value = "";


    alert(
        "Semester " +
        semesterCount +
        " saved successfully!"
    );
}



// CALCULATE CGPA

function calculateCGPA() {

    if (totalCredits === 0) {

        alert("Please add and save at least one semester.");

        return;
    }


    // SAME FORMULA AS YOUR JAVA PROGRAM

    let CGPA =
        totalGradePoints / totalCredits;


    document.getElementById("cgpaResult").innerHTML =
        "CGPA: " + CGPA.toFixed(2);


    document.getElementById("finalCGPA").innerHTML =
        "CGPA: " + CGPA.toFixed(2);


    document.getElementById("finalStudent").innerHTML =
        "Student: " +
        document.getElementById("studentName").value;


    document.getElementById("finalRoll").innerHTML =
        "Roll Number: " +
        document.getElementById("rollNumber").value;
}



// RESET

function resetPage() {

    location.reload();

}