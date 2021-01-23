import axios from '../axios';

export const listDashboardIncomingDocs = () =>
  axios
    .get('/dashboard/getIncomingDocsDashBoard', {
      // params: { page: 0, size: 10, sort: 'docDate,desc' },
      params: { page: 0, size: 10, sort: 'sendTime,desc' },
    })
    .then(({ data }) => ({
      count: data.docsCount,
      countNew: data.unreadDocsCount,
      list: data.docs.map(doc => ({
        ...doc,
        key: JSON.stringify(doc.vbIncomingDocUserViewKey),
        docId: doc.vbIncomingDocUserViewKey.id,
      })),
    }));

export const listDashboardOutgoingDocs = () =>
  axios
    .get('/dashboard/getOutgoingDocsDashBoard', {
      params: { page: 0, size: 10, sort: 'createTime,desc' },
    })
    .then(({ data }) => ({
      count: data.docsCount,
      countNew: data.unreadDocsCount,
      list: data.docs.map(doc => ({
        ...doc,
        key: JSON.stringify(doc.vbOutgoingDocUserViewKey),
        docId: doc.vbOutgoingDocUserViewKey.id,
      })),
    }));
