#!/usr/bin/env node

import { Command } from "commander"
const program = new Command()
import { help } from '../lib/core/help.js'
import { commander } from '../lib/core/commander.js'
help(program)
commander(program)

program.parse(process.argv)
