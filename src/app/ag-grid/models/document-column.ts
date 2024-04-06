import { ColDef } from "ag-grid-enterprise";

export interface DocumentColumn {
  sheets: Array<XlsxSheet>
}

export interface XlsxSheet {
  sheetName: string;
  columns: Array<XlsxSColumn>;
  data: Array<any>;
}

export interface XlsxSColumn {
  field: string;
  headerName: string;
  sortable: boolean;
  filter: boolean;
  aggregate: boolean;
  aggFunc: any;
  enableValue: boolean;
  width: number;
  sort: any;
}
