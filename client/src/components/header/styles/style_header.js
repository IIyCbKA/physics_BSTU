const headerIconsForm = {
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: "10px",
    paddingRight: 0,
    height: '26px'
}

const logotypePadding = {
    padding: 0,
    height: '30px',
    justifyContent: 'center'
}

const customToggle = {
    height: '30px',
    boxShadow: 'None',
    border: 'None'
}

const styleNavbar = {
    minWidth: '390px',
    paddingTop: '14px',
    paddingBottom: '0px'
}

const containerHeaderAll = {
    padding: '0 30px',
    height: '30px'
}

const containerHeaderMobile = {
    padding: '0 10px',
}

const containerHeaderPC = {
    padding: '0 30px',
}

const headerIconStyle = {
    fontSize: '26px',
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