import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, closeTicket, reset } from '../features/tickets/ticketSlice';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

function Ticket() {
    const { ticket, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.tickets
    );

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { ticketId } = params;

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(getTicket(ticketId));
        //eslint-disable-next-line
    }, [isError, message, ticketId]);

    // close ticket
    const onTicketClose = () => {
        dispatch(closeTicket(ticketId));
        toast.success('Ticket Closed');
        navigate('/tickets');
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        <>
            <h2>OOPS!</h2>
            <h3>Something went wrong..</h3>
        </>;
    }

    return (
        <div className="ticket-page">
            <heaer className="ticket-header">
                <BackButton url="/tickets" />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>
                <h3>
                    Date Submitted:{' '}
                    {new Date(ticket.createdAt).toLocaleString('en-US')}
                </h3>
                <h3>Product: {ticket.product}</h3>
                <hr />
                <div className="ticket-desc">
                    <h2>Description of Issue</h2>
                    <p>{ticket.description}</p>
                </div>
            </heaer>

            {ticket.status !== 'closed' && (
                <button
                    onClick={onTicketClose}
                    className="btn btn-block btn-danger"
                >
                    Close Ticket
                </button>
            )}
        </div>
    );
}

export default Ticket;
