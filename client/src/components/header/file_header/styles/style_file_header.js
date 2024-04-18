const containerHeaderAll = {
    position: 'fixed',
    zIndex: '2000',
    backgroundColor: '#222222',
    height: '60px',
    opacity: 0,
    padding: '12px',
    transition: 'opacity 0.3s ease 0.3s'
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
    containerHeaderMobile: {...containerHeaderAll, ...containerHeaderMobile},
    containerHeaderPC: {...containerHeaderAll, ...containerHeaderPC},
    iconsStyle: iconsStyle,
    navStyle: navStyle,
    navItemStyle: navItemStyle
}