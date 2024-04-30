const headerIconsForm = {
    padding: '0px',
    height: '36px',
    width: '36px',
    marginLeft: '8px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
}

const logotypePadding = {
    padding: 0,
    height: '30px',
}

const customToggle = {
    height: '30px',
    boxShadow: 'None',
    border: 'None'
}

const styleNavbar = {
    minWidth: '390px',
    height: '60px',
    padding: 0,
    justifyContent: 'center'
}

const containerHeaderAll = {
    height: '60px'
}

const containerHeaderMobile = {
    padding: '14px 10px 0px 10px',
}

const containerHeaderPC = {
    padding: '14px 30px 0px 30px',
}

const headerIconStyle = {
    fontSize: '24px',
    color: '#161616'
}

export const styles = {
    headerIconsForm: headerIconsForm,
    logotypePadding: logotypePadding,
    customToggle: customToggle,
    styleNavbar: styleNavbar,
    containerHeaderMobile: {...containerHeaderAll, ...containerHeaderMobile},
    containerHeaderPC: {...containerHeaderAll, ...containerHeaderPC},
    headerIconStyle: headerIconStyle
}