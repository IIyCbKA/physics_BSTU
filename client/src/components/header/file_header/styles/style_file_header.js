const navbarFileHeader = {
    position: 'sticky',
    top: 0,
    minWidth: '340px',
    height: '60px',
    padding: 0,
    justifyContent: 'center',
    zIndex: '4000'
}

const containerHeaderAll = {
    height: '60px',
    minWidth: '340px',
    backgroundColor: 'rgba(34, 34, 34, 1)',
    padding: 0
}

const containerHeaderMobile = {
    width: '100%',
    borderRadius: '0px 0px 0px 0px'
}

const containerHeaderPC = {
    width: 'calc(100% - 40px)',
    borderRadius: '0px 0px 12px 12px',
}

const iconsStyle = {
    fontSize: '24px',
    color: '#FFFFFF'
}

const navStyle = {
    padding: '12px',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row'
}

const navItemStyle = {
    padding: '0px',
    height: '36px',
    width: '36px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
}

export const styles = {
    navbarFileHeader: navbarFileHeader,
    containerHeaderMobile: {...containerHeaderAll, ...containerHeaderMobile},
    containerHeaderPC: {...containerHeaderAll, ...containerHeaderPC},
    iconsStyle: iconsStyle,
    navStyle: navStyle,
    navItemStyle: navItemStyle
}