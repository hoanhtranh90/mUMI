import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';

const getFileIconFromExt = ext => {
  switch (ext) {
    case 'pdf':
      return 'file-pdf';

    case 'png':
    case 'jpg':
    case 'jpeg':
      return 'file-image';

    case 'doc':
    case 'docx':
      return 'file-word';

    case 'xlsx':
    case 'xls':
      return 'file-excel';

    default:
      return 'file';
  }
};

const FileIcon = ({ ext, ...props }) => (
  <Icon type="FontAwesome5" name={getFileIconFromExt(ext)} {...props} />
);

FileIcon.propTypes = {
  ext: PropTypes.string.isRequired,
};

export default FileIcon;
