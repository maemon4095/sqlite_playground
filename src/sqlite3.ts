import sqlite3InitModule from "@sqlite3";

const log = (...args: unknown[]) => console.log(...args);
const error = (...args: unknown[]) => console.error(...args);

const sqlite3 = await sqlite3InitModule({
    print: log,
    printErr: error
});

export { sqlite3 };