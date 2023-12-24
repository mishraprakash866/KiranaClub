export class storeUserData {

    static storeVal(res:object){
        this.userData = res;
    }

    static getVal(){
        return this.userData;
    }

}