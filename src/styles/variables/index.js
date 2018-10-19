/**
 * @NOTE:
 * - Exports directly for use in js files for styled-components
 * - Exports to ./sass.js for transformation to flat sass theme
 */

/**
 * Returns theme configuration object
 * @return {object}
 */
const theme = () => {

  const g = (key) => typeof key === 'object' ? `${key.val}${key.unit}` : key;

  const v = (key) => typeof key === 'object' ? key.val : key;

  const u = (key) => typeof key === 'object' ? key.unit : key;

  const color = {
    black:      "#000",
    white:      "#FFF",
    text:       "#FFF",
    textLight:  "#EEE",
    textInvert: "#333",
    bg:         "#222",
    bgInvert:   "#EEE",
    border:     "#FFF",
    link:       "#EEE",
    linkHover:  "#FFF",
    button:     "#333",
    buttonBg:   "#FFF",
  };

  const spacing = {
    base: {
      val: 20,
      unit: `px`,
    },
    x: {
      val: 20,
      unit: `px`,
    },
    y: {
      val: 20,
      unit: `px`,
    },
  };

  const font = {
    family: {
      sans: "('Poppins', 'Helvetica Neue', Helvetica, Arial, sans-serif)",
      serif: "(serif)",
      display: "('Playfair Display', serif)",
    },
    size: {
      val: 18,
      unit: `px`
    },
    lineHeight: {
      val: 1.5,
      unit: null,
    },
    weight: "400",
    h1: {
      size: {
        lg: {
          val: 2.0,
          unit: `em`,
        },
        sm: {
          val: 1.5,
          unit: `em`,
        },
      },
      weight: '300',
      lineHeight: {
        val: 1.3,
        unit: null,
      },
      marginY: {
        val: 4.0,
        unit: `em`,
      },
      marginX: {
        val: 0,
        unit: null,
      },
    },
  };

  const breakpoint = {
    xs: {
      val: 480,
      unit: 'px',
    },
    sm: {
      val: 767,
      unit: 'px',
    },
    md: {
      val: 980,
      unit: 'px',
    },
  };

  const wrapper = {
    borderColor: g(color.border),
    lg: {
      borderWidth: {
        val: 10,
        unit: 'px',
      },
      padding: g(spacing.base),
      space: g(spacing.base),
      inset: {
        val: 30,
        unit: 'px',
      },
    },
    sm: {
      borderWidth: {
        val: 4,
        unit: 'px',
      },
      padding: g(spacing.base),
      space: {
        val: 5,
        unit: 'px',
      },
      inset: {
        val: 9,
        unit: 'px',
      },
    }
  };

  const header = {
    lineheight: {
      val: 1.0,
      unit: null,
    },
    lg: {
      fontSize: g(font.size),
      paddingY: g(spacing.base),
      paddingX: g(wrapper.lg.padding),
      height: {
        val: (v(spacing.base) * 2) + v(font.size) * 1.0,
        unit: 'px',
      },
    },
    sm: {
      fontSize: g(font.size),
      paddingY: g(spacing.base),
      paddingX: g(wrapper.sm.padding),
      height: {
        val: (v(spacing.base) * 2) + v(font.size) * 1.0,
        unit: 'px',
      },
    }
  };

  const footer = {
    lineheight: {
      val: 1.0,
      unit: null,
    },
    lg: {
      fontSize: {
        val: 14,
        unit: 'px',
      },
      padding: `${g(spacing.base)} ${g(wrapper.lg.padding)}`,
      height: {
        val: (v(spacing.base) * 2) + 14 * 1.0,
        unit: 'px',
      },
    },
    sm: {
      fontSize: {
        val: 14,
        unit: 'px',
      },
      padding: `${g(spacing.base)} ${g(wrapper.sm.padding)}`,
      height: {
        val: (v(spacing.base) * 2) + 14 * 1.0,
        unit: 'px',
      },
    }
  };

  const menu = {
    width: {
      val: 500,
      unit: 'px',
    },
    color: "#FFF",
    bg:    "#999",
  };

  const animation = {
    speed: {
      default: "300ms",
      bounce: "500ms",
    },
    easing: {
      default: "ease",
      bounce: "cubic-bezier(1.000, 0.000, 0.280, 1.245)",
    }
  };

  let vars = {
    color,
    spacing,
    font,
    breakpoint,
    wrapper,
    header,
    footer,
    menu,
    animation,
  };

  return vars;
};

module.exports = theme();
