import {store} from "../reducers";
import {setOrientation} from "../reducers/app_reducer";

export const PORTRAIT_ORIENTATION = 'portrait'
export const LANDSCAPE_ORIENTATION = 'landscape'

class OrientationListener {
    constructor() {
        this.orientationHandler();
        this.orientationHandler = this.orientationHandler.bind(this);
        this.setupListener();
    }

    setupListener() {
        window.addEventListener("resize", this.orientationHandler);
    }

    orientationHandler() {
        setTimeout( () => {
            const orientation = window.innerHeight > window.innerWidth ?
                PORTRAIT_ORIENTATION :
                LANDSCAPE_ORIENTATION

            store.dispatch(setOrientation(orientation))
        }, 0)

    }

    destroy() {
        window.removeEventListener("resize", this.orientationHandler);
    }
}

export const orientationListener = new OrientationListener()
