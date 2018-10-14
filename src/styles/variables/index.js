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
    family: {
      sans: "('Poppins', 'Helvetica Neue', Helvetica, Arial, sans-serif)",
      serif: "(serif)",
      display: "('Playfair Display', serif)",
    },
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
      padding: this.spacing.base,
      inset: '30px',
      space: this.spacing.base,
    },
    sm: {
      borderWidth: '4px',
      padding: this.spacing.base,
      inset: '15px',
      space: '5px',
    }
  };

  this.header = {
    lineheight: '1.0',
    lg: {
      fontSize: this.font.size,
      paddingY: this.spacing.base,
      paddingX: this.wrapper.lg.padding,
      height: `${(this.spacing.base * 2) + this.font.size * 1.0}`,
    },
    sm: {
      fontSize: this.font.size,
      paddingY: this.spacing.base,
      paddingX: this.wrapper.sm.padding,
      height: `${(this.spacing.base * 2) + this.font.size * 1.0}`,
    }
  };

  this.footer = {
    lineheight: '1.0',
    lg: {
      fontSize: '14px',
      padding: `${this.spacing.base} ${this.wrapper.lg.padding}`,
      height: `${(this.spacing.base * 2) + 14 * 1.0}`,
    },
    sm: {
      fontSize: '14px',
      padding: `${this.spacing.base} ${this.wrapper.sm.padding}`,
      height: `${(this.spacing.base * 2) + 14 * 1.0}`,
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
