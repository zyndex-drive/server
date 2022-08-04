export interface IAddDatabaseResult<T, U> {
  doc: T | U;
  added: boolean;
}

export interface IEditDatabaseResult {
  id: string;
  updated: boolean;
}

export interface IDeleteDatabaseResult {
  id: string;
  deleted: boolean;
}
