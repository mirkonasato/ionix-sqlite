import { SqlDatabase } from './SqlDatabase';

describe('SqlDatabase', () => {

  it('should execute all the initStatements after opening a database', (done) => {
    const createTable = `
      CREATE TABLE IF NOT EXISTS item (
        id INTEGER PRIMARY KEY,
        title TEXT
      )
    `;
    const insert = `INSERT INTO item (id, title) VALUES (NULL, 'Test Item')`;
    const select = `SELECT id, title FROM item`;

    SqlDatabase.open('test.db', [createTable, insert])
      .then(db => db.execute(select))
      .then(resultSet => {
        expect(resultSet.rows.length).toBe(1);
        const item = resultSet.rows.item(0);
        expect(item.title).toBe('Test Item');
        done();
      });
  });

});
