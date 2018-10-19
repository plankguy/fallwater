import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import Icon from '../../components/Icon';
import { Chevron } from '../../components/Icon/glyphs';
import * as theme from '../../styles/variables/index.js';
import val from '../../styles/utils.js';

const PROP_TYPES = {
  offset: PropTypes.number,
};
const DEFAULT_PROPS = {
  offset: -5,
};


// @NOTE: these could be passed as props...
const SKILLS_LIST = [
  <><span className="u">samples</span> beer</>,
  <><span className="u">plays</span> hockey</>,
  <><span className="u">leads</span> people</>,
  <><span className="u">writes</span> code</>,
  <><span className="u">designs</span> UIs</>,
  <><span className="u">travels</span> places</>,
  <><span className="u">chills</span> at the beach</>,
  <><span className="u">parents</span> his kids</>,
];
const SKILL_HEIGHT = '9'; // 50;
const UNIT = 'vh'; // 'px';
const SKILLS_VISIBLE = 5; // ! should be odd number
const MIDPOINT = Math.ceil(SKILLS_VISIBLE / 2);
const DRAG_THRESHHOLD_TIME = 500;
const DRAG_THRESHHOLD_DISTANCE = 50;

const Skills = styled.div`
  font-size: 1.4em;
  position: relative;
  /* font-weight: 300; */
`;

// const SkillDesc = styled.div`
//   margin-right: 0.3em;
//   text-align: right;
// `;

// List of skills
const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  height: ${SKILL_HEIGHT * SKILLS_VISIBLE}${UNIT};
  touch-action: none;
  text-align: center;

  @media (min-width: ${val(theme.breakpoint.sm)}) {
    width: 200px;
    text-align: left;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    padding-left: 8vw;
  }
`;

const Skill = styled.li`
  margin: 0; /* 2.0em */
  position: absolute;
  height: ${SKILL_HEIGHT}${UNIT};
  line-height: 2.35em;
  width: 100%;
  white-space: nowrap;
  transition: opacity 400ms ease-in, transform 300ms cubic-bezier(0.300, 0.845, 0.320, 1.275) 100ms;
  will-change: opacity;

  .u {
    position: relative;

    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      bottom: 0.1em;
      width: 100%;
      border-bottom: 1px solid ${val(theme.color.text)};
      opacity: 0;
      transition: opacity 500ms ease-in;
    }
  }

  &.is-active {
    .u {
      &::after {
        opacity: 1.0;
      }
    }
  }
`;

const Controls = styled.div`

  @media (min-width: ${val(theme.breakpoint.sm)}) {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const buttonResetCss = css`
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
  line-height: normal;
  overflow: visible;
  padding: 0;
  cursor: pointer;
  -webkit-appearance: button; /* for input */
  -webkit-user-select: none; /* for button */
  -moz-user-select: none;
  -ms-user-select: none;

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
`;

const buttonStyles = css`
  display: block;
  padding: 0.4em 0.6em;
  color: ${val(theme.color.text)};
  transition: background-color 400ms ease-in;

  &:focus {
    outline: 0;
  }

  /* Larger screens */
  @media (min-width: ${val(theme.breakpoint.sm)}) {
    background-color: rgba(255, 255, 255, 0.3);

    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }
    &:active {
      background-color: rgba(255, 255, 255, 0.7);
    }
  }
`;

const UpButton = styled.button`
  ${buttonResetCss}
  ${buttonStyles}

  @media (max-width: ${val(theme.breakpoint.sm)}) {
    position: absolute;
    bottom: 110%;
    left: 50%;
    transform: translateX(-50%);
  }
`;
const DownButton = styled.button`
  ${buttonResetCss}
  ${buttonStyles}

  @media (max-width: ${val(theme.breakpoint.sm)}) {
    position: absolute;
    top: 110%;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const arrowStyles = css`
  fill: {theme.color.text};
  width: 24px;
  height: 16px;
  margin: 0;
`;
const ArrowUp = styled(Icon)`
  ${arrowStyles}
  transform: rotate(-90deg);
`;
const ArrowDown = styled(Icon)`
  ${arrowStyles}
  transform: rotate(90deg);
`;


class SkillsList extends Component {
  state = {
    activeSkillKey: 1,
    skills: [],
  };
  dragTracking = false;
  dragStart = {};
  dragEnd = {};

  constructor(props) {
    super(props);

    this.handleSkillsScroll = this.handleSkillsScroll.bind(this);
    // this.handleSwipeStart = this.handleSwipeStart.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.handleSwipeEnd = this.handleSwipeEnd.bind(this);
  }

  componentDidMount = () => {
    this.setInitialSkillsState();
  }

  /**
   *
   */
  setInitialSkillsState = () => {
    const theState = {
      ...this.state,
      skills: SKILLS_LIST.map(
        (skill, i, skills) => {
          const skillKey = i;
          return this.calcSkillState(skill, skillKey, i);
        },
        this
      ),
    };

    this.setState(theState);

    return theState;
  }

  /**
   *
   */
  handleSkillsScroll = (e, dir) => {
    if (dir === 'down') {
      this.moveDown();
    } else {
      this.moveUp();
    }
  }

  /**
   *
   */
  moveUp = () => {
    this.setState(prevState => ({
      ...prevState,
      activeSkillKey: (() => {
        // decrement unless we're on the first, then reset
        return prevState.activeSkillKey === 1 ? SKILLS_LIST.length : prevState.activeSkillKey - 1;
      })(),
      skills: prevState.skills.map((skill, i, skillsState) => {
        const nextSkillId = (skill.stateKey === 0) ? SKILLS_LIST.length - 1 : skill.stateKey - 1;

        return this.calcSkillState(skill, nextSkillId, i);
      }, this),
    }));
  }

  /**
   *
   */
  moveDown = () => {
    this.setState(prevState => ({
      ...prevState,
      activeSkillKey: (() => {
        // decrement unless we're on the first, then reset
        return prevState.activeSkillKey === SKILLS_LIST.length ? 1 : prevState.activeSkillKey + 1;
      })(),
      skills: prevState.skills.map((skill, i, skillsState) => {
        const nextSkillId = (skill.stateKey === SKILLS_LIST.length - 1) ? 0 : skill.stateKey + 1;

        return this.calcSkillState(skill, nextSkillId, i);
      }, this),
    }));
  }

  /**
   *
   */
  calcSkillState = (skill, stateKey, i) => {
    // calc reverse iterator (~ 7, 6, 5, 4, 3, 2, 1, 0)
    const reverseIterator = SKILLS_LIST.length - stateKey; // ~ 7, 6, 5, 4, 3, 2, 1, 0
    // Check if over max allowed visible
    // const overMax = stateKey > SKILLS_VISIBLE;
    // Calc opacity multiplyer based on visible skills allowed divided by 2 (MIDPOINT)
    const opacityMultiplyer = (1 / MIDPOINT).toFixed(3); // ~ 0.333
    // Item opacity
    const opacity = Math.round( // round to nearest 2 decimal ~ 0.33, 0.66, 1
      Math.max(
        (stateKey < MIDPOINT) ?
          // before midpoint - scale opacity up
          opacityMultiplyer * (stateKey + 1)
          :
          // after midpoint - scale opacity back down (with a min of 0)
          opacityMultiplyer * (reverseIterator - MIDPOINT)
        , 0
      ) * 100
    ) / 100;
    // calc y position based on skill base height, moving last item to top hidden
    const y = (stateKey === SKILLS_LIST.length - 1) ? -SKILL_HEIGHT : SKILL_HEIGHT * stateKey;
    // calc x position based on being before or after the midpoint
    const xOffset =
      Math.max(
        (stateKey < MIDPOINT) ?
        // before midpoint - start indenting
        stateKey + 1
        :
        // after midpoint - remove indents
        reverseIterator - MIDPOINT
      , 0);
    // Flag as active
    const isActive = opacity === 1;

    return {
      stateKey,
      // i,
      y,
      xOffset,
      opacity,
      isActive,
      // desc: SKILLS_LIST[i].props.children[1],
      // disabled: overMax,
    };
  }

  /**
   *
   */
  handleSwipeStart = (e) => {
    this.dragTracking = true;
    this.dragStart.t = new Date().getTime();
    this.dragStart.x = e.clientX;
    this.dragStart.y = e.clientY;
  }

  /**
   *
   */
  handleSwipe = (e) => {
    if (this.dragTracking) {
      e.preventDefault();
      this.dragEnd.x = e.clientX;
      this.dragEnd.y = e.clientY;
    }
  }

  /**
   *
   */
  handleSwipeEnd = (e) => {
    if (this.dragTracking) {
      this.dragTracking = false;
      const now = new Date().getTime();
      const deltaTime = now - this.dragStart.t;
      const deltaX = this.dragEnd.x - this.dragStart.x;
      const deltaY = this.dragEnd.y - this.dragStart.y;

      if (deltaTime > DRAG_THRESHHOLD_TIME) {
        // gesture too slow
        return;
      } else {
        if ((deltaY > DRAG_THRESHHOLD_DISTANCE) && (Math.abs(deltaX) < DRAG_THRESHHOLD_DISTANCE)) {
          // console.log('swipe down...');
          this.moveDown();
        } else if ((-deltaY > DRAG_THRESHHOLD_DISTANCE) && (Math.abs(deltaX) < DRAG_THRESHHOLD_DISTANCE)) {
          // console.log('swipe up...');
          this.moveUp();
        } // else if ((deltaX > DRAG_THRESHHOLD_DISTANCE) && (Math.abs(deltaY) < DRAG_THRESHHOLD_DISTANCE)) {
        // 	o.innerHTML = 'swipe right';
        // } else if ((-deltaX > DRAG_THRESHHOLD_DISTANCE) && (Math.abs(deltaY) < DRAG_THRESHHOLD_DISTANCE)) {
        // 	o.innerHTML = 'swipe left';
        // }
      }

    }
  }

  /**
   *
   */
  renderSkills() {
    return this.state.skills.map((skill, i) => {
      const {
        opacity,
        xOffset,
        y,
        isActive,
      } = skill;

      return (
        <Skill
          key={i}
          style={{
            opacity: opacity,
            transform: `translate(${xOffset * this.props.offset}px, ${y}${UNIT})`,
          }}
          className={isActive && 'is-active'}
          aria-current={isActive ? 'true' : 'false'}
          aria-hidden={opacity === 0 ? 'true' : 'false'}
        >
          {SKILLS_LIST[i]}
        </Skill>
      );
    });
  }

  /**
   *
   */
  render() {
    return (
      <Skills className="Skills">
        {/* <SkillDesc>
          I like to run <span className="u">social experiments</span>, and also
        </SkillDesc> */}
        <SkillList
          onPointerDown={this.handleSwipeStart}
          onPointerMove={this.handleSwipe}
          onPointerUp={this.handleSwipeEnd}
          onPointerLeave={this.handleSwipeEnd}
          onPointerCancel={this.handleSwipeEnd}
        >
          {this.renderSkills()}
        </SkillList>
        <Controls>
          <UpButton onClick={(e) => this.handleSkillsScroll(e, 'up')}>
            <ArrowUp
              glyph={Chevron}
              width={24}
              height={20}
              viewBox='0 0 20 24'
              title="Scroll up"
            />
          </UpButton>
          <DownButton onClick={(e) => this.handleSkillsScroll(e, 'down')}>
            <ArrowDown
              glyph={Chevron}
              width={24}
              height={20}
              viewBox='0 0 20 24'
              title="Scroll down"
            />
          </DownButton>
        </Controls>
      </Skills>
    )
  }
}

SkillsList.propTypes = PROP_TYPES;
SkillsList.defaultProps = DEFAULT_PROPS;

export default SkillsList;
