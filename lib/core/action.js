import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process"

function commanderCreate(projectName, args) {
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
}

function createProject(projectName) {
  //生成文件夹的指令定死为 mkdir, 不兼容windows
  // exec(`mkdir ${projectName}`, (err) => {
  //   err ? console.log(err) : console.log(`Create directory ${projectName} success`);
  // })
  fs.mkdirSync(path.join(projectName))
  fs.writeFile(path.join(projectName, '.gitignore'), `.vscode\n.DS_store\nnode_modules`, (err) => {
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

function commanderOpen(dirPath, args) {
  fs.opendir(dirPath, (err, dir) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Path of the directory:", dir.path);
      exec(`wslview ${dir.path}`)
      console.dir(dir);
      console.log("Closing the directory");
      dir.closeSync()
    }
  })
}

export { commanderCreate, commanderOpen }