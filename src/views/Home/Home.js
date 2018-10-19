import React, { Component } from 'react';
import styled from 'styled-components';

import SkillsList from '../../components/SkillsList';
import { formatFontFamilyMap } from '../../styles/utils.js';
import * as theme from '../../styles/variables/index.js';
import val from '../../styles/utils.js';

/**
 * Styled components
 */
const introHeightSm = `${theme.header.sm.height.val + (theme.wrapper.sm.borderWidth.val * 2) + (theme.wrapper.sm.space.val * 2) + theme.spacing.base.val}px`;
const skillsHeightSm = `${theme.header.sm.height.val + (theme.wrapper.sm.borderWidth.val * 2) + (theme.wrapper.sm.space.val * 2) + theme.spacing.base.val + theme.footer.sm.height.val}px`;
const Grid = styled.div`
  max-width: 100%;
  display: grid;
  align-items: center;

  /* Small screens */
  @media (max-width: ${val(theme.breakpoint.sm)}) {
    grid-template-rows: calc(100vh - ${introHeightSm}) calc(100vh - ${skillsHeightSm});
    grid-template-columns: auto;
    grid-template-areas:
      'intro'
      'skills';
  }

  /* Large screens */
  @media (min-width: ${val(theme.breakpoint.sm)}) {
    height: 100%;
    grid-template-rows: auto;
    grid-template-columns: ${(props) => (1 - props.overlayWidth) * 100}% ${(props) => props.overlayWidth * 100}%;
    grid-template-areas: 'intro skills';
  }
`;

const Intro = styled.div`
  grid-area: intro;
  position: relative;
  margin-top: -1.5em;
  max-width: 100%;
  overflow: hidden;

  /* Large screens */
  @media (min-width: ${val(theme.breakpoint.sm)}) {
    min-height: auto;
    overflow: visible;
    top: auto;
  }
`;

const Name = styled.h1`
  font: 900 24vw/0.88 ${formatFontFamilyMap(theme.font.family.display)};
  text-align: center;
  margin: 0;
  height: 100%;
  text-indent: 0.1em; /* indent to make "J" Align with "a" */
  transform: translateX(-0.25em);
  -webkit-text-stroke: 1px rgba(255, 255, 255, 1);
  -webkit-font-smoothing: subpixel-antialiased;
  -webkit-text-fill-color: transparent;

  @media (min-width: ${val(theme.breakpoint.sm)}) {
    font-size: 15vw;
    text-indent: 0.2em; /* indent to make "J" Align with "a" */
    -webkit-text-stroke: 3px rgba(255, 255, 255, 1);
    transform: translateX(-0.34em);
  }
`;

const Established = styled.p`
  letter-spacing: 0.2em;
  text-align: center;

  @media (min-width: ${val(theme.breakpoint.sm)}) {
    text-align: left;
  }

  @media (min-width: ${val(theme.breakpoint.sm)}) {
    position: absolute;
    top: 10%;/* 0.7em; */
    right: 1.8em;/* 10%; */
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
      border-left: 2px solid ${val(theme.color.text)};
    }
  }

  .label {
    text-transform: uppercase;

    @media (min-width: ${val(theme.breakpoint.sm)}) {
      font-weight: 600;
      display: block;
      font-size: 0.78vw;/* 0.5em; */
    }
  }
  .year {
    @media (min-width: ${val(theme.breakpoint.sm)}) {
      display: block;
      font-size: 3.35vw;/* 2.05em; */
    }
  }
`;

const SkillsContainer = styled.div`
  grid-area: skills;
`;

export default class Home extends Component {

  render() {
    return (
      <Grid
        overlayWidth={this.props.overlayWidth}
        className="Grid"
      >
        <Intro className="Intro">
          <Name>
            Jeff<br /> Waterfall
          </Name>
          <Established>
            <span className="label">Established{' '}</span>
            <span className="year">1978</span>
          </Established>
        </Intro>

        <SkillsContainer>
          <SkillsList
            offset={0}
          />
        </SkillsContainer>

      </Grid>
    );
  }
}
