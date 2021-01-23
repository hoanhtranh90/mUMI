import axios from 'eoffice/store/axios';

export const getTokenForNote = ({ noteId, attachmentId }) =>
  axios
    .get(`/vbAttachmentToken/getTokenForNote`, { params: { noteId, vbAttachmentId: attachmentId } })
    .then(res => res.data.token);

export const getTokenCommon = ({ attachmentId }) =>
  axios
    .get(`/vbAttachmentToken/getToken`, { params: { vbAttachmentId: attachmentId } })
    .then(res => res.data.token);

export const getTokenFileFlight = params => {
  return axios.get(`/vbAttachmentToken/getToken`, { params: params }).then(res => res.data.token);
};

export const getTokenRelationDoc = (taskId, docId) =>
  axios
    .get(`/vbAttachmentToken/getTokenForDocRelateWithTask`, { params: { taskId, docId } })
    .then(res => [res.data.token, res.data.vbAttachmentId]);

export const getAttachmentById = attachmentId =>
  axios.get(`/vbAttachment/${attachmentId}`).then(res => res.data);

export const getTokenForHcCommandsDocRelation = (
  objectId,
  objectType,
  referenceObjectType,
  referenceObjectId
) => {
  return axios
    .get('vbAttachmentToken/getTokenForHcCommandsDocRelation', {
      params: {
        objectId: objectId,
        objectType: objectType,
        referenceObjectType: referenceObjectType,
        referenceObjectId: referenceObjectId,
      },
    })
    .then(res => {
      return res.data;
    });
};
