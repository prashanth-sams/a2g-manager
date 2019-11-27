import * as uuid from "uuid";

export const addTagname = tagname => ({
  type: "ADD_TAGNAME",
  tagname
});

export const addQuestion = question => ({
  type: "ADD_QUESTION",
  question
});

export const addReference = reference => ({
  type: "ADD_REFERENCE",
  reference
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

export const startReference = ( reference ) => {
  return (dispatch, getState) => {
    const id = uuid();
    dispatch(addReference({id,reference}));
  };
};