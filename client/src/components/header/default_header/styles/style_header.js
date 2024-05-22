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
    display: 'flex',
    alignItems: 'center'
}

const customToggle = {
    height: '30px',
    boxShadow: 'None',
    border: 'None'
}

const styleNavbar = {
    minWidth: '340px',
    width: '100%',
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
    fontSize: '28px',
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