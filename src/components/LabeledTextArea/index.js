import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import style from './index.css';

const cx = classNames.bind(style);

class LabeledTextArea extends React.Component {
  render() {
    const {
      className,
      id,
      name,
      onChange,
      placeholder,
      value,
    } = this.props;

    return (
      <div className={cx('area', className)}>
        <label className={style.label} htmlFor={id}>
          <h2 className={style.title}>{name}</h2>
        </label>
        <textarea
          className={style.textarea}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          rows="8"
          type="text"
          value={value}
        />
      </div>
    );
  }
}

LabeledTextArea.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default LabeledTextArea;
