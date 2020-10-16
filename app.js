// Declarations

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Code to start function

async function start() {
    console.log("Time to create your team!");

    // Variable to hold HTML
    let teamHTML = "";

    // Variable to hold number of team members
    let teamSize;

    // Using await expression, inquirer, and prompt to ask user how many members
    await inquirer.prompt(
        {
            type: "number",
            message: "How many members are in your team?",
            name: "noOfTeamMem"
        }
    )
        .then((data) => {

            teamSize = data.noOfTeamMem + 1;
        });

    // Prompt terminates if user enters 0 as a value
    if (teamSize === 0) {
        console.log("There are no members in your team.");
        return;
    }

    for (i = 1; i < teamSize; i++) {

        // Global variable declarations
        let name;
        let id;
        let title;
        let email;

        // Using await expression, inquirer, and prompt to gather information about team members
        await inquirer.prompt([
            {
                type: "input",
                message: `What is employee (${i})'s name?`,
                name: "name"
            },
            {
                type: "input",
                message: `What is the employee (${i})'s id?`,
                name: "id"
            },
            {
                type: "input",
                message: `What is the employee (${i})'s e-mail?`,
                name: "email"
            },
            {
                type: "list",
                message: `What is employee (${i})'s title?`,
                name: "title",
                choices: ["Engineer", "Intern", "Manager"]
            }
        ])
            .then((data) => {

                name = data.name;
                id = data.id;
                title = data.title;
                email = data.email;
            });

        switch (title) {
            case "Manager":

                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your manager's office number?",
                        name: "officeNo"
                    }
                ])
                    .then((data) => {

                        const manager = new Manager(name, id, email, data.officeNo);

                        teamMember = fs.readFileSync("templates/manager.html");

                        teamHTML = teamHTML + "\n" + eval('`' + teamMember + '`');
                    });
                break;

            // User questions if intern is selected
            case "Intern":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What school is your intern attending?",
                        name: "school"
                    }
                ])
                    .then((data) => {
                        const intern = new Intern(name, id, email, data.school);
                        teamMember = fs.readFileSync("templates/intern.html");
                        teamHTML = teamHTML + "\n" + eval('`' + teamMember + '`');
                    });
                break;

            // User questions if engineer is selected
            case "Engineer":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your engineer's GitHub username?",
                        name: "github"
                    }
                ])
                    .then((data) => {
                        const engineer = new Engineer(name, id, email, data.github);
                        teamMember = fs.readFileSync("templates/engineer.html");
                        teamHTML = teamHTML + "\n" + eval('`' + teamMember + '`');
                    });
                break;

        }

    }

    // readFileSync places templates/main.html into a variable
    const mainHTML = fs.readFileSync("templates/main.html");

    // Setting teamHTML inside main template
    teamHTML = eval('`' + mainHTML + '`');

    // writeFile to generated team.html file in output folder
    fs.writeFile("output/team.html", teamHTML, function (err) {

        if (err) {
            return console.log(err);
        }

        console.log("Success!");

    });

}

start();