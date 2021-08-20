const inquirer = require("inquirer");
const fs = require("fs");

const generateMdContent = (answers) =>
  `# ${answers.title}
  ## ${answers.license}
  
  ## Description
  ###### ${answers.description}
  
  ## Install
  ###### ${answers.installation}
  
  ## Usage
  ###### ${answers.usage}
  
  ## Contribute
  ###### ${answers.contribute}
  
  ## Test
  ###### ${answers.test}
  
  ## Github
  #### *${answers.username}* — [GitHub Profile](https://github.com/${answers.username})
  
  ## Email
  ###### ${answers.email}
  `;

inquirer
  .prompt([
    {
      type: "input",
      name: "title",
      message: "Title of the project?",
    },
    {
      type: "input",
      name: "description",
      message: "Description of the project.",
    },
    {
      type: "input",
      name: "installation",
      message: "Installation requirements?",
    },
    {
      type: "input",
      name: "usage",
      message: "How to run the project?",
    },
    {
      type: "list",
      message: "Which license used for the project?",
      name: "license",
      choices: [
        "Apache license 2.0",
        "GNU General Public License v3.0",
        "MIT",
        "none",
      ],
      default: 2,
    },
    {
      type: "input",
      message: "How to contribute for this project?",
      name: "contribute",
    },
    {
      type: "input",
      message: "Link of Demo Video of the project?",
      name: "test",
    },
    {
      type: "input",
      message: "Type your github username?",
      name: "username",
      validate: function (answer) {
        if (answer == "") {
          return "You must enter your github username";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "What is your email address?",
      name: "email",
      validate: function (answer) {
        if (answer == "") {
          return "You must enter email address";
        }
        return true;
      },
    },
  ])
  .then((answers) => {
    let license = answers.license;
    const mdPageContent = generateMdContent(answers);
    fs.writeFile("README.md", mdPageContent, (err) =>
      err ? console.log(err) : console.log("Successfully created README.md!")
    );
    renderBadge(license);
  });

function renderBadge(a) {
  function appendToMd(content) {
    fs.appendFile("README.md", content, (err) =>
      err ? console.log(err) : console.log("Successfully appended README.md!")
    );
    renderBadge(license);
  }

  switch (a) {
    case "Apache license 2.0":
      console.log("foo");
      badge =
        "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
      appendToMd(badge);
      break;
    case "MIT":
      console.log("baz");
      badge =
        "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
      appendToMd(badge);
      break;
    case "GNU General Public License v3.0":
      console.log("doop");
      badge =
        "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
      appendToMd(badge);
      break;
    case "none":
      console.log("zoop");
      badge =
        "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)";
      appendToMd(badge);
      break;
    default:
      console.log("Render badge failed");
      break;
  }
}
