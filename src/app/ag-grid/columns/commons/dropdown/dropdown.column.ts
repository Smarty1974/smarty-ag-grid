import { CommonColumn } from '../common/common.column';

export class DropdownColumn extends CommonColumn {

  constructor(
    headerName: string,
    field: string,
    values = [],
    hide = false,
    sort = null,
    width = 170,
    minWidth = 160) {
    super(headerName, field, sort);

    this.hide = hide;
    this.editable = true;
    this.cellEditor = 'agSelectCellEditor';
    this.cellEditorParams = (params: any) => {
      return {
        values: values,
        isCellEditable: false
      }
    };

    this.onCellValueChanged = (params: any) => {
      super.cellValueChanged(params);
    }
    this.onCellClicked = (params: any) => {
      super.cellClicked(params);
    }

    this.width = width;
    this.minWidth = minWidth;
  }
}
