import * as noteService from '../../service/notesService';
import { NOTE_DATA_TYPE } from '../../constants/common';

const initNote = () => {
  return {
    id: new Date().getTime(),
    title: '',
    createTime: new Date(),
    dataJson: [{ type: 'text', value: '' }],
  };
};

const initState = {
  listNote: [],
  listNoteFinal: [],
  query: {},
  noteDetail: null,
  isOpenDetail: false,
};

const ACTION_TYPE = {
  RESET: 'notes/RESET',
  SET_LIST_NOTE: 'notes/SET_LIST_NOTE',
  SET_LIST_NOTE_FINAL: 'notes/SET_LIST_NOTE_FINAL',
  SET_QUERY: 'notes/SET_QUERY',
  SET_NOTE_DETAIL: 'notes/SET_NOTE_DETAIL',
  SET_NOTE_TEMP: 'notes/SET_NOTE_TEMP',
};

export default function(state = initState, action) {
  switch (action.type) {
    case ACTION_TYPE.SET_LIST_NOTE:
      return {
        ...state,
        listNote: [...action.payload.listNote],
      };
    case ACTION_TYPE.SET_LIST_NOTE_FINAL:
      return {
        ...state,
        listNoteFinal: [...action.payload.listNoteFinal],
      };
    case ACTION_TYPE.SET_QUERY:
      return {
        ...state,
        query: action.payload.query,
      };
    case ACTION_TYPE.SET_NOTE_DETAIL:
      return {
        ...state,
        noteDetail: action.payload.noteDetail,
      };
    case ACTION_TYPE.RESET:
      return { ...initState };
    default:
      return state;
  }
}

export const loadListNote = query => async (dispatch, getState) => {
  await dispatch(insertNoteClient());
  dispatch({ type: ACTION_TYPE.SET_QUERY, payload: { query } });
  let listNote = await noteService.findAll(query);
  dispatch({ type: ACTION_TYPE.SET_LIST_NOTE, payload: { listNote } });
  dispatch({ type: ACTION_TYPE.SET_LIST_NOTE_FINAL, payload: { listNoteFinal: listNote } });
  if (listNote && listNote.length > 0) {
    const noteDetail = getState().noteV2.noteDetail;
    const noteWillSelect = listNote.find(note => note.id === noteDetail?.id);
    if (!noteWillSelect) {
      dispatch({
        type: ACTION_TYPE.SET_NOTE_DETAIL,
        payload: { noteDetail: convertData(listNote[0]) },
      });
    }
  } else {
    dispatch({ type: ACTION_TYPE.SET_NOTE_DETAIL, payload: { noteDetail: null } });
  }
};

const convertData = noteDetail => {
  let noteConverted = { ...noteDetail };
  noteConverted.dataJson =
    typeof noteConverted.dataJson === 'string'
      ? JSON.parse(noteConverted.dataJson)
      : noteConverted.dataJson;
  return noteConverted;
};

export const findNoteById = id => async (dispatch, getState) => {
  await dispatch(insertNoteClient());
  let listNote = getState().noteV2.listNote;
  let noteDetail = listNote.find(note => note.id === id);
  if (noteDetail) {
    dispatch({
      type: ACTION_TYPE.SET_NOTE_DETAIL,
      payload: { noteDetail: convertData(noteDetail) },
    });
  }
};

export const insertNoteClient = () => async (dispatch, getState) => {
  const noteDetail = getState().noteV2.noteDetail;
  if (noteDetail) {
    if (typeof noteDetail.id === 'number') {
      if (isHasData(noteDetail)) {
        let noteSaved = await insertNote(noteDetail);
        let listNote = getState().noteV2.listNote;
        let index = listNote.findIndex(note => typeof note.id === 'number');
        listNote[index].id = noteSaved.id;
        dispatch({ type: ACTION_TYPE.SET_LIST_NOTE, payload: { listNote } });
        dispatch({
          type: ACTION_TYPE.SET_NOTE_DETAIL,
          payload: { noteDetail: convertData(noteSaved) },
        });
      }
    } else {
      if (isChange(getState(), noteDetail)) await editNote(noteDetail);
    }
  }
};

const isChange = (state, noteDetail) => {
  const listNote = state.noteV2.listNoteFinal;
  const oldNote = listNote.find(note => note.id === noteDetail.id);
  if (!oldNote) {
    return true;
  }
  if (typeof oldNote.dataJson === 'string') oldNote.dataJson = JSON.parse(oldNote.dataJson);
  return JSON.stringify(oldNote) !== JSON.stringify(noteDetail);
};

export const addNewNote = initCalendar => async (dispatch, getState) => {
  await dispatch(insertNoteClient());
  const noteDetail = initNote();
  if (initCalendar.caseMasterId) {
    noteDetail.dataJson.push({ type: NOTE_DATA_TYPE.CALENDAR, value: initCalendar.caseMasterId });
    noteDetail.title = `Ghi chú cuộc họp "${initCalendar.meetingTitle}"`;
  }
  dispatch({ type: ACTION_TYPE.SET_NOTE_DETAIL, payload: { noteDetail } });
  const listNote = getState().noteV2.listNote;
  listNote.unshift(noteDetail);
  dispatch({ type: ACTION_TYPE.SET_LIST_NOTE, payload: { listNote } });
};

const isHasData = noteDetail => {
  const dataJsonAny = noteDetail.dataJson.find(data => !!data.value);
  return !!noteDetail.title || !!dataJsonAny;
};

export const deleteNote = id => async (dispatch, getState) => {
  try {
    await noteService.deleteNote(id);
    const state = getState();
    let listNote = state.noteV2.listNote;
    listNote = listNote.filter(note => note.id !== id);
    await dispatch({
      type: ACTION_TYPE.SET_NOTE_DETAIL,
      payload: { noteDetail: listNote[0] ? convertData(listNote[0]) : null },
    });
    dispatch({ type: ACTION_TYPE.SET_LIST_NOTE, payload: { listNote } });
  } catch (e) {}
};

export const insertNote = form => noteService.insertNote(form);

export const editNote = form => noteService.editNote(form.id, form);

export const updateNoteOnClient = noteDetail => async (dispatch, getState) => {
  let listNote = getState().noteV2.listNote;
  let index = listNote.findIndex(note => note.id === noteDetail.id);
  // danh dau da thay doi
  noteDetail.isChange = isChange(getState(), noteDetail);
  // dong bo list
  listNote[index] = noteDetail;
  dispatch({ type: ACTION_TYPE.SET_LIST_NOTE, payload: { listNote } });
  dispatch({ type: ACTION_TYPE.SET_NOTE_DETAIL, payload: { noteDetail } });
};

export const reset = () => async dispatch => {
  dispatch({ type: ACTION_TYPE.RESET });
};
