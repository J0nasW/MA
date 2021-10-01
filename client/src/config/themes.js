import red from '@material-ui/core/colors/red'
import pink from '@material-ui/core/colors/pink'
import green from '@material-ui/core/colors/green'
import blue from '@material-ui/core/colors/blue'

const themes = [
  {
    id: 'default',
    // color: '#014289',
    // source: {
    //   palette: {
    //     primary: '#014289',
    //     secondary: '#D9D9D9',
    //     error: red,
    //   },
    // },
  },
  {
    id: 'logu',
    color: blue[900],
    source: {
      palette: {
        primary: {
          light: '#336399',
          main: '#003C80',
          dark: '#002a59',
          contrastText: '#fff',
        },
        secondary: {
          light: '#f6d133',
          main: '#F4C600',
          dark: '#aa8a00',
          contrastText: '#000',
        },
        error: {
          light: '#c54949',
          main: '#b71c1c',
          dark: '#801313',
          contrastText: '#000',
        },
      },
    },
  },
  {
    id: 'red',
    color: red[500],
    source: {
      palette: {
        primary: red,
        secondary: pink,
        error: red,
      },
    },
  },
  {
    id: 'green',
    color: green[500],
    source: {
      palette: {
        primary: green,
        secondary: red,
        error: red,
      },
    },
  },
]

export default themes
