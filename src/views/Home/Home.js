import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import SkillsList from '../../components/SkillsList';
// import Icon from '../../components/Icon';
// import { Chevron } from '../../components/Icon/glyphs';
import { formatFontFamilyMap } from '../../styles/utils.js';
import theme from '../../styles/variables/index.js';

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

export default class Home extends Component {

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

        <SkillsList />

      </Container>
    );
  }
}
