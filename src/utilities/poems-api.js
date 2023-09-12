import sendRequest from "./send-request";
const BASE_URL = '/api/notes';

export function index() {
    console.log('beforesend');
    return sendRequest(BASE_URL);
}

export function create(newnote, newTitle, newGenre) {
    return sendRequest(BASE_URL, 'POST', { newnote, newTitle, newGenre });
}

export function deletenote(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}

export function edit(id, editnote) {
    console.log(id, editnote);
    return sendRequest(`${BASE_URL}/${id}`, 'PUT', { text: editnote });
}