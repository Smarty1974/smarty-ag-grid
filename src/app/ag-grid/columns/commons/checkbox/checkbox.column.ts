import { CommonColumn } from '../common/common.column';

export class CheckboxColumn extends CommonColumn {

  constructor(
    headerName: string,
    field: string,
    hide = false,
    width = 40,
    minWidth = 40) {
    super(headerName, field);

    this.headerCheckboxSelection = true,
    this.checkboxSelection = (params: any) => {
      return params.node.data.isEnabled
    },
    this.lockPosition = true,
    this.cellRenderer = (params: any) => {
      if (!params.node.data.isEnabled) {
          return `<input type="checkbox" disabled />`;
      }
      return '';
    }

    this.hide = hide;
    this.width = width;
    this.minWidth = minWidth;
  }
}
