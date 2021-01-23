import { useState } from 'react';

export default function(defaultState = false) {
  const [visible, setVisible] = useState(defaultState);
  const open = () => setVisible(true);
  const close = () => setVisible(false);

  return [visible, open, close];
}
