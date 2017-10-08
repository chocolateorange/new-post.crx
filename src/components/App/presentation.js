import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Definitions from '../Definitions';
import HorizontalLine from '../HorizontalLine';
import LabeledInput from '../LabeledInput';
import LabeledTextArea from '../LabeledTextArea';
import TitleHeader from '../TitleHeader';

import style from './index.css';

const cx = classNames.bind(style);

class Presentation extends React.Component {
  constructor() {
    super();

    this.handleChange = this.onChange.bind(this);
    this.handleRevert = this.onRevert.bind(this);
    this.handleSave = this.onSave.bind(this);
  }

  onChange(event) {
    const {
      onChangeConfig,
    } = this.props;

    onChangeConfig({
      name: event.target.id,
      value: event.target.value,
    });
  }

  onRevert(event) {
    const {
      onClickRevert,
    } = this.props;

    onClickRevert();
  }

  onSave(event) {
    const {
      onClickSave,
    } = this.props;

    onClickSave();
  }

  render() {
    const {
      account,
      branch,
      className,
      disableRevert,
      disableSave,
      path,
      repository,
      template,
    } = this.props;

    return (
      <section className={cx('options', className)}>
        <TitleHeader className={cx('title-header')} title="new-post options" />

        <HorizontalLine className={cx('horizontal-line')} />

        <LabeledInput
          className={cx('labeled-input')}
          id="account"
          name="account"
          onChange={this.handleChange}
          placeholder="chocolateorange"
          value={account}
        />
        <LabeledInput
          className={cx('labeled-input')}
          id="repository"
          name="repository"
          onChange={this.handleChange}
          placeholder="chocolateorange.github.io"
          value={repository}
        />
        <LabeledInput
          className={cx('labeled-input')}
          id="branch"
          name="branch"
          onChange={this.handleChange}
          placeholder="master"
          value={branch}
        />
        <LabeledInput
          className={cx('labeled-input')}
          id="path"
          name="path"
          onChange={this.handleChange}
          placeholder="_posts/{{ YYYY }}/{{ MM }}/{{ YYYY }}-{{ MM }}-{{ DD }}-{{ No }}.md"
          value={path}
        />

        <Definitions
          definitions={
            [
              {
                term: '{{ YYYY }}',
                description: 'replace to year',
              },
              {
                term: '{{ MM }}',
                description: 'replace to month',
              },
              {
                term: '{{ DD }}',
                description: 'replace to date',
              },
              {
                term: '{{ No }}',
                description: 'replace to serial number',
              },
            ]
          }
        />

        <LabeledTextArea
          className={cx('labeled-textarea')}
          id="template"
          name="template"
          onChange={this.handleChange}
          placeholder={'---\nlayout: default\ntitle:\n---'}
          value={template}
        />

        <HorizontalLine className={cx('horizontal-line')} />

        <div className={cx('button-area')}>
          <input type="button" value="revert" disabled={disableRevert} onClick={this.handleRevert} />
          <input type="button" value="save" disabled={disableSave} onClick={this.handleSave} />
        </div>

      </section>
    );
  }
}

Presentation.propTypes = {
  account: PropTypes.string,
  branch: PropTypes.string,
  className: PropTypes.string,
  disableRevert: PropTypes.bool,
  disableSave: PropTypes.bool,
  onChangeConfig: PropTypes.func,
  path: PropTypes.string,
  repository: PropTypes.string,
  template: PropTypes.string,
};

export default Presentation;
