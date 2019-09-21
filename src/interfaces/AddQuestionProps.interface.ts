export default interface AddQuestionProps{
    tag_name: string[],
    title: string,
    reference: string,
    book_name: string,
    chapter_number?: number,
    verse_number: string,
    verse_context: string
}