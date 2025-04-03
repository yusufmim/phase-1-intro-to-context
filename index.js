// Your code here
// Function to create an employee record from an array
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create multiple employee records from an array of arrays
function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

// Function to add a TimeIn event
function createTimeInEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(" ");
    employee.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    });
    return employee;
}

// Function to add a TimeOut event
function createTimeOutEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(" ");
    employee.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    });
    return employee;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);
    
    return (timeOut.hour - timeIn.hour) / 100;
}

// Function to calculate wages earned on a given date
function wagesEarnedOnDate(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

// Function to calculate total wages for all dates
function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate(employee, event.date);
    }, 0);
}

// Function to calculate total payroll for all employees
function calculatePayroll(employees) {
    return employees.reduce((total, employee) => {
        return total + allWagesFor(employee);
    }, 0);
}
