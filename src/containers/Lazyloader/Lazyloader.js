/**
 * Sources:
 * <https://www.smashingmagazine.com/2018/01/deferring-lazy-loading-intersection-observer-api/>
 * <https://mxstbr.blog/2017/02/react-children-deepdive/>
 *
 * IntersectionObserverEntry property definitions:
 *   `isIntersecting`: indicates whether the observed element is currently intersecting the “capturing frame” or not
 *   `intersectionRatio`: indicates how much of the observed element’s area is intersecting the “capturing frame”
 *   `target`: the original element that had been passed to observe() function
 *   `rootBounds`: A rectangle for the “capturing frame” (root + rootMargin);
 *   `boundingClientRect`: A rectangle for the observed element itself;
 *   `intersectionRect`: An area of the “capturing frame” intersected by the observed element.
 */

import Observer from '@researchgate/react-intersection-observer';
import React from 'react';
import PropTypes from 'prop-types';

const PROP_TYPES = {
  children: PropTypes.element.isRequired, // node?
  root: PropTypes.oneOfType([
    PropTypes.string, // #element
    PropTypes.object, // window
  ]),
  rootMargin: PropTypes.string, // Defines margin around your `root` element that extends or shrinks the “capturing frame”. default: 'top, right bottom, left'
  threshold: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
  ]),
  width: PropTypes.number,
  height: PropTypes.number,
  container: PropTypes.element,
  onVisible: PropTypes.func,
  applyRatio: PropTypes.bool,
  visibleClassName: PropTypes.string,
  loadingClassName: PropTypes.string,
  title: PropTypes.string, // TEMP
};

const DEFAULT_PROPS = {
  root: window,
  rootMargin: '0% 0% 25%',
  threshold: 0,
  applyRatio: true,
  visibleClassName: 'is-visible',
  loadingClassName: 'is-loading',
  title: 'no title', // TEMP
};

class Lazyloader extends React.Component {

  // Initial state here:
  state = {
    isLeaving: false,
    isVisible: false,
    isLoaded: false,
  };

  constructor(props) {
    super(props);

    // Validate child <img>
    React.Children.forEach(props.children, (child, i) => {
      if (!React.isValidElement(child)) {
        throw 'Lazyloader child must be a valid React element';
      }
      else if (!child.props.hasOwnProperty('src')) {
        throw 'Lazyloader <img> child have a `src` attribute (prop)';
      }
      return;
    });

    this.handleIntersection = this.handleIntersection.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * Returns image ratio CSS value
   * @param {int}
   * @param {int}
   * @return {string}
   */
  getImageRatioPercentCssVal = (height, width) => `calc(${height} / ${width} * 100%)`;

  /**
   * Alters elements for lazyloading
   * @return {element}
   */
  renderChildren() {
    const {
      children,
      container,
      height,
      width,
      applyRatio,
      visibleClassName,
      loadingClassName,
      loadedClassName
    } = this.props;
    const { isVisible, isLoaded } = this.state;
    const lazyContainer = typeof container !== 'undefined' ? container : (<div className="lazyContainer"></div>);
    const placeholderStyles = !isVisible && applyRatio ? { paddingTop: this.getImageRatioPercentCssVal(), display: 'block' } : {}; // Apply "intrinsic placeholder"
    const placeholderElement = (<span className="lazyContainer__spacer" style={placeholderStyles} />);
    const imgElement = React.cloneElement(React.Children.only(children), {
      onLoad: (it) => this.setState({ isLoaded: true }),
    });

    return React.createElement(
      // DOM element type
      lazyContainer.type,
      // Props
      {
        ...lazyContainer.props,
        style: {
          ...lazyContainer.props.style,
          maxWidth: `${width}px`,
        },
        className: [
          lazyContainer.props.className,
          isVisible ? visibleClassName : loadingClassName,
          isLoaded ? loadedClassName : '',
        ].join(' ').trim(),
      },
      // Children
      this.state.isVisible ? imgElement : placeholderElement,
    );
  }

  /**
   * Handles intersection via IntersectionObserver
   * @param {object}
   * @return {void}
   */
  handleIntersection(event) {
    if (!this._isMounted) {
      return;
    }

    const { isLeaving } = this.state;
    const { onVisible } = this.props;

    if (event.isIntersecting) {
      this.setState({
        isVisible: true,
        isLeaving: true,
      }, () => {
        if (typeof onVisible === 'function') {
          onVisible();
        }
      });
    } else if (isLeaving) {
      this.setState({
        isLeaving: false,
      });
    }

    // console.log(this.props.title, ' is intersecting?', event.isIntersecting, ', is leaving? ', isLeaving);
  }

  render() {
    const {
      rootElement,
      rootMargin,
      threshold,
    } = this.props;

    return (
      <Observer
        root={rootElement}
        onChange={this.handleIntersection}
        rootMargin={rootMargin}
        title={this.props.title}
        threshold={threshold}
      >
        {this.renderChildren()}
      </Observer>
    )
  }
}

Lazyloader.propTypes = PROP_TYPES;
Lazyloader.defaultProps = DEFAULT_PROPS;

export default Lazyloader;
