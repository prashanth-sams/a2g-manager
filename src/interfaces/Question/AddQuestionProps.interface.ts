export default interface AddQuestionProps{
    tag_name: string[],
    title: string,
    answer: string,
    reference: string,
    startAddBibleverse: ( actualData: { book_name, chapter_number, verse_number, verse_context}) => void,
    // startEditBibleverse: any,
    startRemoveBibleverse: (id) => number,
    startTagname: any,
    startQuestion: any,
    startAnswer: any,
    startReference: any,
    questiondetails: any,
    biblelist: any,
    lang: string
}