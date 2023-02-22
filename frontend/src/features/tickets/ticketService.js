import axios from 'axios';

const API_URL = '/api/tickets/';

const createTicket = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    // Axios post([URI], [body], [{headers: xxx}])
    const response = await axios.post(API_URL, ticketData, config);

    return response.data;
};

const ticketService = {
    createTicket,
};

export default ticketService;
