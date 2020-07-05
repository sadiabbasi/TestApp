import React, {useEffect} from 'react';
import SlotCard from "./components/SlotCard";
import { useDispatch, useSelector } from 'react-redux';
import { DataGetAction } from "../../appRedux/actions/http";

const Availability = (props) => {
    const dispatch = useDispatch();
    const availability = useSelector(state => state.Availability.availability);
    const fetchData = () => {
        dispatch(DataGetAction('availability',""))
    }
    useEffect(fetchData, []);

    return (
        <div>
            <h2>Set your availability time</h2>
            <SlotCard data={availability} />
        </div>
    );
}

export default Availability;