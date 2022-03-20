import React, { Component } from 'react';
import etsyLogo from '../../../public/Etsy_logo.svg.png';

const iconStyle = {
  height: 30,
  width: 60,
  margin: 'auto 6px',
};


// eslint-disable-next-line react/prefer-stateless-function
class EtsyLogo extends Component {
  render() {
    return (
      <img style={iconStyle} src={etsyLogo} alt="Logo" />
    );
  }
}

EtsyLogo.defaultProps = {
};

EtsyLogo.propTypes = {
};

export default EtsyLogo;
