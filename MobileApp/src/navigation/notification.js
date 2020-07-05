import React from 'react'
import { restNotificationState } from '../appRedux/actions/http'
import { Alert } from 'react-native';
import { useDispatch, useSelector } from "react-redux";

const Index = ({...props}) => {
    const dispatch = useDispatch();
    const notificationProps = useSelector(state => state.notify);
    const notify = (messageText, status) => {
        message.config(duration);
        if (status === "success") {
            Alert.alert(messageText)
            dispatch(restNotificationState());
        }

        if (status === "error") {
            Alert.alert(messageText)
            dispatch(restNotificationState());
        }
    };
    return (
        <div className="toaster">
            {notify(notificationProps.message, notificationProps.level)}
        </div>
    );

}

export default Index;

// export class Index extends Component {
//     notify = (messageText, status) => {
//         message.config(duration);
//         if (status === "success") {
//             Alert.alert(messageText)
//             this.props.restNotificationState();
//         }

//         if (status === "error") {
//             Alert.alert(messageText)
//             this.props.restNotificationState();
//         }
//     };
//     render() {
//         const { message, level } = this.props;
//         return (
//             <div className="toaster">
//                 {this.notify(message, level)}
//             </div>
//         )
//     }
// }

// const mapStateToProps = (state) => {
//     return ({
//         message: state.notify.message,
//         level: state.notify.level,
//     })
// }

// export default connect(mapStateToProps, { restNotificationState })(Index)