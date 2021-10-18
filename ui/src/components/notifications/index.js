import _ from 'lodash';
import { connect } from 'react-redux';
import { removeNotification } from './../../store/actions'

// handles notification on dispatch
function Notifications(props) {
    const notifications = props.notifications;

    const handleCloseClick = (id) => {
        props.removeNotification(id)
    }

    const notificationsMarkup = _.map(notifications, (notif) => {
        const alertClass = notif.type == 'error' ? 'danger' : 'success';
        
        return (
            
                <div className={`alert alert-${alertClass} alert-dismissible w-50`} role="alert">
                    <button onClick={() => {handleCloseClick(notif.id)}} type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <strong>{`${notif.type.toUpperCase()}!`}</strong> {notif.message}
                </div>  
            )
    })

    return notificationsMarkup;
}

function mapStateToProps(state) {

    return { 
        notifications: state.notifications,
    };
};

//connecting props to Notification

const ConnectedNotifications = connect(
    mapStateToProps,
    {
        removeNotification: removeNotification
    }
    )(Notifications)
    

export default ConnectedNotifications;