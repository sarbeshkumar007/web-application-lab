function analyze(){

// var example
var subject = "Web Programming";

// let example
let passMark = 40;

// const example
const university = "KEC";

// object example
let student = {
name: "Sarbesh",
semester: 5
};

// array of marks
let marks = [55, 72, 38, 90, 41];

// map example (increase 5 grace marks)
let updatedMarks = marks.map(m => m + 5);

// filter example (only passed subjects)
let passed = updatedMarks.filter(m => m >= passMark);

// arrow function example
const average = arr => {
let total = 0;
for(let i=0;i<arr.length;i++){
total += arr[i];
}
return total / arr.length;
};

// spread operator example
let extraMarks = [...updatedMarks, 80];

// normal function
function getHighest(arr){
return Math.max(...arr);
}

document.getElementById("result").innerHTML =
"Student: " + student.name + "<br>" +
"University: " + university + "<br>" +
"Subject: " + subject + "<br><br>" +

"Original Marks: " + marks + "<br>" +
"Marks after Grace (+5): " + updatedMarks + "<br>" +
"Passed Marks: " + passed + "<br>" +
"Average Marks: " + average(updatedMarks) + "<br>" +
"Highest Marks: " + getHighest(extraMarks);

}