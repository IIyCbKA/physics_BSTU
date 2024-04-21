const modalInputAll = {
    height: '32px',
    backgroundColor: '#F4F4F4',
    transition: "background-color 0.7s, border 0.7s"
}

const focusInputLine = {
    border: '1px solid #D0D1D2'
}

const modalInputLine = {
    border: '1px solid #F4F4F4'
}

const closeBtn = {
    display: 'flex',
    border: 'None',
    boxShadow: 'None',
    justifyContent: 'flex-end',
    height: '16px',
    width: '16px',
    alignItems: 'center'
}

const modalHeader = {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
}

export const styles = {
    focusInputLineStyle: {...focusInputLine, ...modalInputAll},
    modalInputLineStyle: {...modalInputLine, ...modalInputAll},
    closeBtn: closeBtn,
    modalHeader: modalHeader
};
