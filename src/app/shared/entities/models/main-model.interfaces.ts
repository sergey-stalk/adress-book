export interface IRowData {
  name: string;
  patronymic: string;
  phone: string;
  surname: string;
  favorite?: boolean;
}

export interface IFormError {
  name: boolean;
  patronymic: boolean;
  phone: boolean;
  surname: boolean;
}

export interface ITableData {
  data: IRowData[];
  sort?: any;
}


export interface ICheckedEvent {
  id: string;
  value: boolean;
}
