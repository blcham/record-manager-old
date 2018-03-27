'use strict';

import React from "react";
import {Button, Panel} from "react-bootstrap";
import injectIntl from "../../utils/injectIntl";
import I18nWrapper from "../../i18n/I18nWrapper";
import RecordTable from "./RecordTable";
import {ACTION_STATUS, ALERT_TYPES} from "../../constants/DefaultConstants";
import AlertMessage from "../AlertMessage";

class Records extends React.Component {
    static propTypes = {
        recordsLoaded: React.PropTypes.object,
        recordDeleted: React.PropTypes.object,
        showAlert: React.PropTypes.bool.isRequired,
        handlers: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.i18n = this.props.i18n;
    }

    render() {
        const {showAlert, recordDeleted} = this.props;
        return <Panel header={this._renderHeader()} bsStyle='primary'>
            <RecordTable {...this.props}/>
            <div>
                <Button bsStyle='primary'
                        onClick={this.props.handlers.onCreate}>{this.i18n('dashboard.create-tile')}</Button>
            </div>
            {showAlert && recordDeleted.status === ACTION_STATUS.ERROR &&
            <AlertMessage type={ALERT_TYPES.DANGER}
                          message={this.props.formatMessage('record.delete-error', {error: this.i18n(this.props.recordDeleted.error.message)})}/>}
            {showAlert && recordDeleted.status === ACTION_STATUS.SUCCESS &&
            <AlertMessage type={ALERT_TYPES.SUCCESS} message={this.i18n('record.delete-success')}/>}
        </Panel>;
    }

    _renderHeader() {
        return <span>
            {this.i18n('records.panel-title')}
            {this.props.recordsLoaded.records && this.props.recordsLoaded.status === ACTION_STATUS.PENDING && <div className="loader"></div>}
        </span>;
    }
}

export default injectIntl(I18nWrapper(Records));
