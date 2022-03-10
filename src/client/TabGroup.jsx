import React, { Component } from 'react';
import PropTypes from 'prop-types';

const TABS = [
  { page: 'home', label: 'List All Books' },
  { page: 'create', label: 'Create a Book' },
  { page: 'delete', label: 'Delete a Book' },
];
// eslint-disable-next-line react/prefer-stateless-function
class TabGroup extends Component {
  render() {
    const { activeTab, onTabClicked } = this.props;
    return (
      <ul className="nav nav-pills">
        {TABS.map((tab, idx) => (
          <li className={tab.page === activeTab ? 'active' : ''} key={`${tab.label}`}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              onClick={() => {
                onTabClicked(tab.page);
              }}
              onKeyDown={() => {}}
              role="button"
              tabIndex={idx}
            >
              {tab.label}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

TabGroup.defaultProps = {
  activeTab: PropTypes.bool,
  onTabClicked: PropTypes.func,
};

TabGroup.propTypes = {
  activeTab: PropTypes.bool,
  onTabClicked: PropTypes.func,
};

export default TabGroup;
