import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    search
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function search(keyword) {
    return dispatch => {
        dispatch(request());

        userService.search(keyword)
            .then(
                result => dispatch(success(result)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.SEARCH_REQUEST } }
    function success(result) {return { type: userConstants.SEARCH_SUCCESS, result } }
    function failure(error) { return { type: userConstants.SEARCH_FAILURE, error } }
}


