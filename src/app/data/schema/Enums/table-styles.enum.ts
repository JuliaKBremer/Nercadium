export enum TableStyles {
  StyleOne = 'styleOne',
  StyleTwo = 'styleTwo'
}

export function GetTableStyleFromEnum(tableStyle: TableStyles) {
  switch (tableStyle) {
    case TableStyles.StyleOne: {
      return {
        border: '1px solid gainsboro'};
    }
    case TableStyles.StyleTwo: {
      return {
        border: '10px solid gainsboro',
        'border-collapse': 'collapse'};
    }
  }
}
