students = new Array();

async function populate() {
    const requestURL = "https://api.jsonbin.io/v3/qs/674d4c9ce41b4d34e45e30c1";
    const request = new Request(requestURL);

    const response = await fetch(request);
        if (response.ok) {
            const stu = await response.json();

            newStudent(stu.record);
            showHeader();
            showStudent();
        } else {
            alert("Помилка");
        }
}

function newStudent(obj) {
    let stu = obj;
    for (let s of stu) {
        let stud = new Student(s.name, s.group);
        students.push(stud);
    }
}

function showHeader() {
    const header = document.querySelector("header");
    const myH1 = document.createElement("h1");
    myH1.innerText = "Список студентів по групам";
    header.appendChild(myH1);
}

function showStudent() {
    const main = document.querySelector("article");

    main.innerHTML = "";

    const groupedStudents = {};

    for (const student of students) {

        if (!groupedStudents[student.group]) {
            groupedStudents[student.group] = [];
        }
        groupedStudents[student.group].push(student.name);
    }

    for (const group in groupedStudents) {
        const groupContainer = document.createElement("div");
        groupContainer.className = "group";

        const groupTitle = document.createElement("h2");
        groupTitle.innerText = group;
        groupContainer.appendChild(groupTitle);

        const studentList = document.createElement("ul");
        groupedStudents[group].forEach(name => {
            const studentItem = document.createElement("li");
            studentItem.innerText = name;
            studentList.appendChild(studentItem);
        });
        groupContainer.appendChild(studentList);

        main.appendChild(groupContainer);
    }
}

populate();
