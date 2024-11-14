import {makeAutoObservable} from "mobx";

export default class MasterStore {
    constructor() {
        this._masters = []
        this._typeuserservices = []
        makeAutoObservable(this)
    }

    setMasters(masters) {
        this._masters = masters
    }

    setTypes(types) {
        this._maste_typeuserservicesrs = types
    }


    get masters() {
        return this._masters
    }
    get types() {
        return this._typeuserservices
    }
}