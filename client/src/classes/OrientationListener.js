import {store} from "../reducers";
import {setOrientation, setWidth, setHeight} from "../reducers/app_reducer";

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
            const width = window.innerWidth
            const height = window.innerHeight

            const orientation = height > width ?
                PORTRAIT_ORIENTATION :
                LANDSCAPE_ORIENTATION


            store.dispatch(setOrientation(orientation))
            store.dispatch(setWidth(width))
            store.dispatch(setHeight(height))
        }, 0)

    }

    destroy() {
        window.removeEventListener("resize", this.orientationHandler);
    }
}

export const orientationListener = new OrientationListener()
