import React from 'react';
import { formatDistance } from 'date-fns';

const LastUpdatedIndicator = (props) => (
  <div className="live-indicator-wrapper">
    <div className="live-indicator" />
    <div className="last-updated-main">
      {' '}
      Updated
      {' '}
      {formatDistance(
        new Date(Date.parse(`${props.lastUpdated.slice(0, 19)}+05:30`)),
        new Date(),
      )}
      {' '}
      ago
    </div>
  </div>
);

export default LastUpdatedIndicator;
