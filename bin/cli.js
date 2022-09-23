#! /usr/bin/env node
import fs from "node:fs"//in case the default name  'node'
import path from "node:path";
import { Command } from 'commander'
import { exec } from "node:child_process"
import { create } from "node:domain";
const program = new Command();
program.option('-f, --framework <framework>', "set framework")
program.option('-s, --silent', "keep silent")
program.command('create <project> [other...]')
  .alias('crt')
  .description("create project")
  .action((projectName, args) => {
    fs.stat(path.join(projectName), (err, stats) => {
      if (err) {
        //errno == -2 means the file or dir not exists
        if (err.errno === -2) {
          createProject(projectName)
        } else {
          console.log("ERROR: ", err);
        }
      } else {
        if (stats.isDirectory()) {
          console.log("Already have this project dir name. Please change other one");
        } else {
          createProject(projectName)
        }
      }
    })
  })

function createProject(projectName) {
  //生成文件夹的指令定死为 mkdir, 不兼容windows
  // exec(`mkdir ${projectName}`, (err) => {
  //   err ? console.log(err) : console.log(`Create directory ${projectName} success`);
  // })
  fs.mkdirSync(path.join(projectName))
  fs.writeFile(path.join(projectName, '.gitignore'), `.vscode\n.DS_store\nnode_modules`,(err) => {
    err ? console.log(err) : console.log(`Create gitignore success`);
  })
  fs.writeFile(path.join(projectName, 'README.md'), `# ${projectName}`, (err) => {
    err ? console.log(err) : console.log(`Create readme success`);
  })
  exec(`cd ${projectName}
    git init
    npm init -y
    yarn add -D @types/node
    code .
  `)
}


program.parse(process.argv)
