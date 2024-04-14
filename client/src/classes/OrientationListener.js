import {store} from "../reducers";
import {setOrientation} from "../reducers/app_reducer";

export const MOBILE_ORIENTATION = 'portrait'
export const PC_ORIENTATION = 'landscape'

class OrientationListener {
    constructor() {
        this.orientationHandler();
        this.orientationHandler = this.orientationHandler.bind(this);
        this.setupListener();
    }

    setupListener() {
        window.addEventListener("orientationchange", this.orientationHandler);
    }

    orientationHandler() {
        setTimeout( () => {
            const orientation = window.matchMedia(
                "(orientation: portrait)").matches ?
                MOBILE_ORIENTATION :
                PC_ORIENTATION

            console.log('orientation', orientation)


            store.dispatch(setOrientation(orientation))
        }, 0)

    }

    destroy() {
        window.removeEventListener("orientationchange", this.orientationHandler);
    }
}

export const orientationListener = new OrientationListener()
