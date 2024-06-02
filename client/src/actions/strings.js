export const minimizeStr = (string, maxLength, afterPoint) => {
    const lengthString = string.length
    if (lengthString > maxLength){
        let spareSpace = 2
        let indLastDot = string.lastIndexOf('.')
        if (indLastDot === -1){
            indLastDot = lengthString;
        }

        let indEndName = indLastDot - afterPoint
        string = string.slice(0, maxLength - lengthString + indEndName -
                spareSpace) + "…" + (string.slice(indEndName, lengthString))
    }

    return string
}

export const getAfterDiskPath = (path) => {
    const disk_str = 'disk/'
    return path.slice(path.indexOf(disk_str) + disk_str.length)
}

export const getLastDirectory = (path) => {
    if (getAfterDiskPath(path) === '')
        return ''

    return path.slice(0, path.lastIndexOf('/', path.length - 2) + 1)
}

export const getCurrentFolderName = (path) => {
    const defaultDiskTitle = 'Файлы'

    if (getAfterDiskPath(path) === '')
        return defaultDiskTitle

    return path.slice(path.lastIndexOf('/', path.length - 2) + 1, -1)
}

export const getFileType = (filename) => {
    const pointPos = filename.lastIndexOf('.')
    if (pointPos === -1)
        return ''
    else
        return filename.slice(pointPos + 1)
}

export const getFilenameOnly = (filename) => {
    const pointPos = filename.lastIndexOf('.')
    if (pointPos === -1)
        return filename
    else
        return filename.slice(0, pointPos)
}

const isExceedsToLineSize = (textStart, textEnd, fieldRef, maxWidth) => {
    fieldRef.textContent = textStart + '...' + textEnd;
    return fieldRef.offsetWidth >= maxWidth;
}

export const minimizeStrPortrait = (text, maxWidth, fieldRef) => {
    fieldRef.textContent = text;

    if (fieldRef.offsetWidth >= maxWidth){
        let start = 0;
        let end = text.length - 1;

        let textStart = ''
        let textEnd = ''

        while (start <= end) {
            textEnd = text[end--] + textEnd;
            if (isExceedsToLineSize(textStart, textEnd, fieldRef, maxWidth)) {
                textEnd = textEnd.slice(1);
                break;
            }

            textStart = textStart + text[start++];
            if (isExceedsToLineSize(textStart, textEnd, fieldRef, maxWidth)) {
                textStart = textStart.slice(0, -1);
                break;
            }
        }

        fieldRef.textContent = textStart + '...' + textEnd;
    }
}