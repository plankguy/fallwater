/**
 * @NOTE:
 * - Exports directly for use in js files for styled-components
 * - Exports to ./sass.js for transformation to flat sass variables
 */

module.exports = {
  color: {
    black:      "#000",
    white:      "#FFF",
    text:       "#FFF",
    textLight:  "#EEE",
    textInvert: "#333",
    bg:         "#222",
    bgInvert:   "#EEE",
    border:     "#FFF",
    link:       "#F4F4F4",
    linkHover:  "#FFF",
    button:     "#333",
    buttonBg:   "#FFF",
  },
  spacing: {
    base: "20px",
    x:    "20px",
    y:    "20px",
  },
  font: {
    family: "('Poppins', 'Helvetica Neue', Helvetica, Arial, sans-serif)",
    size: "18px",
    lineHeight: "1.5",
    weight: "300",
  },
  breakpoint: {
    xs: '480px',
    sm: '767px',
    md: '980px',
  },
  menu: {
    width: "500px",
    color: "#FFF",
    bg:    "#999",
  },
  animation: {
    speed: {
      default: "300ms",
      bounce: "500ms",
    },
    easing: {
      default: "ease",
      bounce: "cubic-bezier(1.000, 0.000, 0.280, 1.245)",
    }
  },
};
