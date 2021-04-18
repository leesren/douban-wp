import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Exception from './items';

class NotFound extends Component {
  render() {
    return <Exception type="404" />;
  }
}

export default NotFound;
