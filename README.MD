# RUN

- run `docker-compose up` in the terminal;
- In another terminal run `docker-compose exec app bash`;

# Settings typescript

- To create this project i ran the comand `npm init` to create the package.json file;
- To install typescript i ran the comand `npm install typescript @types/node --save-dev`;
- To install ts-node to execute directely without compilation i ran the comand `npm install ts-node --save-dev`;
- To fixed the node version for the near version of this image i ran `npm view @types/node` and choose the close version of this node image,
- I changed manually the typescript version in the package.json and ran `rm package-lock.json , rm -rf node_modules/ and npm install`;
- In the package.json i set the script ts-node to ts-node to run `npm run ts-node` and the script tsc;
- To create the tsconfig.json i ran the comand `npx tsc --init`;
- I changed the target of tsconfig.json to es2017, enabled incremental to true set the baseConfit to src folder and create the include attribute to pointer the src folder if i wanna use watch files;
- To test this settings i created in the src folder one file called test.js and ran `npm run tsc`

# Setting jest

- To install jest i ran the comand `npm install jest @types/jest --save-dev`;
- To create the jest.config.ts i ran the comand `npx jest --init`;
- To install SWC i ran the comand `npm install @swc/core @swc/jest --save-dev`;
- I changed the rootDir of jest.config.ts to src folder, set testRegex to watch the test files and set the transofm properties to compile these files with SWC;
