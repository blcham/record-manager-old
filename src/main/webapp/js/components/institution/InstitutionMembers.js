'use strict';

import React from 'react';
import {Button, Panel, Table} from 'react-bootstrap';

import injectInl from '../../utils/injectIntl';
import I18nWrapper from '../../i18n/I18nWrapper';
import * as Authentication from "../../utils/Authentication";
import DeleteItemDialog from "../DeleteItemDialog";

class InstitutionMembers extends React.Component {
    constructor(props){
        super(props);this.state = {
            showDialog: false,
            selectedItem: null
        }
    }

    _onDelete = (item) => {
        this.setState({showDialog: true, selectedItem: item});
    };

    _onCancelDelete = () => {
        this.setState({showDialog: false, selectedItem: null});
    };

    _onSubmitDelete = () => {
        this.props.onDelete(this.state.selectedItem, this.props.institution.key);
        this.setState({showDialog: false, selectedItem: null});
    };


    _getDeleteLabel() {
        const user = this.state.selectedItem;
        return user ? user.username : '';
    }

    render(){
        const members = this.props.members;
        let rows = [],
            member;
        for (let i = 0, len = members.length; i < len; i++) {
            member = members[i];
            rows.push(<tr key={member.username}>
                <td className='report-row'>{member.firstName + ' ' + member.lastName}</td>
                <td className='report-row'>{member.username}</td>
                <td className='report-row'>{member.emailAddress}</td>
                <td className='report-row actions'>
                    <Button bsStyle='primary' bsSize='small' title={this.props.i18n('users.open-tooltip')}
                            onClick={() => this.props.onEditUser(member, this.props.institution)}>
                        {this.props.i18n('open')}
                    </Button>
                    {Authentication.isAdmin() && <Button bsStyle='warning' bsSize='small' title={this.props.i18n('users.delete-tooltip')}
                                onClick={() => this._onDelete(member)}>{this.props.i18n('delete')}</Button>}
                </td>
            </tr>);
        }

        return <Panel header={<h3>{this.props.i18n('institution.members.panel-title')}</h3>} bsStyle='info'>
            <DeleteItemDialog onClose={this._onCancelDelete} onSubmit={this._onSubmitDelete}
                              show={this.state.showDialog} item={this.state.selectedItem}
                              itemLabel={this._getDeleteLabel()}/>
            {members.length > 0 &&
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th className='col-xs-4 content-center'>{this.props.i18n('name')}</th>
                        <th className='col-xs-2 content-center'>{this.props.i18n('login.username')}</th>
                        <th className='col-xs-4 content-center'>{this.props.i18n('users.email')}</th>
                        <th className='col-xs-2 content-center'>{this.props.i18n('table-actions')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </Table>
            }
            {Authentication.isAdmin() &&
                <div className="btn-toolbar">
                    <Button bsStyle='primary' className="btn-sm" onClick={() => this.props.onAddNewUser(this.props.institution)}>
                        {this.props.i18n('users.add-new-user')}
                    </Button>
                </div>
            }
        </Panel>;
    };
}

InstitutionMembers.propTypes = {
    members: React.PropTypes.array.isRequired,
    institution: React.PropTypes.object.isRequired,
    onEditUser: React.PropTypes.func.isRequired,
    onAddNewUser: React.PropTypes.func.isRequired,
};

export default injectInl(I18nWrapper(InstitutionMembers));
