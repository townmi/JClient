import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Products.scss';


class Products extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <h1 className="page-title">Products <small><small>The Lucky One</small></small></h1>
      </div>
    );
  }
}

export default (withStyles(s)(Products));
