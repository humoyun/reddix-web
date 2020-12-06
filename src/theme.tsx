import { theme as chakraTheme } from '@chakra-ui/core'
// import { mode, Styles } from '@chakra-ui/theme-tools'
// import theme from '@chakra-ui/theme'

// good example of styles
// https://github.com/twbs/bootstrap-sass/blob/master/assets/stylesheets/bootstrap/_variables.scss

const fonts = { ...chakraTheme.fonts, mono: '\'Menlo\', monospace' }

// define your custom breakpoints
const breakpoints = ['576px', '768px', '992px', '1200px']

// add an alias for object responsive prop
breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.md = breakpoints[2]
breakpoints.md = breakpoints[3]


// const styles: Styles = {
//   ...theme.styles,
//   global: (props) => ({
//     ...theme.styles.global,
//     fontFamily: 'body',
//     fontWeight: 'light',
//     color: mode('gray.100', 'whiteAlpha.900')(props),
//     bg: mode('gray.700', 'gray.900')(props)
//   })
// }

const Theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    black: '#16161D',
  },
  fonts,
  // breakpoints,
  icons: {
    // ...chakraTheme.icons,
    logo: {
      path: (
        <svg
          width="3000"
          height="3163"
          viewBox="0 0 3000 3163"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="3000" height="3162.95" fill="none" />
          <path
            d="M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z"
            fill="currentColor"
          />
        </svg>
      ),
      viewBox: '0 0 3000 3163',
    },
  },
  // styles
}

export default Theme
