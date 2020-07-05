const INIT_STATE = {
    availability: {},
    success: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'availability_SUCCESS': {
            return {
                ...state,
                availability: action.payload.availability,
                success: true
            }
        }

        default:
            return state;
    }
}
