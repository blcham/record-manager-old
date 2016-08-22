'use strict';

import React from 'react';
import {Panel} from 'react-bootstrap';

import I18nWrapper from '../../i18n/I18nWrapper';
import injectIntl from '../../utils/injectIntl';
import QuestionAnswerProcessor from '../../model/QuestionAnswerProcessor';
import Wizard from '../wizard/Wizard';
import WizardGenerator from '../wizard/generator/WizardGenerator';
import WizardStore from '../../stores/WizardStore';

class RecordForm extends React.Component {
    static propTypes = {
        record: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.i18n = this.props.i18n;
        this.state = {
            wizardProperties: null
        }
    }

    componentDidMount() {
        WizardGenerator.generateWizard(this.props.record, this.onWizardReady);
    }

    onWizardReady = (wizardProperties) => {
        this.setState({wizardProperties: wizardProperties});
    };

    getFormData = () => {
        return QuestionAnswerProcessor.buildQuestionAnswerModel(WizardStore.getData(), WizardStore.getStepData());
    };

    render() {
        if (!this.state.wizardProperties) {
            return null;
        }
        return <Panel header={<h5>{this.i18n('record.form-title')}</h5>} bsStyle='info'>
            <Wizard steps={this.state.wizardProperties.steps} enableForwardSkip={true}/>
        </Panel>;
    }
}

export default injectIntl(I18nWrapper(RecordForm));
