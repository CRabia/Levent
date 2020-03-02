import TYPES from "./type";

export const reducer = (state = {}, mutation) => {
    switch (mutation.type) {
        case TYPES.SET_LOG_IN:
            return { ...state, user: mutation.payload };

        case TYPES.SET_IS_ADMIN:
            return { ...state, isAdmin: mutation.payload };

        case TYPES.SET_IS_AUTH:
            return { ...state, isAuth: mutation.payload };

        default:
            return state;
    }
};
