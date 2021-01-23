import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'native-base';

import { ADVANCE_SEARCH_LABELS, DOC_USER_STATUS } from 'eoffice/constants/documents';
import DateRangePicker from 'eoffice/components/DateRangePicker';
import IconField from 'eoffice/components/IconField';
import Picker from 'eoffice/components/Picker';
import styles from './AdvancedSearch.styles';
import colors from '../../../utils/colors';

const VbDiSearchForm = ({
  departments,
  query,
  setValue,
  state,
  status,
  priorities,
  categories,
}) => {
  const departmentItems = departments.map(({ id, deptName }) => ({
    label: deptName,
    value: id,
  }));
  const prioritiesItems = priorities.map(({ id, categoryName }) => ({
    label: categoryName,
    value: id,
  }));
  const categoriesItems = categories.map(({ id, categoryName }) => ({
    label: categoryName,
    value: id,
  }));
  // console.log(query)
  return (
    <>
      <Form style={styles.form}>
        <IconField label={ADVANCE_SEARCH_LABELS.quote} iconName="type" highlight={!!state.quote}>
          <Input
            placeholder="-"
            placeholderTextColor={colors.gray}
            value={state.quote}
            onChangeText={txt => setValue('quote', txt)}
          />
        </IconField>

        <IconField
          label={ADVANCE_SEARCH_LABELS.fileContent}
          iconName="file-text"
          highlight={!!state.fileContent}
        >
          <Input
            placeholder="-"
            placeholderTextColor={colors.gray}
            value={state.fileContent}
            onChangeText={txt => setValue('fileContent', txt)}
          />
        </IconField>

        <IconField
          label={ADVANCE_SEARCH_LABELS.publisherIdDi}
          iconName="edit-2"
          highlight={!!state.publisherId}
        >
          <Picker
            mode="dropdown"
            placeholder="-"
            selectedValue={state.publisherId}
            onValueChange={val =>
              setValue('publisherId', val === state.publisherId ? undefined : val)
            }
            items={departmentItems}
          />
        </IconField>
        <IconField
          label={ADVANCE_SEARCH_LABELS.docTypeId}
          iconName="edit-2"
          highlight={!!state.docTypeId}
        >
          <Picker
            mode="dropdown"
            placeholder="-"
            selectedValue={state.docTypeId}
            onValueChange={val => setValue('docTypeId', val === state.docTypeId ? undefined : val)}
            items={categoriesItems}
          />
        </IconField>
        {/* {status !== DOC_USER_STATUS.DU_THAO && (
          <IconField
            label={ADVANCE_SEARCH_LABELS.docDate}
            iconName="calendar"
            highlight={!!state.createTime[0]}
          >
            <DateRangePicker
              value={state.createTime}
              onChange={range => setValue('createTime', range)}
            />
          </IconField>
        )} */}

        {query.typeDoc === 'phathanh' && (
          <IconField
            label={ADVANCE_SEARCH_LABELS.docDate}
            iconName="calendar"
            highlight={!!state.createTime[0]}
          >
            <DateRangePicker
              value={state.createTime}
              onChange={range => setValue('createTime', range)}
            />
          </IconField>
        )}

        {/* {query.status === DOC_USER_STATUS.DA_XU_LY && state.vbDocUserUpdateTime.length > 0 && (
          <IconField
            label={ADVANCE_SEARCH_LABELS.vbDocUserUpdateTime}
            iconName="calendar"
            highlight={!!state.vbDocUserUpdateTime[0]}
          >
            <DateRangePicker
              value={[state.vbDocUserUpdateTime]}
              onChange={range => setValue('vbDocUserUpdateTime', range)}
            />
          </IconField>
        )} */}

        <IconField
          label={ADVANCE_SEARCH_LABELS.receiveDeptId}
          picker
          iconName="map-pin"
          highlight={!!state.receiveDeptId}
        >
          <Picker
            mode="dropdown"
            placeholder="-"
            selectedValue={state.receiveDeptId}
            onValueChange={val =>
              setValue('receiveDeptId', val === state.receiveDeptId ? undefined : val)
            }
            items={departmentItems}
          />
        </IconField>

        <IconField
          label={ADVANCE_SEARCH_LABELS.otherReceivePlaces}
          iconName="map-pin"
          highlight={!!state.otherReceivePlaces}
        >
          <Input
            placeholder="-"
            placeholderTextColor={colors.gray}
            value={state.otherReceivePlaces}
            onChangeText={txt => setValue('otherReceivePlaces', txt)}
          />
        </IconField>

        <IconField
          label={ADVANCE_SEARCH_LABELS.priorityId}
          iconName="zap"
          highlight={!!state.priorityId}
        >
          <Picker
            mode="dropdown"
            placeholder="-"
            selectedValue={state.priorityId}
            onValueChange={val =>
              setValue('priorityId', val === state.priorityId ? undefined : val)
            }
            items={prioritiesItems}
          />
        </IconField>
      </Form>
    </>
  );
};

VbDiSearchForm.propTypes = {
  departments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      deptName: PropTypes.string.isRequired,
    })
  ).isRequired,
  priorities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      categoryName: PropTypes.string.isRequired,
    })
  ).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      categoryName: PropTypes.string.isRequired,
    })
  ).isRequired,
  query: PropTypes.shape({}),

  setValue: PropTypes.func,
  state: PropTypes.shape({}),
  status: PropTypes.number,
};
VbDiSearchForm.defaultProps = {
  setValue() {},
  state: {},
  status: null,
  query: {},
};

export default VbDiSearchForm;
