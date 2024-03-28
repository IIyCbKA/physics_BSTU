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