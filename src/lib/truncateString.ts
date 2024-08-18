const MAX_TEXT_LENGTH = 25

/**
 * 
 * @param text String value that needs to be validated
 * @returns Whether a truncated string or its default value
 */
export const truncateString = (text: string) => {
    const isTextReachedMaxLength = text.length > MAX_TEXT_LENGTH;
    const slicedText = text.slice(0, MAX_TEXT_LENGTH);

    if(!isTextReachedMaxLength){
        return text
    }

    return `${slicedText}...`
}