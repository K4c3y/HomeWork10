const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Employee = require("./lib/Employee");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// path directory for file write
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
// write file 

// render 
const render = require("./lib/htmlRenderer");
// array of employees 
const employees = []



// questions for if manager role is selected 
function questionsToAskManager(type){
    inquirer.prompt([
            {
            message: 'What is your Name?',
            name: 'name',
            type: 'input',
        },
         {
            message: 'Enter your ID',
            name: 'id',
            type: 'input',
        },
        {
            message: 'What is your Email?',
            name: 'email',
            type: 'input',
        },
        {
            message: 'what is your office number?',
            name: 'office',
            type: 'input',
        }
    ] 
    ).then(response=>{
        switch(type){
            case "Manager":
                let manager =  new Manager(response.name, response.id, response.email,response.office, type)
                employees.push(manager)
               newRole()      
            break; 
        }  
    })
}
// questions for intern role
function questionsToAskIntern(type){
    inquirer.prompt([
            {
            message: 'What is your Name?',
            name: 'name',
            type: 'input',
        },
          {
            message: 'Enter your ID?',
            name: 'id',
            type: 'input',
        },
        {
            message: 'What is your Email?',
            name: 'email',
            type: 'input',
        },
        {
            message: 'Where do you study?',
            name: 'school',
            type: 'input',
        }
    ] 
    ).then(response=>{
        switch(type){
            case "Intern":
                let intern =  new Intern(response.name, response.id, response.email,response.school, type)
                employees.push(intern)
                newRole()
            break; 
        }  
    })
}
// questions for Engineer role
function questionsToAskEngineer(type){
    inquirer.prompt([
            {
            message: 'What is your Name?',
            name: 'name',
            type: 'input',
        },
          {
            message: 'Enter your ID?',
            name: 'id',
            type: 'input',
        },
        {
            message: 'What is your Email?',
            name: 'email',
            type: 'input',
        },
        {
            message: 'What is your GitHub?',
            name: 'github',
            type: 'input',
        }
    ] 
    ).then(response=>{
        switch(type){
            case "Engineer":
                let engineer =  new Engineer(response.name, response.id, response.email,response.github, type)
                employees.push(engineer)
                newRole()
            break; 
        }  
    })
}
  // to select a role and populate the correct questions for said role 
function promptRole() {
    return inquirer.prompt({
        message: 'Select a Role',
        name: 'role',
        type: 'list',
        choices: ['Manager', 'Engineer', 'Intern']
    })
    .then(answers => {
        console.log(answers.role)
        //if manager is choosen
        if (answers.role == 'Manager') {
            questionsToAskManager(answers.role);
        }else if (answers.role == 'Engineer') {
            // if engineer is choosen
            questionsToAskEngineer(answers.role); 
        }else {
             // if intern is choosen 
            questionsToAskIntern(answers.role);
        }
    })
    .catch(error => {
        if(err) {
          console.log(error)
        }
    });
}
//create role selection to start or end the process 
function newRole() {
    return inquirer.prompt({
        message: 'Add member to the team?',
        name: 'add',
        type: 'list',
        choices: ['Yes', 'No']
    }).then(answers => {
        if (answers.add == 'Yes') {
            promptRole()
        } else if (answers.add == 'No') {
            
            fs.writeFile(outputPath, render(employees), function (err) {
                if (err) {
                    throw err
                }
            })
            console.log('all done!')
        }
    }).catch(error => {
        if(err) {
            console.log(error)
        }
    })
}

// to show employees are being pushed to the array 
function showEmployees(){
    console.log(employees)
}

promptRole()
 
