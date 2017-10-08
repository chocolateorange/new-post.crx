import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import style from './index.css';

const cx = classNames.bind(style);

class Definitions extends React.Component {
  render() {
    const {
      className,
      definitions,
    } = this.props;

    return (
      <dl className={cx('dl', className)}>
        {
          definitions.map(
            ({ description, term }) => [
              (<dt className={style.dt} key={term}>{term}</dt>),
              (<dd className={style.dd} key={description}>{description}</dd>),
            ]
          )
        }
      </dl>
    );
  }
}

Definitions.propTypes = {
  className: PropTypes.string,
  definitions: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      term: PropTypes.string,
    })
  ),
};

export default Definitions;
