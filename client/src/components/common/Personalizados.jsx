import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';

const LinkCustom = React.forwardRef((itemProps, ref) => {
  return <LinkRouter ref={ref} {...itemProps} role={undefined} />;
});

export { LinkCustom };