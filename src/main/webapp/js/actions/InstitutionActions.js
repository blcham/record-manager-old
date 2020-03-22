import * as ActionConstants from "../constants/ActionConstants";
import {axiosBackend} from "./index";
import {ACTION_FLAG} from "../constants/DefaultConstants";
import * as Utils from "../utils/Utils";
import {loadInstitutions} from "./InstitutionsActions";
import {API_URL} from '../../config';

export function deleteInstitution(institution) {
    //console.log("Deleting institution: ", institution);
    return function (dispatch) {
        dispatch(deleteInstitutionPending(institution.key));
        axiosBackend.delete(`${API_URL}/rest/institutions/${institution.key}`, {
            ...institution
        }).then(() => {
            dispatch(loadInstitutions());
            dispatch(deleteInstitutionSuccess(institution));
        }).catch((error) => {
            dispatch(deleteInstitutionError(error.response.data, institution));
        });
    }
}

export function deleteInstitutionPending(key) {
    return {
        type: ActionConstants.DELETE_INSTITUTION_PENDING,
        key
    }
}

export function deleteInstitutionSuccess(institution) {
    return {
        type: ActionConstants.DELETE_INSTITUTION_SUCCESS,
        institution
    }
}

export function deleteInstitutionError(error, institution) {
    return {
        type: ActionConstants.DELETE_INSTITUTION_ERROR,
        error,
        institution,
    }
}

export function loadInstitution(key) {
    //console.log("Loading institution with key: ", key);
    return function (dispatch) {
        dispatch(loadInstitutionPending());
        axiosBackend.get(`${API_URL}/rest/institutions/${key}`).then((response) => {
            dispatch(loadInstitutionSuccess(response.data));
        }).catch((error) => {
            dispatch(loadInstitutionError(error.response.data));
        });
    }
}

export function loadInstitutionPending() {
    return {
        type: ActionConstants.LOAD_INSTITUTION_PENDING
    }
}

export function loadInstitutionSuccess(institution) {
    return {
        type: ActionConstants.LOAD_INSTITUTION_SUCCESS,
        institution
    }
}

export function loadInstitutionError(error) {
    return {
        type: ActionConstants.LOAD_INSTITUTION_ERROR,
        error
    }
}

export function unloadInstitution() {
    return {
        type: ActionConstants.UNLOAD_INSTITUTION
    }
}

export function createInstitution(institution) {
    //console.log("Creating institution: ", institution);
    return function (dispatch) {
        dispatch(saveInstitutionPending(ACTION_FLAG.CREATE_ENTITY));
        axiosBackend.post(`${API_URL}/rest/institutions`, {
            ...institution
        }).then((response) => {
            const key = Utils.extractKeyFromLocationHeader(response);
            dispatch(saveInstitutionSuccess(institution, key, ACTION_FLAG.CREATE_ENTITY));
            dispatch(loadInstitutions());
        }).catch((error) => {
            dispatch(saveInstitutionError(error.response.data, institution, ACTION_FLAG.CREATE_ENTITY));
        });
    }
}

export function updateInstitution(institution) {
    //console.log("Updating institution: ", institution);
    return function (dispatch) {
        dispatch(saveInstitutionPending(ACTION_FLAG.UPDATE_ENTITY));
        axiosBackend.put(`${API_URL}/rest/institutions/${institution.key}`, {
            ...institution
        }).then((response) => {
            dispatch(saveInstitutionSuccess(institution, null, ACTION_FLAG.UPDATE_ENTITY));
            dispatch(loadInstitutions());
        }).catch((error) => {
            dispatch(saveInstitutionError(error.response.data, institution, ACTION_FLAG.UPDATE_ENTITY));
        });
    }
}

export function saveInstitutionPending(actionFlag) {
    return {
        type: ActionConstants.SAVE_INSTITUTION_PENDING,
        actionFlag
    }
}

export function saveInstitutionSuccess(institution, key, actionFlag) {
    return {
        type: ActionConstants.SAVE_INSTITUTION_SUCCESS,
        institution,
        key,
        actionFlag
    }
}

export function saveInstitutionError(error, institution, actionFlag) {
    return {
        type: ActionConstants.SAVE_INSTITUTION_ERROR,
        error,
        institution,
        actionFlag
    }
}

export function unloadSavedInstitution() {
    return {
        type: ActionConstants.UNLOAD_SAVED_INSTITUTION
    }
}