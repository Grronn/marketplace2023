import {makeAutoObservable} from "mobx";

export default class TypeServiceStore {
    constructor() {
        this._typeServices = []
        this._selectedType={}
        makeAutoObservable(this)
    }

    setTypeServices(typeServices) {
        this._typeServices = typeServices
    }

    setSelectedType(type){
        this._selectedType=type
    }


    get typeServices() {
        return this._typeServices
    }

    get selectedType() {
        return this._selectedType
    }
}