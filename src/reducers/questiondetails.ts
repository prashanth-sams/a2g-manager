const questiondetailsReducerDefaultState = {
    tagname: '',
    question: '',
    answer: '',
    reference: ''
};

export default (state = questiondetailsReducerDefaultState, action) => {
    return {
        ...state,
        tagname: action.tagname || state.tagname,
        question: action.question || state.question,
        answer: action.answer || state.answer,
        reference: action.reference || state.reference
    }
};