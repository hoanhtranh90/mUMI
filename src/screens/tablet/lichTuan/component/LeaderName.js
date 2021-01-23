import React, { useEffect, useState } from 'react';
import * as service from '../../../../store/administrative/lichTuan/detail/service';
import _ from 'lodash';
import { StyleSheet, Text } from 'react-native';
import { groupActors } from 'eoffice/utils/utils';
const styles = StyleSheet.create({
  textBlue: {
    color: '#0073ff',
    fontWeight: 'normal',
    lineHeight: 25,
  },
});
export default function({ item, actorsGroup, textStyle }) {
  const [groupsName, setGroupsName] = useState([]);

  const loadLD = () => {
    return service.getDetailLT({ caseMasterId: item.caseMasterId });
  };

  const populateLDGroup = detail => {
    const hcCaseCalendarUsers = detail.hcCaseCalendarUsers;
    let groups = groupActors(hcCaseCalendarUsers, actorsGroup);
    setGroupsName(groups);
  };

  useEffect(
    () => {
      let isMounted = true;
      loadLD().then(data => {
        if (isMounted) populateLDGroup(data);
      });
      return () => {
        isMounted = false;
      };
    },
    [item, actorsGroup]
  );

  const LeaderName = () => {
    let ldsName = groupsName.map(item =>
      item.type === 'group'
        ? item.filter.actorGroupName
        : `${item.data.gender === 0 ? 'Chị' : 'Anh'} ${item.data.fullName}`
    );
    return (
      <Text style={[styles.textBlue, textStyle]}>
        {ldsName.length > 0 ? ldsName.join(', ') : ''}
      </Text>
    );
  };

  return <LeaderName />;
}
