import React from 'react';
import { interestsList } from '../../data/initialData';

export default function InterestsCard() {
  return (
    <div className="w3-card w3-round w3-white w3-hide-small">
      <div className="w3-container">
        <p><strong>Intereses</strong></p>
        <p>
          {interestsList.map(item => (
            <React.Fragment key={item.id}>
              <span className={`w3-tag w3-small ${item.badgeClass}`}>
                {item.label}
              </span>{' '}
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
}
