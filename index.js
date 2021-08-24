const inquirer = require("inquirer");
const fs = require("fs");

const generateMdContent = (answers) =>
  `
  # ${answers.title}
  ### ${answers.description} 
  
  ${renderBadge(answers.license)}
  ###### ${renderDescription(answers.license)}

  # Table of Contents  
  ### [Install](#install)  
  ### [Usage](#usage) 
  ### [Contribute](#contribute) 
  ### [Test](#test)
  ### [Questions](#questions) 
  
  ## Install
  #### ${answers.installation}
  
  ## Usage
  #### ${answers.usage}
  
  ## Contribute
  #### ${answers.contribute}
  
  ## Test
  #### ${answers.test}
  
  ## Questions
  #### *${answers.username}* — [GitHub Profile](https://github.com/${
    answers.username
  })
  #### Contact me at ${answers.email}.
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
    const mdPageContent = generateMdContent(answers);
    fs.writeFile("README.md", mdPageContent, (err) =>
      err ? console.log(err) : console.log("Successfully created README.md!")
    );
  });

function renderBadge(badgeType) {
  const apache =
    "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
  const mit =
    "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
  const gnu =
    "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
  const none =
    "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)";

  if (badgeType === "Apache license 2.0") {
    return apache;
  } else if (badgeType === "MIT") {
    return mit;
  } else if (badgeType === "GNU General Public License v3.0") {
    return gnu;
  } else {
    return none;
  }
}

function renderDescription(badgeType) {
  const apacheD =
    "Licensed under the Apache License, Version 2.0 (the 'License'); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.";
  const mitD =
    "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.";
  const gnuD =
    "This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or at your option any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with this program.  If not, see http://www.gnu.org/licenses.";
  const noneD =
    "Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means. In jurisdictions that recognize copyright laws, the author or authors of this software dedicate any and all copyright interest in the software to the public domain. We make this dedication for the benefit of the public at large and to the detriment of our heirs and successors. We intend this dedication to be an overt act of relinquishment in perpetuity of all present and future rights to this software under copyright law.THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.";

  if (badgeType === "Apache license 2.0") {
    return apacheD;
  } else if (badgeType === "MIT") {
    return mitD;
  } else if (badgeType === "GNU General Public License v3.0") {
    return gnuD;
  } else {
    return noneD;
  }
}
