#!/usr/bin/env node

import { program } from "commander";
import fs from "fs";
import path from "path";
import tifel from "..";

program
  .version("1.0.0")
  .description("Convert ternary expressions to if-else statements");

program
  .command("tifel <inputFile> [outputFile]")
  .description("Convert ternary expressions in a file to if-else statements")
  .action((inputFile, outputFile) => {
    const inputPath = path.resolve(inputFile);
    const outputPath = outputFile ? path.resolve(outputFile) : inputPath;

    fs.readFile(inputPath, "utf8", (err, text) => {
      if (err) {
        console.error(`Error reading file: ${err.message}`);
        process.exit(1);
      }

      const result = tifel(text);

      fs.writeFile(outputPath, result, "utf8", (err) => {
        if (err) {
          console.error(`Error writing file: ${err.message}`);
          process.exit(1);
        }

        console.log(`File successfully converted and saved to ${outputPath}`);
      });
    });
  });

program.parse(process.argv);
