import * as uuid from "uuid";

export const addTagname = tagname => ({
  type: "ADD_TAGNAME",
  tagname
});

export const addQuestion = question => ({
  type: "ADD_QUESTION",
  question
});

export const addAnswer = answer => ({
  type: "ADD_ANSWER",
  answer
});

export const addReference = reference => ({
  type: "ADD_REFERENCE",
  reference
});

export const addBookname = bookname => ({
  type: "ADD_BOOKNAME",
  bookname
});

export const addChapternumber = chapternumber => ({
  type: "ADD_CHAPTERNUMBER",
  chapternumber
});

export const addVersenumber = versenumber => ({
  type: "ADD_VERSENUMBER",
  versenumber
});

export const addVersecontext = versecontext => ({
  type: "ADD_VERSECONTEXT",
  versecontext
});

export const startTagname = ( tagname ) => {
  return (dispatch, getState) => {
    const id = uuid();
    dispatch(addTagname({id,tagname}));
  };
};

export const startQuestion = ( title ) => {
  return (dispatch, getState) => {
    const id = uuid();
    dispatch(addQuestion({id,title}));
  };
};

export const startAnswer = ( answer ) => {
  return (dispatch, getState) => {
    const id = uuid();
    dispatch(addAnswer({id,answer}));
  };
};

export const startReference = ( reference ) => {
  return (dispatch, getState) => {
    const id = uuid();
    dispatch(addReference({id,reference}));
  };
};

export const startBookname = ( bookname ) => {
  return (dispatch, getState) => {
    const id = uuid();
    dispatch(addBookname({id,bookname}));
  };
};

export const startChapternumber = ( chapternumber ) => {
  return (dispatch, getState) => {
    const id = uuid();
    dispatch(addChapternumber({id,chapternumber}));
  };
};

export const startVersenumber = ( versenumber ) => {
  return (dispatch, getState) => {
    const id = uuid();
    dispatch(addVersenumber({id,versenumber}));
  };
};

export const startVersecontext = ( versecontext ) => {
  return (dispatch, getState) => {
    const id = uuid();
    dispatch(addVersecontext({id,versecontext}));
  };
};