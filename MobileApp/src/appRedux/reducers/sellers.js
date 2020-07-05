const INIT_STATE = {
    listing: [],
    slots: {},
    initURL:''
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'sellerListing_SUCCESS': {
            return {
            ...state,
            listing: action.payload.data,
            initURL:''
            }
        }
        case 'selectedSlots_SUCCESS' : {
            return {
                ...state,
                slots: action.payload.data,
                initURL: ""
            }
        }
        case 'bookAppointment_SUCCESS' : {
            return {
                ...state,
                initURL: "Dashboard"
            }
        }
        default:
            return state;
    }
}