import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket, reset } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function NewTicket() {
    // get user from global state
    const { user } = useSelector((state) => state.auth);

    // deconstruct global ticket state
    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.tickets
    );

    const [name] = useState(user.name);
    const [email] = useState(user.email);
    const [product, setProduct] = useState('Windows');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            dispatch(reset());
            navigate('/tickets');
        }

        dispatch(reset());
    }, [dispatch, isError, isSuccess, navigate, message]);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log({ product, description });
        dispatch(createTicket({ product, description }));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <BackButton url="/" />
            <section className="heading">
                <h1>Create New Ticket</h1>
                <p>Please fill out the form below:</p>
            </section>

            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Customer Email</label>
                    <input
                        type="text"
                        className="form-control"
                        value={email}
                        disabled
                    />
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select
                            name="product"
                            id="product"
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                        >
                            <option value="Windows">Windows</option>
                            <option value="Linux">Linux</option>
                            <option value="Mac">Mac</option>
                            <option value="Mobile">Mobile</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">
                            Describe your issue:
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default NewTicket;
