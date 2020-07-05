const INIT_STATE = {
    appointments: [],
    success: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'appointments_SUCCESS': {
            return {
                ...state,
                appointments: action.payload.appointments,
                success: true
            }
        }

        default:
            return state;
    }
}
