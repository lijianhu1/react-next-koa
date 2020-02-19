import {LOGOUT} from "../constants"

export const userInitialState = {
    name:"456"
};
function userReducer(state = userInitialState,action) {
    switch(action.type){
        case LOGOUT:
            console.log("looutssssssss");
            return {};
        default:
        return state;
    }
};
export default userReducer;