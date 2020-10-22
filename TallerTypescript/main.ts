import { Course } from './course.js';

import { Student } from './student.js';

import { dataCourses } from './dataCourses.js';

import { dataStudents } from './dataStudents.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentsTbody: HTMLElement = document.getElementById('students')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const btnfilterByCreditos: HTMLElement = document.getElementById("button-filterByName")!;
const inputLimitBoxMenor: HTMLInputElement = <HTMLInputElement> document.getElementById("input-box-")!;
const inputLimitBoxMayor: HTMLInputElement = <HTMLInputElement> document.getElementById("input-box+")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

renderCoursesInTable(dataCourses);

renderStudentsInTable(dataStudents);

btnfilterByName.onclick = () => applyFilterByName();

btnfilterByCreditos.onclick = () => applyFilterByCreditos();

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

function renderStudentsInTable(students: Student[]): void {
  console.log('Desplegando cursos');
  students.forEach((student) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${student.nombre}</td>
                           <td>${student.informacion}</td>`;
    studentsTbody.appendChild(trElement);
  });
}


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 
function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByCreditos() { 
  let numMenor = parseInt(inputLimitBoxMenor.value);
  let numMayor = parseInt(inputLimitBoxMayor.value);
  numMenor = (numMenor == null) ? 0 : numMenor;
  numMayor = (numMayor == null) ? 0 : numMayor;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCreditos(numMenor, numMayor, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseByCreditos(numMenor: number, numMayor: number, courses: Course[]) { 
  for (let index = 0; index < courses.length; index++) {
      if (courses[index].credits<=numMayor) {
        if (courses[index].credits>=numMenor) {
          courses.filter( c=> (c.credits <= numMayor && c.credits >= numMenor));
        }
      } 
    }
  }

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}