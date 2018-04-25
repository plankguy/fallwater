/**
 * @NOTE:
 * - Exports directly for use in js files for styled-components
 * - Exports to ./sass.js for transformation to flat sass variables
 */

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
    weight: "400",
    h1: {
      size: {
        lg: '2.0em',
        sm: '1.5em',
      },
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
    borderColor: this.color.border,
    lg: {
      borderWidth: '10px',
      padding: '20px',
      inset: '30px',
      space: this.spacing.base,
    },
    sm: {
      borderWidth: '4px',
      padding: '20px',
      inset: '15px',
      space: '5px',
    }
  };

  this.header = {
    lg: {
      padding: "40px", // this.wrapper.lg.padding, // 
      height: "101px",
    },
    sm: {
      padding: this.wrapper.sm.padding,
      height: "101px",
    }
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
