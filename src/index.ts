#!/usr/bin/env node
import fs from "fs";

const root = process.cwd();
const envPath = `${root}/.env.example`;
const envFile = fs.readFileSync(envPath, "utf-8");

const variables = envFile.split("\n").reduce((a, c) => {
  const line = c.trim();
  if (!line.length) return a;
  if (line.startsWith("#")) return a;
  const [key] = line.split("=");
  if (!key) return a;
  a.push(key);
  return a;
}, [] as string[]);

const content = `declare namespace NodeJS {
  interface ProcessEnv {
    ${variables.map((el) => `${el}: string;`).join("\n    ")}
  }
}
`;

const dtsPath = `${root}/env.d.ts`;
console.log(content);
fs.writeFileSync(dtsPath, content);
