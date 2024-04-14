const frameMobile = {
    height: '40px',
    width: '100%',
}

const framePC = {
    height: '80px',
    width: '80px',
}

const allFrame = {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
}

export const styles = {
    iconMobile: {...frameMobile, ...allFrame},
    iconPC: {...framePC, ...allFrame}
}