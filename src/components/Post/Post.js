import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Post.css';

const PROP_TYPES = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  teaser: PropTypes.string,
  date: PropTypes.string,
  dateTime: PropTypes.string,
  readMoreLabel: PropTypes.string,
};

const DEFAULT_PROPS = {
  readMoreLabel: 'Read More',
};

const Post = ({ title, url, teaser, date, dateTime, readMoreLabel }) => (
  <article className="Post">
    <h3 className="Post__title">
     <Link className="Post__title__link" to={url}>
       {title}
     </Link>
    </h3>
    {date &&
      <time className="Post__date" dateTime={dateTime}>
        {date}
      </time>
    }
    {teaser &&
      <p className="Post__teaser">{teaser}</p>
    }
    <Link className="Post__link" to={url}>
      {readMoreLabel} &rarr;
    </Link>
  </article>
);

Post.propTypes = PROP_TYPES;
Post.defaultProps = DEFAULT_PROPS;

export default Post;
