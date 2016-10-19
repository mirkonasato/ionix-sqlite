# IoniX SQLite

This project aims to make it easier to work with SQLite in Ionic 2 apps.

As it has no actual dependencies on Ionic it could be used in other Cordova applications as well. However the published NPM package contains ES2015 modules intended to work well with Ionic 2 builds.

In case you wonder, **IoniX** stands for "Ionic eXtensions". It's a name chosen to suggest that this package is related to Ionic, but is not an official Ionic project.

## Why not just use Ionic Native?

[Ionic Native](https://ionicframework.com/docs/v2/native/) is a wonderful project that wraps many useful Cordova plugins including [SQLite](https://ionicframework.com/docs/v2/native/sqlite/).

However this project offers a few more features in addition to wrapping the Cordova SQLite plugin:

* It works in the browser (both `ionic serve` and `ionic run browser`) and not just on Android/iOS/Windows, by defaulting to WebSQL when the Cordova plugin is not available. (Note: the WebSQL standard is deprecated and support for it may be removed from Chrome at some point. Not a big deal, it works for now and we'll figure out a workaround if and when we need to.)
* No need to wait for [deviceready](http://cordova.apache.org/docs/en/6.x/cordova/events/events.html#deviceready) or [Platform.ready()](http://ionicframework.com/docs/v2/api/platform/Platform/#ready); this is handled for you.
* When opening a database you can speficy one or more SQL statements to e.g. create all the required tables, and it will return a Promise that resolves only when the db has been fully initialised.
* This project works with either the [cordova-sqlite-storage](https://github.com/litehelpers/Cordova-sqlite-storage) or the [cordova-plugin-sqlite-2](https://github.com/nolanlawson/cordova-plugin-sqlite-2) plugins. Install whichever you prefer.

## Usage

Install with npm:

```
npm install --save ionix-sqlite
```

Import and use a follows:

```TypeScript
import { SqlDatabase } from 'ionix-sqlite';
import { Item } from './item.model';

export class ItemService {

  private dbPromise: Promise<SqlDatabase>;

  constructor() {
    const createItemsTable = `
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY,
        title TEXT,
        description TEXT
      )
    `;
    this.dbPromise = SqlDatabase.open('items.db', [createItemsTable]);
  }

  getItems(): Promise<Item[]> {
    const select = 'SELECT id, title, description FROM items';
    return this.dbPromise
      .then(db => db.execute(select))
      .then(resultSet => resultSet.rows);
  }

}
```
