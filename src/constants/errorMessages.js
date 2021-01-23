import { sprintf } from 'sprintf-js';

import messages from './errors';

export function getErrorMessage(errorCode, params) {
  const message = messages[errorCode];
  if (!params) {
    return message;
  }

  try {
    return sprintf(message, params);
  } catch (e) {
    return message;
  }
}
