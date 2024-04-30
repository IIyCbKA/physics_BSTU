def divideFileName(filename: str):
    index = filename.rfind('.')
    if index == -1:
        return filename, ''
    else:
        return filename[:index], filename[index + 1:]



def getFileType(filename: str):
    return divideFileName(filename)[1]


def getFileNameOnly(filename: str):
    return divideFileName(filename)[0]
