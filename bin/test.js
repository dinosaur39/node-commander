#!/usr/bin/env node
import fs from "fs"
// import minimist from "minimist"
import { exec } from "node:child_process";

exec(`mkdir test 
  cd test
  touch a.txt
`)