import { ColDef, SortDirection } from "ag-grid-enterprise";

export abstract class CommonColumn implements ColDef {

  public headerName: string = "";
  public field: string = "";
  public filter: string = "";
  public sort: SortDirection = 'asc';

  public editable: boolean = false;
  public hide: boolean = false;
  public headerCheckboxSelection: boolean = false;
  public lockPosition: boolean = false;

  public cellClassRules: any;
  public cellEditor: any;
  public cellEditorParams: any;
  public filterParams: any;
  public checkboxSelection: any;
  public cellRenderer: any;
  public menuTabs: any;
  public isRowSelectable: any;

  public onCellValueChanged: any;
  public onCellClicked: any;

  public width: number = 50;
  public minWidth: number = 30;

  constructor(headerName: string,
              field: string,
              sort = null) {
    this.initColDef(headerName, field, sort);
  }

  initColDef(headerName: string, field: string, sort: SortDirection = 'asc') {
    this.headerName = headerName;
    this.field = field;
    this.filter = 'agTextColumnFilter';
    this.sort = sort;

    this.editable = false;
    this.hide = false;

    this.menuTabs = ['filterMenuTab'];
  }

  public cellValueChanged(params: any) {
    if (params.oldValue != params.newValue) {
      alert('teste');
    }
  }

  public cellClicked(params: any) {
    params.columnApi.getColumn(params.colDef.field).getColDef().editable = params.node.data.isEnabled;
  }
}
