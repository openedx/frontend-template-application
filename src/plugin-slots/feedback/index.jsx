import React, { useState } from 'react';
import FeedbackComponent from './FeedbackComponent';

/**
 * Plugin-slot entry for feedback. Owns open/close state so FeedbackComponent
 * can toggle without requiring parents to pass isOpen/setIsOpen.
 */
const Feedback = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FeedbackComponent
      {...props}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
};

export default Feedback;
