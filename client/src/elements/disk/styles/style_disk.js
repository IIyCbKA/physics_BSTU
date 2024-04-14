
const styleFolderIcon = {
    color: '#F4DC49'
}

const styleDocIcon = {
    color: '#0263D1'
}

const styleImageIcon = {
    color: '#0AC963'
}

const stylePdfIcon = {
    color: '#E5252A'
}

const styleExcelIcon = {
    color: '#00733B'
}

const styleArchiveIcon = {
    color: '#FFB11F'
}

const stylePresentationIcon = {
    color: '#E03303'
}

const styleOtherIcon = {
    color: '#E6E6E6'
}

const iconMobile = {
    fontSize: '40px'
}

const iconPC = {
    fontSize: '80px'
}

const allIcon = {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
}

export const styles = {
    styleFolderIcon: styleFolderIcon,
    styleDocIcon: styleDocIcon,
    styleImageIcon: styleImageIcon,
    stylePdfIcon: stylePdfIcon,
    styleExcelIcon: styleExcelIcon,
    styleArchiveIcon: styleArchiveIcon,
    stylePresentationIcon: stylePresentationIcon,
    styleOtherIcon: styleOtherIcon,
    iconMobile: {...iconMobile, ...allIcon},
    iconPC: {...iconPC, ...allIcon}
}