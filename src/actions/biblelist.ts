import * as uuid from "uuid";

export const addBibleverse = bibleverse => ({
  type: "ADD_BIBLEVERSE",
  bibleverse
});

export const removeBibleverse = id => ({
  type: "REMOVE_BIBLEVERSE",
  id
});

export const editBibleverse = bibleverse => ({
  type: "EDIT_BIBLEVERSE",
  bibleverse
});

// export const editBibleverse = ( actualData: { book_name, chapter_number, verse_number, verse_context}) => {
//     return (dispatch, getState) => {
//       const {
//           book_name = '',
//           chapter_number = 0,
//           verse_number = '',
//           verse_context = ''
//       } = actualData;
  
//       const bibleverse = { book_name, chapter_number, verse_number, verse_context };
  
//       const id = uuid();
  
//       dispatch(
//         addBibleverse({
//           id,
//           ...bibleverse
//         })
//       );
//     };
//   };

export const startAddBibleverse = ( actualData: { book_name, chapter_number, verse_number, verse_context}) => {
// export const startAddBibleverse = ( book_name, chapter_number, verse_number, verse_context) => {
  return (dispatch, getState) => {
    const {
        book_name = '',
        chapter_number = 0,
        verse_number = '',
        verse_context = ''
    } = actualData;

    const bibleverse = { book_name, chapter_number, verse_number, verse_context };

    const id = uuid();

    dispatch(
      addBibleverse({
        id,
        ...bibleverse
      })
    );
  };
};

export const startRemoveBibleverse = id => {
  return (dispatch, getState) => {
    dispatch(removeBibleverse({ id }));
  };
};

export const startEditBibleverse = bibleverse => {
  return (dispatch, getState) => {
    dispatch(editBibleverse({bibleverse}));
  };
};