import React, { Component } from 'react';
import Observer from '@researchgate/react-intersection-observer';
import PropTypes from 'prop-types';

import PostEl from '../../components/Post';

const ANIM_THRESHOLD = 0.3;

export default class Post extends Component {

  state = {
    isIntersecting: false,
    isVisible: false,
  };

  constructor(props) {
    super(props);

    this.handleIntersection = this.handleIntersection.bind(this);
  }

  /**
   *
   */
  handleIntersection(event) {
    const { isIntersecting, intersectionRatio } = event;
    const { isLeaving } = this.state;

    if (this.props.title === 'Huh?') {
      console.log(`${this.props.title} intersecting?:`, event.isIntersecting, ', is visible:', isIntersecting && intersectionRatio >= ANIM_THRESHOLD, ', event:', event);
    }
    this.setState({
      isIntersecting: isIntersecting,
      // isVisible: isIntersecting && intersectionRatio >= 0.99,
      isVisible: isIntersecting && intersectionRatio >= ANIM_THRESHOLD,
    });
    // if (isIntersecting) {
    //   this.setState(
    //     {
    //       isVisible: true,
    //       isLeaving: true,
    //     }
    //   );
    // } else if (isLeaving) {
    //   this.setState(
    //     {
    //       isLeaving: false,
    //     }
    //   );
    // }
  }

  render() {
    const { isLeaving, isVisible, isIntersecting } = this.state;
// console.log('Post state:', this.state);

    return (
      <Observer
        root={this.props.rootElement}
        onChange={this.handleIntersection}
        rootMargin="0% 0% 1000px"
        onlyOnce={false}
        threshold={[0, ANIM_THRESHOLD]}
      >
        <div className="post-observer">
        {/* <React.Fragment> */}
          <PostEl 
            {...this.props} 
            isVisible={isVisible} 
            isIntersecting={isIntersecting}
            isLeaving={isLeaving} 
          />
          {/* {React.createElement(
            PostEl,
            {
              ...this.props,
              isVisible,
              isLeaving,
            },
            null
          )} */}
        {/* </React.Fragment> */}
        </div>
      </Observer>
    );
  }
}
