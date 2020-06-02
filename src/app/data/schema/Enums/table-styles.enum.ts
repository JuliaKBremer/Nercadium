export enum TableStyles {
  StyleOne = 'styleOne',
  StyleTwo = 'styleTwo'
}

export function GetTableStyleFromEnum(tableStyle: TableStyles) {
  switch (tableStyle) {
    case TableStyles.StyleOne: {
      return {
        table: {
          border: '1px solid gainsboro'
        },
        th: {},
        tr: {},
        td: {
          border: '1px solid gainsboro'
        }
      };
    }
    case TableStyles.StyleTwo: {
      return {
        table: {
          border: '1px solid gainsboro',
          'border-collapse': 'collapse'
        },
        th: {},
        tr: {},
        td: {
          border: '1px solid gainsboro',
          'border-collapse': 'collapse'
        }
      };
    }
  }
}
