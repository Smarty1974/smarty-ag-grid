import { Component, HostListener, OnInit }                 from '@angular/core';
import { DropdownColumn }                                  from './ag-grid/columns/commons/dropdown/dropdown.column';
import { TextColumn }                                      from './ag-grid/columns/commons/text/text.column';
import { CheckboxColumn }                                  from './ag-grid/columns/commons/checkbox/checkbox.column';
import * as XLSX                                           from 'xlsx';
import 'ag-grid-enterprise';
import { GridApi, GridOptions, ColDef }                    from "ag-grid-enterprise";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DocumentColumn, XlsxSColumn, XlsxSheet }          from "./ag-grid/models/document-column";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //-------- Ag-grid declarative
  public columnDefs: any[] = [];
  public defaultColDef = {
    sortable: true,
    filter: true,
    //  editable: true,
    resizable: true
  };
  public autoGroupColumnDef = {
    headerName: 'Group',
    minWidth: 300
  };
  public columnTypes = {
    string: {
      enableRowGroup: true,
      enablePivot: true
    }
  };
  public rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' | undefined;
  public tempData = [];
  public modules: any;
  public gridOptions = {} as GridOptions;
  public rowData: Array<any> = [];
  public documentStructure = {sheets: []} as DocumentColumn;
  public selectedSheet = {} as XlsxSheet;
  public selectedColumn: string = "";
  public selectedColumnObj = {} as any;

  public gridApi!: GridApi<any>;
  public gridColumnApi: any;
  private params = {force: true};

  //-------- Column form declarative


  //-------- Xlsx declarative
  public sheet_name_list: string[] = [];
  public tableData: any;
  public tabbleColumns: any;
  public customPagination = 1;
  public recordsPerPage = 10;
  public tableRecords = [];
  public pageStartCount = 0;
  public pageEndCount = 10;
  public totalPageCount = 0;
  public currentPage = 0;
  public searchText = [];
  private wb = {} as XLSX.WorkBook;

  constructor() {
    // Selection Column definition
    this.columnDefs = [
      new CheckboxColumn('', 'selection', false, 50, 30),
    ];
    this.rowGroupPanelShow = 'always';

  }

  ngOnInit(): void {

  }


  public onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this.tempData;
    this.gridApi.setColumnDefs(this.columnDefs);
    this.gridApi.expandAll();
    this.gridApi.sizeColumnsToFit();
    this.gridApi.refreshCells(this.params);
  }

  public uploadData(e: any) {
    console.log(e.target.files[0]);
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(<unknown>e.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const data = new Uint8Array(e.target.files);
    const workbook = XLSX.read(data, {type: 'array'});
    const sheet_name_list = workbook.SheetNames;
    //console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]));
    console.log('sheet_name_list', sheet_name_list);

    debugger;
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      this.wb = XLSX.read(binarystr, {type: 'binary'});

      /* get sheet name list */
      this.sheet_name_list = this.wb.SheetNames;

      /* iterate the sheet get all columns */
      this.sheet_name_list.forEach(sheet => {
        let xlsxSheet = {} as XlsxSheet;
        xlsxSheet = this.getXlsxSheetData(sheet);
        this.documentStructure.sheets.push(xlsxSheet);
      })
      console.log('documentStructure..: ', this.documentStructure);

      /* selected the first sheet */
      this.selectedSheet = this.documentStructure.sheets[0];
      this.populateGrid();
    };
  }

  private getXlsxSheetData(name: string):XlsxSheet {
    const xlsxSheet = {} as XlsxSheet;
    console.log('wb.SheetNames', this.wb.SheetNames);
    const ws: XLSX.WorkSheet = this.wb.Sheets[name];
    xlsxSheet.sheetName = name;

    xlsxSheet.data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
    xlsxSheet.columns = [];
    console.log('tabledata: ', xlsxSheet.data);

    this.tabbleColumns = Object.keys(xlsxSheet.data[0]);
    this.tabbleColumns.forEach((element: any) => {
      const column = {} as XlsxSColumn;
      column.field = element;
      column.width = 150;
      column.headerName = element;
      column.filter = true;
      column.sortable = true;
      column.aggregate = false;
      column.sort = 'asc';
      xlsxSheet.columns.push(column);
    });
    return xlsxSheet;
  }

  public populateGrid() {
    this.tableData = this.selectedSheet.data;
    console.log('tabledata: ', this.tableData);

    this.columnDefs = this.selectedSheet.columns;

    this.gridApi.setColumnDefs(this.columnDefs);
    this.gridApi.setGridOption('columnDefs', this.columnDefs);
    this.gridApi.sizeColumnsToFit();
    this.gridApi.refreshCells(this.params);

    this.tabbleColumns = Object.keys(this.tableData[0]);
    //console.log('tabledata: ', Object.keys(this.tableData[0]));
    this.tableRecords = this.tableData.slice(
      this.pageStartCount,
      this.pageEndCount
    );
    this.totalPageCount = this.tableData.length / this.recordsPerPage;
    console.log('tableRecords', this.tableRecords);
    this.rowData = this.tableRecords;
    //console.log('tabledata: ', this.tableData);

    this.gridApi.setColumnDefs(this.columnDefs);
    this.gridApi.sizeColumnsToFit();
    this.gridApi.refreshCells(this.params);
  }

  public getSelectedRows(): void {
    let selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map(node => node.data);
    console.log(selectedData);
  }

  public saveState() {
    const savedState = this.gridColumnApi.getColumnState();
    const savedPivotMode = this.gridColumnApi.isPivotMode();
    console.log(savedState);
    console.log(savedPivotMode);
    console.log('column state saved');
  }

  onColumnSelect() {
    const column = this.columnDefs.find(col => col.field === this.selectedColumn);
    console.log(`COLUMN: ${JSON.stringify(column)}`)
    this.selectedColumnObj = {};
    if (column) {
      this.selectedColumnObj = column;
    //   column.aggFunc = this.enableAggregation ? this.aggregationType : null;
    }
  }

  onModifiedValue(newValue: any) {
    console.log(`NEW VALUE: ${JSON.stringify(newValue)}`)
  }

}
