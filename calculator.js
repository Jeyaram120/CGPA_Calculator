let semesterCount = 0;
let subjectCount = 0;
const gradePoints = {
    'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5, 'U': 0,
    'o': 10, 'a+': 9, 'a': 8, 'b+': 7, 'b': 6, 'c': 5, 'u': 0
};

function addSemester() {
    semesterCount++;
    subjectCount = 0;

    const semesterContainer = document.getElementById('semester-container');
    const semesterDiv = document.createElement('div');
    semesterDiv.id = `semester-${semesterCount}`;
    semesterDiv.innerHTML = `<h2>Semester ${semesterCount}</h2>`;
    semesterContainer.appendChild(semesterDiv);
}

function addSubject() {
    if (semesterCount === 0) {
        alert('Please Add a Semester First.');
        return;
    }

    subjectCount++;

    const currentSemesterDiv = document.getElementById(`semester-${semesterCount}`);
    const subjectDiv = document.createElement('div');
    subjectDiv.className = 'subject';
    subjectDiv.innerHTML = `
                <input type="text" value="Subject ${subjectCount}" readonly />
                <input type="text" placeholder="Subject Code or Name" />
                <input type="number" placeholder="Credit of Subject ${subjectCount}" />
            <select>
                <option value="" disabled selected>Select the Subject${subjectCount} Grade</option>
                <option value="O">O</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C">C</option>
            </select>
    `;
    currentSemesterDiv.appendChild(subjectDiv);
}

function calculatePointAverage() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    for (let i = 1; i <= semesterCount; i++) {
        const semesterDiv = document.getElementById(`semester-${i}`);
        const subjects = semesterDiv.getElementsByClassName('subject');
        let totalPoints = 0;
        let totalCredits = 0;

        const table = document.createElement('table');
        table.border = 1;
        const header = table.insertRow();
        header.innerHTML = `
            <th>Subject Code or Name</th>
            <th>Subject Credit</th>
            <th>Grade</th>
            <th>Point Average</th>
        `;

        for (let j = 0; j < subjects.length; j++) {
            const inputs = subjects[j].getElementsByTagName('input');
            const select = subjects[j].getElementsByTagName('select')[0];
            const subjectCode = inputs[1].value;
            const credit = parseFloat(inputs[2].value);
            const grade = select.value.toUpperCase();
            const gradePoint = gradePoints[grade] || 0;
            const pointAverage = credit * gradePoint;

            totalCredits += credit;
            totalPoints += pointAverage;

            const row = table.insertRow();
            row.innerHTML = `
                <td>${subjectCode}</td>
                <td>${credit}</td>
                <td>${grade}</td>
                <td>${pointAverage}</td>
            `;
        }

        const average = totalPoints / totalCredits || 0;
        const footer = table.insertRow();
        footer.innerHTML = `
            <td colspan="3" id >Semester ${i} GPA</td>
            <td>${average.toFixed(2)}</td>
        `;

        resultsDiv.appendChild(table);
    }
}

function calculateCGPA() {
    const resultsDiv = document.getElementById('results');
    const tables = resultsDiv.getElementsByTagName('table');
    let totalAverage = 0;
    let totalSemesters = 0;

    for (let i = 0; i < tables.length; i++) {
        const rows = tables[i].rows;
        const lastRow = rows[rows.length - 1];
        const semesterAverage = parseFloat(lastRow.cells[1].innerText);

        totalAverage += semesterAverage;
        totalSemesters++;
    }

    const cgpa = totalAverage / totalSemesters || 0;
    const cgpaResultDiv = document.getElementById('cgpa-result');
    cgpaResultDiv.innerHTML = `<h2>CGPA: ${cgpa.toFixed(2)}</h2>`;

    
}


//scrolling to result and CGPA
document.getElementById("calculate-cgpa-btn").addEventListener("click", function() {
    document.getElementById("cgpa-result").scrollIntoView({ behavior: "smooth" });
  });
  
  document.getElementById("calculate-gpa-btn").addEventListener("click", function() {
    document.getElementById("results").scrollIntoView({ behavior: "smooth" });
  });
  
  document.getElementById("add-sub").addEventListener("click", function() {
    document.getElementById("cgpa-result").scrollIntoView({ behavior: "smooth" });
  });  
 


// Disable right-click context menu
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// Disable F12, Ctrl+Shift+I, and Ctrl+Shift+J
document.addEventListener('keydown', function (e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J'))) {
        e.preventDefault();
    }
});

// Attempt to detect if the developer tools are open
const element = new Image();
Object.defineProperty(element, 'id', {
    get: function () {
        alert('Developer tools detected! Please close them to continue.');
        return '';
    }
});

// Function to periodically check if developer tools are open
function detectDevTools() {
    console.log(element);
    setTimeout(detectDevTools, 1000);
}

detectDevTools();