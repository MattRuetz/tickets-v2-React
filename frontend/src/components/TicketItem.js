import { Link } from 'react-router-dom';

// REMEMBER that react component params are passed as objects,
// They can be de-structed in the argument with --> {}
function TicketItem({ ticket }) {
    console.log(ticket);
    return (
        <div className="ticket">
            <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
            <div>{ticket.product}</div>
            {/* VARIABLE CLASS NAMES. VERY COOL! */}
            <div className={`status status-${ticket.status}`}>
                {ticket.status}
            </div>
            <Link
                to={`/ticket/${ticket._id}`}
                className="btn btn-reverse btn-sm"
            >
                View
            </Link>
        </div>
    );
}

export default TicketItem;
