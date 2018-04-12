/**
 * @NOTE:
 * - Exports directly for use in js files for styled-components
 * - Exports to ./sass.js for transformation to flat sass variables
 */

const vars = {
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
  wrapper: {
    borderWidth: '10px',
    padding: '20px',
    // inset: () => this.wrapper.borderWidth + this.wrapper.padding,
    // borderColor: (this) => {
      // console.log('wrapper border color:', this);
    // },
  },
  header: {
    padding: "40px",
    height: "62px",
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

const variables = () => {

  this.color = {
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
  };

  this.spacing = {
    base: "20px",
    x:    "20px",
    y:    "20px",
  };

  this.font = {
    family: "('Poppins', 'Helvetica Neue', Helvetica, Arial, sans-serif)",
    size: "18px",
    lineHeight: "1.5",
    weight: "300",
    h1: {
      size: '2.0em',
      weight: '300',
      lineHeight: '1.3',
      marginY: '4.0em',
      marginX: '0',
    },
  };

  this.breakpoint = {
    xs: '480px',
    sm: '767px',
    md: '980px',
  };

  this.wrapper = {
    borderWidth: '10px',
    padding: '20px',
    borderColor: this.color.border,
    inset: '30px',
  };

  this.header = {
    padding: "40px",
    height: "101px",
  };

  this.menu = {
    width: "500px",
    color: "#FFF",
    bg:    "#999",
  };

  this.animation = {
    speed: {
      default: "300ms",
      bounce: "500ms",
    },
    easing: {
      default: "ease",
      bounce: "cubic-bezier(1.000, 0.000, 0.280, 1.245)",
    }
  }

  return this;
};

module.exports = variables();
