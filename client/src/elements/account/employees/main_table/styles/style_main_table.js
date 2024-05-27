const stickyCell = {
    position: 'sticky',
    left: 0,
    backgroundColor: '#FFFFFF',
    padding: 0
}

const defaultCell = {
    borderLeft: '1px solid #E0E0E0',
    padding: 0
}

const tableStyle = {
    borderRight: '1px solid #E0E0E0',
    borderBottom: '1px solid #E0E0E0',
    width: 'auto'
}

const completedWorkCell = {
    backgroundColor: '#A8E4A0'
}

export const styles = {
    stickyCell: stickyCell,
    defaultCell: defaultCell,
    tableStyle: tableStyle,
    completedWorkCell: {...completedWorkCell, ...defaultCell}
}