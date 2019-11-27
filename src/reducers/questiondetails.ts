const questiondetailsReducerDefaultState = {
    tagname: '',
    question: '',
    reference: ''
};

export default (state = questiondetailsReducerDefaultState, action) => {
    return {
        ...state,
        tagname: action.tagname || state.tagname,
        question: action.question || state.question,
        reference: action.reference || state.reference
    }
};