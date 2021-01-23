import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'native-base';

import HistoryTree from './HistoryTree';

const Process = ({ history, loadDocumentHistory }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocumentHistory();
  }, []);
  useEffect(
    () => {
      if (history) {
        console.log('history');
        console.log(history);
        setLoading(false);
      }
    },
    [history]
  );

  return (
    <>
      {loading && <Spinner />}
      {!loading && <HistoryTree data={history} />}
    </>
  );
};

Process.propTypes = {
  history: PropTypes.shape({}),
  loadDocumentHistory: PropTypes.func,
};
Process.defaultProps = {
  history: {},
  loadDocumentHistory() {},
};

export default Process;
