const btnCommonStyle = {
    border: 'none',
    borderRadius: 0,
    padding: '0 20px',
    backgroundColor: '#FFFFFF',
    borderBottom: '3px solid #1967D2'
};

const btnDefaultStyle = {
    ...btnCommonStyle,
    backgroundColor: '#FFFFFF',
    color: '#5F6368',
    borderBottom: 'None'
};

const btnFocusStyle = {
    ...btnCommonStyle,
    backgroundColor: '#F7F7F7',
    color: '#161616',
    borderBottom: 'None'
};

const btnSelectedAndFocus = {
    ...btnCommonStyle,
    backgroundColor: '#E8F0FE',
    color: '#1967D2',
}

const btnSelectedAndNonFocus = {
    ...btnCommonStyle,
    color: '#1967D2',
}

export const styles = {
    btnDefaultStyle: btnDefaultStyle,
    btnFocusStyle: btnFocusStyle,
    btnSelectedAndFocus: btnSelectedAndFocus,
    btnSelectedAndNonFocus: btnSelectedAndNonFocus
}