import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import style from './index.css';

const cx = classNames.bind(style);

class TitleHeader extends React.Component {
  render() {
    const {
      className,
      title,
    } = this.props;

    return (
      <h1 className={cx('title', className)}>{title}</h1>
    );
  }
}

TitleHeader.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
};

export default TitleHeader;
