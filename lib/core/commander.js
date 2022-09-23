import fs from "node:fs"
import path from "node:path"
import { commanderCreate, commanderOpen } from "./action.js"

function commander(program) {
  program.command('create <project> [other...]')
    .alias('crt')
    .description("create project")
    .action(commanderCreate)
    program.command('open <path> [options]')
      .alias('o')
      .description('open directory')
      .action(commanderOpen)
}

export { commander }