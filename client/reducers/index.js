import { combineReducers } from 'redux';
import GifsReducer from './gifs.js';
import ModalReducer from './modal.js';

const rootReducer = combineReducers({
    gifs: GifsReducer,
    modal: ModalReducer
});

export default rootReducer;
