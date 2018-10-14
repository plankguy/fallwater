import React from 'react';
// import PropTypes from 'prop-types';
import PrismicReact from 'prismic-reactjs'; // eslint-disable-line

import Button from '../../components/Button/Button';

class Page extends React.Component {
  constructor(props) {
    super(props);

    // You can set initial state here:
    this.state = {count: props.initialCount};

    // ES6 you need to bind this
    this.handleClick = this.handleClick.bind(this);
  }

  /*
   * Triggered before initial render()
   * Invoked once, both on the client and server. If you call setState within this method, render() will see the updated state and will be executed only once despite the state change.
   */
  componentWillMount() {}

  /*
   * Called after render only on client. Can access refs. The componentDidMount() method of child components is invoked before that of parent components. This is the place to call external libraries, use setTimeout, make ajax requests
   */
  componentDidMount() {}

  /*
   * Called when there are new props or state changes. Return false to prevent a render. Good for performance. NOT called for the initial render or when forceUpdate is used.
   * (Update only)
  */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  /*
   * Invoked immediately before rendering or when new props or state are being received. Not called for the initial render.
   * Cannot use setState in this method. Use componentWillReceiveProps instead. Use this as an opportunity to perform preparation before an update occurs.
   * (Update only)
   */
  componentWillUpdate(nextProps, nextState) {}

  /*
   * Called before render when props change. Access to old props. It is NOT triggered on initial mount/render.
   *(Update only)
   */
  componentWillReceiveProps(nextProps) {}

  /*
   * Access to prevState, prevProps. Use this as an opportunity to operate on the DOM (refs) when the component has been updated. It is NOT triggered on initial mount/render.
   * (Update only)
   */
  componentDidUpdate(prevProps, prevState) {}

  /*
   * Invoked immediately before a component is unmounted from the DOM. Clean up event bindings, etc.
   */
  componentWillUnmount() {}

  // Custom click handler method
  handleClick() {
    alert('Hello!');
  }

  // Render jsx. Triggered when the state changes.
  render() {
    const baseClass = 'it';

    return (
      <div
        id={this.props.id}
        className={`${baseClass}`}
      >

        <h1 className={`${baseClass}__title`}>
          {this.props.title}
        </h1>
        <p className={`${baseClass}__copy`}>
          {this.props.copy}
        </p>
        <p>
          <Button
            type="button"
            onClick={this.handleClick}
            label="Say hello"
          />
        </p>
        
      </div>
    )
  }
}

// Define prop type(s) - Can also be used in class as `static`
Page.propTypes = {
  // id:        React.PropTypes.number,
  // title:     React.PropTypes.string,
  // body:      React.PropTypes.string,
  // alignment: React.PropTypes.oneOf(['left', 'right']),
  // cta:       React.PropTypes.shape({
  //              text:    PropTypes.string.isRequired,
  //              onClick: PropTypes.func.isRequired,
  //            }),
};

// Define initial prop values
Page.defaultProps = {
  id:    1,
  title: 'A default title prop for the `title` prop',
  copy:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
};

export default Page;
