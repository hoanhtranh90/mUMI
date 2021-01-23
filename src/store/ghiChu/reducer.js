import * as service from '../hcCalendar/service';
import * as noteService from './service';

export const TYPE = {
  TEXT_INPUT: 'text',
  FILE: 'attachment',
  IMAGE: 'image',
  CALENDAR: 'calendar',
};
const initState = {
  listNote: [],
  currentNote: null,
  id: -1,
  currentHcFlow: null,
  linkCalendar: [],
  tempID: null,
};

const ACTION_TYPE = {
  SET_LIST_NOTE: 'ghiChu/SET_LIST_NOTE',
  ADD_NEW_NOTE: 'ghiChu/ADD_NEW_NOTE',
  SELECT_NOTE: 'ghiChu/SELECT_NOTE',
  SELECT_NOTE_BY_ID: 'ghiChu/SELECT_NOTE_BY_ID',
  SET_ID_CURRENT_NOTE: 'ghiChu/SET_ID_CURRENT_NOTE',
  ADD_OBJECT: 'ghiChu/ADD_OBJECT',
  DELETE_OBJECT: 'ghiChu/DELETE_OBJECT',
  SET_DATA_AT_INDEX: 'ghiChu/SET_DATA_AT_INDEX',
  SAVE_DATA_NOTE: 'ghiChu/SAVE_DATA_NOTE',
  DELETE_NOTE: 'ghiChu/DELETE_NOTE',
  CHANGE_TITLE_CURRENT_NOTE: 'ghiChu/CHANGE_TITLE_CURRENT_NOTE',
  CHANGE_SCREEN: 'ghiChu/CHANGE_SCREEN',
  GET_LINK_CALENDAR: 'ghiChu/GET_LINK_CALENDAR',
  SET_HC_FLOW: 'ghiChu/SET_HC_FLOW',
};

export default function(state = initState, action) {
  switch (action.type) {
    case ACTION_TYPE.SET_LIST_NOTE:
      return {
        ...state,
        listNote: action.payload,
      };
    case ACTION_TYPE.ADD_NEW_NOTE:
      return {
        ...state,
        listNote: [action.payload, ...state.listNote],
        id: action.id,
      };
    case ACTION_TYPE.SELECT_NOTE:
      return {
        ...state,
        currentNote: {
          ...state.listNote[action.payload],
        },
      };
    case ACTION_TYPE.SELECT_NOTE_BY_ID:
      const selectedNote = state.listNote.find(note => note.id === action.payload);
      return {
        ...state,
        currentNote: selectedNote,
      };
    case ACTION_TYPE.SET_ID_CURRENT_NOTE:
      return {
        ...state,
        currentNote: {
          ...state.currentNote,
          id: action.payload,
        },
      };
    case ACTION_TYPE.ADD_OBJECT:
      return {
        ...state,
        currentNote: {
          ...state.currentNote,
          // data: [
          //   ...state.currentNote.data.slice(0, state.currentNote.currentIndex),
          //   action.payload,
          //   ...state.currentNote.data.slice(state.currentNote.currentIndex)
          // ]
          dataJson: [...state.currentNote.dataJson, action.payload],
        },
      };
    case ACTION_TYPE.DELETE_OBJECT:
      return {
        ...state,
        currentNote: {
          ...state.currentNote,
          dataJson: action.payload,
        },
      };
    case ACTION_TYPE.SAVE_DATA_NOTE:
      return {
        ...state,
        listNote: action.payload,
      };
    case ACTION_TYPE.DELETE_NOTE:
      return {
        ...state,
        listNote: action.payload,
        currentNote: null,
      };
    case ACTION_TYPE.CHANGE_TITLE_CURRENT_NOTE:
      return {
        ...state,
        currentNote: {
          ...state.currentNote,
          title: action.payload,
        },
      };
    case ACTION_TYPE.CHANGE_SCREEN:
      return {
        ...state,
        currentNote: null,
        tempID: action.payload,
      };
    case ACTION_TYPE.GET_LINK_CALENDAR:
      return {
        ...state,
        linkCalendar: action.payload.linkCalendar,
      };
    case ACTION_TYPE.SET_HC_FLOW:
      return {
        ...state,
        currentHcFlow: action.payload.hcFlow,
      };
    default:
      return state;
  }
}

export const addNewNote = (title, caseMasterId) => async (dispatch, getState) => {
  // const listNote = getState().note.listNote
  let id = getState().note.id + 1;
  const object = createObject(title, id, caseMasterId);
  await createNote(dispatch, object, 0, id);
  //Logic select note if note is exist by ID
  // if (listNote.length > 0) {
  //   let index = listNote.findIndex(item => item.id === object.id)
  //   if (index === -1) {
  //     await createNote(dispatch,object, 0, )
  //   } else {
  //     dispatch(selectNote(index))
  //   }
  // } else {
  //   await createNote(dispatch,object, 0)
  // }
};

async function createNote(dispatch, object, index, nextId) {
  await dispatch({
    type: ACTION_TYPE.ADD_NEW_NOTE,
    payload: object,
    id: nextId,
  });
  dispatch(selectNote(index));
}

export const selectNote = index => async dispatch => {
  dispatch({
    type: ACTION_TYPE.SELECT_NOTE,
    payload: index,
  });
};

export const selectNoteById = noteId => async dispatch => {
  dispatch({
    type: ACTION_TYPE.SELECT_NOTE_BY_ID,
    payload: noteId,
  });
};

export const setIdCurrentNote = index => async dispatch => {
  dispatch({
    type: ACTION_TYPE.SET_ID_CURRENT_NOTE,
    payload: index,
  });
};

export const addMore = object => async (dispatch, getState) => {
  if (object.type === TYPE.CALENDAR) {
    const state = getState().note;
    let lstData = state.currentNote.dataJson;
    //check array contain add object
    if (lstData.findIndex(item => item.value === object.value) !== -1) {
      return;
    }
  }
  dispatch({
    type: ACTION_TYPE.ADD_OBJECT,
    payload: object,
  });
};

export const deleteObject = object => async (dispatch, getState) => {
  const state = getState().note;
  let newData = state.currentNote.dataJson;
  if (object) {
    newData = newData.filter(item => item !== object);
  }
  await dispatch({
    type: ACTION_TYPE.DELETE_OBJECT,
    payload: newData,
  });
  dispatch(saveDataNote());
};

export const saveDataNote = () => async (dispatch, getState) => {
  const state = getState().note;
  const saveNote = state.currentNote;
  let newList = state.listNote.map(item => {
    return item.id === saveNote.id ? saveNote : item;
  });
  dispatch({
    type: ACTION_TYPE.SAVE_DATA_NOTE,
    payload: newList,
  });
};

export const deleteNote = () => async (dispatch, getState) => {
  const state = getState().note;
  const deleteNote = state.currentNote;
  let newList = state.listNote;
  newList = newList.filter(item => {
    return item.id !== deleteNote.id;
  });
  await dispatch({
    type: ACTION_TYPE.DELETE_NOTE,
    payload: newList,
  });
  if (newList.length > 0) {
    dispatch(selectNote(0));
  }
};
export const changeTitleCurrentNote = title => async dispatch => {
  await dispatch({
    type: ACTION_TYPE.CHANGE_TITLE_CURRENT_NOTE,
    payload: title,
  });
  dispatch(saveDataNote());
};

export const changeScreen = () => async (dispatch, getState) => {
  const state = getState().note;
  if (state.currentNote !== null) {
    dispatch({
      type: ACTION_TYPE.CHANGE_SCREEN,
      payload: state.currentNote.id,
    });
  } else {
    if (state.listNote.length > 0 && state.tempID !== null) {
      dispatch(selectNoteById(state.tempID));
    }
  }
};

export const loadHcFlows = () => async dispatch => {
  const hcFlows = await service.getHcFlows('LICH_TUAN');
  hcFlows.push({ id: 0, deptName: 'Lịch tuần được chia sẻ' });
  const hcFlow = hcFlows && hcFlows.length > 0 ? hcFlows[0] : null;
  dispatch({ type: ACTION_TYPE.SET_HC_FLOW, payload: { hcFlow } });
};

export const loadLinkCalendar = query => async dispatch => {
  let linkCalendar = await service.getAcceptedRequestsIncludeCoopDepts(query);
  if (!linkCalendar) linkCalendar = [];
  dispatch({ type: ACTION_TYPE.GET_LINK_CALENDAR, payload: { linkCalendar } });
};

export const loadAllNotes = query => async (dispatch, getState) => {
  let lstNote = await noteService.getAllNote(query);
  if (lstNote.length > 0) {
    //let currentList = getState().note.listNote
    lstNote = lstNote.map(item => {
      return {
        ...item,
        dataJson: JSON.parse(item.dataJson),
      };
    });
    //Check if currentList include API items
    // lstNote.map(addingItem => {
    //   if (currentList.findIndex(item => item.id === addingItem.id) === -1) {
    //     currentList = [...currentList, addingItem]
    //   }
    // })
    dispatch({ type: ACTION_TYPE.SET_LIST_NOTE, payload: lstNote });
    dispatch(selectNote(0));
  }
};

export const createNoteAPI = (form, id) => async (dispatch, getState) => {
  const state = getState().note;
  const response = await noteService.createNote(form);
  if (response.id) {
    let newList = getState().note.listNote.map(item => {
      return item.id === id ? response : item;
    });
    dispatch({
      type: ACTION_TYPE.SAVE_DATA_NOTE,
      payload: newList,
    });
    dispatch({
      type: ACTION_TYPE.SET_ID_CURRENT_NOTE,
      payload: response.id,
    });
  }
};

export const deleteNoteAPI = id => async dispatch => {
  const response = await noteService.deleteNote(id);
  if (response.id) {
    dispatch(deleteNote());
  }
};

export const editNoteAPI = (form, id) => async (dispatch, getState) => {
  const response = await noteService.editNote(id, form);
  if (response.id) {
    let newList = getState().note.listNote.map(item => {
      return item.id === id ? response : item;
    });
    dispatch({
      type: ACTION_TYPE.SAVE_DATA_NOTE,
      payload: newList,
    });
  }
};

function createObject(title, id, caseMasterId) {
  let initNew = {
    id: id,
    title: title,
    createTime: new Date().getTime(),
    dataJson: [
      {
        type: TYPE.TEXT_INPUT,
        value: '',
      },
    ],
  };

  if (caseMasterId) {
    initNew = {
      ...initNew,
      dataJson: [...initNew.dataJson, { type: TYPE.CALENDAR, value: caseMasterId }],
    };
  }

  return initNew;
}
