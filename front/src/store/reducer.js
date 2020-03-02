import TYPES from "./type";

const isAdmin = user => {
    if (user) if (user.user_role === 2) return true;
    return false;
};

export const reducer = (state, mutation) => {
    switch (mutation.type) {
        case TYPES.SET_USER:
            return { ...state, user: mutation.payload };

        case TYPES.SET_IS_ADMIN:
            return { ...state, isAdmin: isAdmin(mutation.payload) };

        case TYPES.SET_IS_AUTH:
            return { ...state, isAuth: mutation.payload };

        default:
            return state;
    }
};
