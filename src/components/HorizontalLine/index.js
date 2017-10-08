import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import style from './index.css';

const cx = classNames.bind(style);

class HorizontalLine extends React.Component {
  render() {
    const {
      className,
    } = this.props;

    return (
      <hr className={cx('line', className)} />
    );
  }
}

HorizontalLine.propTypes = {
  className: PropTypes.string,
};

export default HorizontalLine;
