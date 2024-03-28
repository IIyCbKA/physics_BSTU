export const minimizeStr = (s, showLength, afterPoint) => {
    const len = s.length
    if (len > showLength){
        let x = s.lastIndexOf('.')
        if (x === -1){
            x = len;
        }
        x -= afterPoint

        s = s.slice(0, showLength - len + x - 1) + "…" + (s.slice(x, len))
    }

    return s
}