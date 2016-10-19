import { SqlResultSetRows } from './SqlResultSetRows';

export interface SqlResultSet {

  insertId: number;
  rowsAffected: number;
  rows: SqlResultSetRows;

}
