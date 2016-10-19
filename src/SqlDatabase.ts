import { isBrowser } from './platform';
import { SqlResultSet } from './SqlResultSet';

export class SqlDatabase {

  constructor(private _db: any) { }

  static open(name: string, initStatements: string[] = []): Promise<SqlDatabase> {
    let dbPromise = isBrowser()
      .then(browser => {
        const openDatabase = browser ? openBrowserDatabase : openCordovaDatabase;
        return openDatabase(name);
      });
    if (initStatements.length === 0) {
      return dbPromise;
    }
    let _db: SqlDatabase;
    // execute the first statement and capture the _db
    dbPromise.then(db => {
      _db = db;
      return db.execute(initStatements.shift());
    });
    // execute all the other statements (if any) sequentially
    for (let sql of initStatements) {
      dbPromise = dbPromise.then(() => _db.execute(sql));
    }
    // resolve the _db only after all statements have completed
    return new Promise((resolve, reject) => {
      dbPromise.then(() => resolve(_db)).catch(reject);
    });
  }

  execute(statement: string, params: any[] = []): Promise<SqlResultSet> {
    return new Promise((resolve, reject) => {
      this._db.transaction(tx => tx.executeSql(statement, params, (tx, resultSet) => {
        resolve(resultSet);
      }, (tx, error) => {
        reject(error)
      }));
    });
  }

}

declare var sqlitePlugin: any;

function openCordovaDatabase(name: string): Promise<SqlDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof sqlitePlugin === 'undefined') {
      reject(new Error('[ionix-sqlite] sqlitePlugin global object not found; did you install a Cordova SQLite plugin?'));
    }
    const db = sqlitePlugin.openDatabase({
      name: name,
      location: 'default'
    });
    console.info('[ionix-sqlite] using Cordova sqlitePlugin');
    resolve(new SqlDatabase(db));
  });
}

declare function openDatabase(name: string, version: string, desc: string, size: number): any;

function openBrowserDatabase(name: string): Promise<SqlDatabase> {
  return new Promise((resolve, reject) => {
    try {
      const db = openDatabase(name, '1.0', name, -1);
      console.info('[ionix-sqlite] using WebSQL');
      resolve(new SqlDatabase(db));
    } catch (error) {
      reject(error);
    }
  });
}
