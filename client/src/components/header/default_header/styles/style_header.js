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