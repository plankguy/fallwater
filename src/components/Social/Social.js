import React from 'react';
import styled from 'styled-components';

import Icon from '../../components/Icon';
import {
  Github,
  Twitter,
  LinkedIn,
  Email,
  // CodePen,
} from '../../components/Icon/glyphs';
// import { ReactComponent as Github } from '../../images/icons/github.svg';

const SocialNav = styled.nav``;

const SocialLink = styled.a`
  line-height: 0;
  position: relative;

  & + & {
    margin-left: 0.8em;
  }
`;

const Social = (props) => {
  return (
    <SocialNav {...props}>
      <SocialLink
        href="mailto:&#106;&#101;&#102;&#102;&#64;&#102;&#97;&#108;&#108;&#119;&#97;&#116;&#101;&#114;&#46;&#99;&#97;"
        rel="noopener"
      >
        <Icon
          glyph={Email}
          title="Email me"
        />
      </SocialLink>
      <SocialLink
        href="https://github.com/plankguy"
        target="_blank"
        rel="noopener"
      >
        <Icon glyph={Github} title="Find me on Github" />
      </SocialLink>
      <SocialLink
        href="https://twitter.com/plankguy"
        target="_blank"
        rel="noopener"
      >
        <Icon glyph={Twitter} title="Find me on Twitter" />
      </SocialLink>
      <SocialLink
        href="https://www.linkedin.com/in/jeffwaterfall/"
        target="_blank"
        rel="noopener"
        style={{top: '-0.1em'}}
      >
        <Icon glyph={LinkedIn} title="Find me on LinkedIn" />
      </SocialLink>
      {/* <SocialLink
        href="https://codepen.io/plankguy/"
        target="_blank"
        rel="noopener"
      >
        <Icon
          glyph={CodePen}
          title="Find me on CodePen"
          viewBox="0 0 50 50"
        />
      </SocialLink> */}
    </SocialNav>
  );
};

export default Social;
