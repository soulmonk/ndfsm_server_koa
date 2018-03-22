/*
If you want to read the files in parallel, you cannot use forEach indeed.
Each of the async callback function calls does return a promise,
but you're throwing them away instead of awaiting them. Just use map instead,
and you can await the array of promises that you'll get with Promise.all:*/

async function printFiles() {
  const fs = require('mz/fs');

  const getFilePaths = () => new Promise(resolve => resolve([__filename]));

  const files = await getFilePaths();

  await Promise.all(files.map(async (file) => {
    const contents = await fs.readFile(file, 'utf8');
    console.log(contents);
  }));
}
