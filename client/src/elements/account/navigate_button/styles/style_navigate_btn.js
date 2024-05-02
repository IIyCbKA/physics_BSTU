const btnCommonStyle = {
    borderRadius: 0,
    padding: '0 20px',
    backgroundColor: '#FFFFFF',
    borderBottomRightRadius: '4px',
    borderBottomLeftRadius: '4px'
};

const btnDefaultStyle = {
    ...btnCommonStyle,
    backgroundColor: '#FFFFFF',
    color: '#5F6368',
    border: '3px solid #FFFFFF',
};

const btnFocusStyle = {
    ...btnCommonStyle,
    backgroundColor: '#F7F7F7',
    color: '#161616',
    border: '3px solid #F7F7F7',
};

const btnSelectedAndFocus = {
    ...btnCommonStyle,
    backgroundColor: '#E8F0FE',
    color: '#1967D2',
    borderTop: '3px solid #E8F0FE',
    borderLeft: '3px solid #E8F0FE',
    borderRight: '3px solid #E8F0FE',
    borderBottom: '3px solid #1967D2'
}

const btnSelectedAndNonFocus = {
    ...btnCommonStyle,
    color: '#1967D2',
    borderTop: '3px solid #FFFFFF',
    borderLeft: '3px solid #FFFFFF',
    borderRight: '3px solid #FFFFFF',
    borderBottom: '3px solid #1967D2'
}

export const styles = {
    btnDefaultStyle: btnDefaultStyle,
    btnFocusStyle: btnFocusStyle,
    btnSelectedAndFocus: btnSelectedAndFocus,
    btnSelectedAndNonFocus: btnSelectedAndNonFocus
}