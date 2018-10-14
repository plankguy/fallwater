import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import Icon from '../../components/Icon';
import { Chevron } from '../../components/Icon/glyphs';
import { formatFontFamilyMap } from '../../styles/utils.js';
import theme from '../../styles/variables/index.js';

// @NOTE: these could be passed as props...
const SKILLS_LIST = [
  <React.Fragment><span className="u">samples</span> beer</React.Fragment>,
  <React.Fragment><span className="u">plays</span> hockey</React.Fragment>,
  <React.Fragment><span className="u">leads</span> people</React.Fragment>,
  <React.Fragment><span className="u">writes</span> code</React.Fragment>,
  <React.Fragment><span className="u">designs</span> UIs</React.Fragment>,
  <React.Fragment><span className="u">travels</span> places</React.Fragment>,
  <React.Fragment><span className="u">chills</span> at the beach</React.Fragment>,
  <React.Fragment><span className="u">parents</span> his kids</React.Fragment>,
];
const SKILL_HEIGHT = '9'; // 50;
const UNIT = 'vh'; // 'px';
const SKILLS_VISIBLE = 5; // ! should be odd number
const MIDPOINT = Math.ceil(SKILLS_VISIBLE / 2);
const DRAG_THRESHHOLD_TIME = 500;
const DRAG_THRESHHOLD_DISTANCE = 50;

/**
 * Styled components
 */
const Container = styled.div`
  display: grid;
  grid-template: auto / ${(props) => (1 - props.overlayWidth) * 100}% ${(props) => props.overlayWidth * 100}%;
  align-items: center;
  height: 100%;
`;

const Heading = styled.div`
  position: relative;
`;

const Name = styled.h1`
  font: 900 15vw/0.9 ${formatFontFamilyMap(theme.font.family.display)};
  text-indent: 0.1em;
  left: -0.34em;
  text-align: center;
  position: relative;
  margin: 0;
  -webkit-text-stroke: 3px rgba(255, 255, 255, 1);
  -webkit-font-smoothing: subpixel-antialiased;
  -webkit-text-fill-color: transparent;
`;

const Established = styled.p`
  position: absolute;
  top: 10%;/* 0.7em; */
  right: 10%;/* 1.8em; */
  padding: 1.5vw 0 1.0vw 3.2vw;
  line-height: 1.2;
  text-align: center;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-left: 2px solid ${theme.color.text};
  }

  .label {
    display: block;
    font-size: 0.78vw;/* 0.5em; */
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-weight: 600;
  }
  .year {
    display: block;
    font-size: 3.35vw;/* 2.05em; */
  }
`;

const Skills = styled.div`
  /* left: 0; */
  /* display: flex; */
  /* flex-wrap: nowrap;
  align-items: center; */
  font-size: 1.4em; /* 5vmin; */
  font-weight: 300;
  /* position: relative; */
  /* margin-right: 150px; */
`;

const SkillDesc = styled.div`
  margin-right: 0.3em;
  text-align: right;
`;

// List of skills
const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  /* position: absolute;
  top: -${SKILL_HEIGHT * SKILLS_VISIBLE / 2}${UNIT}; */
  width: 200px;
  height: ${SKILL_HEIGHT * SKILLS_VISIBLE}${UNIT};
	touch-action: none;
`;

const Skill = styled.li`
  margin: 2.0em 0;
  position: absolute;
  height: ${SKILL_HEIGHT}${UNIT};
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
      border-bottom: 1px solid ${theme.color.text};
      /* transform: translateX(50%); */
      opacity: 0;
      transition: opacity 2000ms ease-in, transform 200ms ease-in;
    }
  }

  &.is-active {
    .u {
      &::after {
        /* transform: translateX(0); */
        opacity: 1.0;
      }
    }
  }
`;

const Controls = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
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
  background-color: rgba(255, 255, 255, 0.3);
  padding: 0.4em 0.6em;
  color: ${theme.color.text};
  transition: background-color 400ms ease-in;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
  &:focus {
    outline: 0;
  }
  &:active {
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

const UpButton = styled.button`
  ${buttonResetCss}
  ${buttonStyles}
`;
const DownButton = styled.button`
  ${buttonResetCss}
  ${buttonStyles}
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

export default class Home extends Component {

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
    console.log('componentDidMount() state:', this.state);

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
    let skillIdReset;

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
    let skillIdReset;

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
    const overMax = stateKey > SKILLS_VISIBLE;
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
    //
    const x =
      Math.max(
        (stateKey < MIDPOINT) ?
        // before midpoint - start indenting
        5 * (stateKey + 1)
        :
        // after midpoint - remove indents
        5 * (reverseIterator - MIDPOINT)
      , 0);
    // Flag as active
    const isActive = opacity === 1;

    return {
      stateKey,
      // i,
      y,
      x,
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
          console.log('swipe down...');
          this.moveDown();
				} else if ((-deltaY > DRAG_THRESHHOLD_DISTANCE) && (Math.abs(deltaX) < DRAG_THRESHHOLD_DISTANCE)) {
          console.log('swipe up...');
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
      const { opacity, x, y, isActive } = skill;
      return (
        <Skill
          key={i}
          style={{
            opacity: opacity,
            transform: `translate(-${x}px, ${y}${UNIT})`,
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
      <Container
        overlayWidth={this.props.overlayWidth}
      >
        <Heading>
          <Name>
            Jeff<br /> Waterfall
          </Name>
          <Established>
            <span className="label">Established </span>
            <span className="year">1978</span>
          </Established>
        </Heading>

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
                width={20}
                viewBox='0 0 20 24'
              />
            </UpButton>
            <DownButton onClick={(e) => this.handleSkillsScroll(e, 'down')}>
              <ArrowDown
                glyph={Chevron}
                width={24}
                width={20}
                viewBox='0 0 20 24'
              />
            </DownButton>
          </Controls>
        </Skills>
      </Container>
    );
  }
}
