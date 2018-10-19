import React from 'react';
import styled from 'styled-components';

import Icon from '../../components/Icon';
import { Github, Twitter, LinkedIn } from '../../components/Icon/glyphs';
// import { ReactComponent as Github } from '../../images/icons/github.svg';
// import { ReactComponent as Twitter } from '../../images/icons/twitter.svg';
// import { ReactComponent as LinkedIn } from '../../images/icons/linkedin.svg';

const SocialNav = styled.nav``;

const SocialLink = styled.a`
  line-height: 0;

  & + & {
    margin-left: 0.8em;
  }
`;

const Social = (props) => {
  return (
    <SocialNav {...props}>
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
    </SocialNav>
  );
};

export default Social;
