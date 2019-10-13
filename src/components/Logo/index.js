import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import logo from '~/assets/logo.png';

export default function Logo({ size }) {
  return <Image source={logo} style={{ height: size, width: size }} />;
}

Logo.defaultProps = {
  size: 60,
};
Logo.propTypes = {
  size: PropTypes.number,
};
