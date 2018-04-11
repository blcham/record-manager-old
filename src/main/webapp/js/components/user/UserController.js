'use strict';

import React from 'react';
import assign from 'object-assign';

import injectIntl from '../../utils/injectIntl';
import I18nWrapper from '../../i18n/I18nWrapper';
import User from './User';
import {Routes} from '../../utils/Routes';
import {transitionTo, transitionToWithOpts} from '../../utils/Routing';
import {loadInstitutions} from "../../actions/InstitutionsActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {ACTION_FLAG, ACTION_STATUS, ROLE} from "../../constants/DefaultConstants";
import {setTransitionPayload} from "../../actions/RouterActions";
import {
    createUser, generateUsername, loadUser, sendInvitation, unloadSavedUser, unloadUser,
    updateUser
} from "../../actions/UserActions";
import * as UserFactory from "../../utils/EntityFactory";
import omit from 'lodash/omit';
import {getRole} from "../../utils/Utils";

class UserController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this._isNew() ? UserFactory.initNewUser() : null,
            saved: false,
            showAlert: false
        };
        this.institution = this._getPayload()
    }

    _isNew() {
        return !this.props.params.username;
    }

    componentWillMount() {
        if (!this.state.user) {
            this.props.loadUser(this.props.params.username);
        }
        if(this.state.user && this.state.user.isNew && this.institution) {
            this._onChange({institution: this.institution});
        }
        if(this.props.userSaved.actionFlag === ACTION_FLAG.CREATE_ENTITY && this.props.userSaved.status === ACTION_STATUS.SUCCESS) {
            this.setState({showAlert: true});
            this.props.unloadSavedUser();
        }
    }

    componentWillUnmount() {
        this.props.unloadUser();
    }

    componentDidMount() {
        if(this.props.currentUser.role === ROLE.ADMIN && !this.props.institutionsLoaded.institutions) {
            this.props.loadInstitutions();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.saved && nextProps.userLoaded.status !== ACTION_STATUS.PENDING
            && nextProps.userSaved.status === ACTION_STATUS.SUCCESS) {
            if (nextProps.userSaved.actionFlag === ACTION_FLAG.CREATE_ENTITY) {
                this.props.transitionToWithOpts(Routes.editUser, {
                    params: {username: nextProps.userSaved.user.username},
                    payload: {institution: this.institution}
                });
            } else {
                this.setState({saved: false});
                this.props.loadUser(nextProps.userSaved.user.username);
            }
        }
        if (this.props.userLoaded.status === ACTION_STATUS.PENDING && nextProps.userLoaded.status === ACTION_STATUS.SUCCESS) {
            this.setState({user: nextProps.userLoaded.user});
        }
        if (this.props.generatedUsername.status === ACTION_STATUS.PENDING && nextProps.generatedUsername.status === ACTION_STATUS.SUCCESS) {
            this._onChange({username: nextProps.generatedUsername.username});
        }
    }

    _onSave = () => {
        let user = this.state.user;
        this.setState({saved: true, showAlert: true, invited: false});
        if (user.isNew || (this._isNew() && this.props.userSaved.status === ACTION_STATUS.ERROR)) {
            this.props.createUser(omit(user, 'isNew'));
        } else {
            this.props.updateUser(user, this.props.currentUser);
        }
    };

    _onCancel = () => {
        const handlers = this.props.viewHandlers[Routes.editUser.name];
        if (handlers && !this.institution) {
            transitionTo(handlers.onCancel);
        } else if (this.institution) {
            this.props.transitionToWithOpts(Routes.editInstitution, {params: {key: this.institution.key}});
        } else {
            transitionTo(this.props.currentUser.role === ROLE.ADMIN ? Routes.users : Routes.dashboard);
        }
    };

    _onChange = (change) => {
        const update = assign({}, this.state.user, change);
        this.setState({user: update});
    };

    _onPasswordChange = () => {
        this.props.transitionToWithOpts(Routes.passwordChange, {
            params: {username: this.props.params.username}
        });
    };

    _generateUsername = () => {
        this.props.generateUsername(getRole(this.state.user).toLowerCase());
    };

    _getPayload() {
        let payload = this._isNew() ? this.props.transitionPayload[Routes.createUser.name] :
                                      this.props.transitionPayload[Routes.editUser.name];
        this._isNew() ? this.props.setTransitionPayload(Routes.createUser.name, null) :
                        this.props.setTransitionPayload(Routes.editUser.name, null);
        return payload ? payload.institution : null;
    }

    _sendInvitation = () => {
        this.setState({invited: true, showAlert: false});
        this.props.sendInvitation(this.state.user.username);
    };

    render() {
        const {currentUser, userSaved, userLoaded, institutionsLoaded, invitationSent} = this.props;
        if (!currentUser) {
            return null;
        }
        const handlers = {
            onSave: this._onSave,
            onCancel: this._onCancel,
            onChange: this._onChange,
            onPasswordChange: this._onPasswordChange,
            generateUsername: this._generateUsername,
            sendInvitation: this._sendInvitation
        };
        return <User user={this.state.user} handlers={handlers} backToInstitution={this.institution !== null}
                     userSaved={userSaved} showAlert={this.state.showAlert} userLoaded={userLoaded}
                     currentUser={currentUser} institutions={institutionsLoaded.institutions || []}
                     invitationSent={invitationSent} invited={this.state.invited}/>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(I18nWrapper(UserController)));

function mapStateToProps(state) {
    return {
        userSaved: state.user.userSaved,
        userLoaded: state.user.userLoaded,
        currentUser: state.auth.user,
        institutionsLoaded: state.institutions.institutionsLoaded,
        transitionPayload: state.router.transitionPayload,
        viewHandlers: state.router.viewHandlers,
        generatedUsername: state.user.generatedUsername,
        invitationSent: state.user.invitationSent
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createUser: bindActionCreators(createUser, dispatch),
        updateUser: bindActionCreators(updateUser, dispatch),
        loadUser: bindActionCreators(loadUser, dispatch),
        unloadUser: bindActionCreators(unloadUser, dispatch),
        unloadSavedUser: bindActionCreators(unloadSavedUser, dispatch),
        loadInstitutions: bindActionCreators(loadInstitutions, dispatch),
        setTransitionPayload: bindActionCreators(setTransitionPayload, dispatch),
        transitionToWithOpts: bindActionCreators(transitionToWithOpts, dispatch),
        generateUsername: bindActionCreators(generateUsername, dispatch),
        sendInvitation: bindActionCreators(sendInvitation, dispatch)
    }
}