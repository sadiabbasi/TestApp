import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { restNotificationState } from '../../appRedux/actions/http'
import { message } from "antd";


export class Index extends Component {
    notify = (messageText, status, redirectUrl, history) => {
        const duration = {
            duration: 60,
            maxCount: 1,
        };

        message.config(duration);
        if (status === "success") {
            message.success(messageText, 2);
            if (redirectUrl) {
                history.push(redirectUrl)
            }
            this.props.restNotificationState();
        }

        if (status === "error") {
            message.error(messageText, 2);
            if (redirectUrl) {
                history.push(redirectUrl)
            }
            this.props.restNotificationState();
        }
    };
    render() {
        const { message, level, redirectUrl="", history } = this.props;
        return (
            <div className="toaster">
                {this.notify(message, level, redirectUrl, history)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        message: state.notify.message,
        level: state.notify.level,
        redirectUrl: state.notify.redirectUrl,
    })
}

export default withRouter(connect(mapStateToProps, { restNotificationState })(Index))