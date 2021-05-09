import { createStore, combineReducers} from 'redux';
import currentUser from '../redux/reducers';

const rootReducer = combineReducers({
    currentUser
});

export const store = createStore(rootReducer);