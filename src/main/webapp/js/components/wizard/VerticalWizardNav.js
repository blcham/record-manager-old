'use strict';

import React from "react";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import PropTypes from "prop-types";

//TODO add "disabled" to VerticalWizardNav
const VerticalWizardNav = ({steps, onNavigate, currentStep}) => (
    <div className="wizard-nav col-2 p-0">
        <ListGroup>
            {steps.map((step, index) =>
                <ListGroupItem
                    key={'nav' + index} onClick={() => onNavigate(index)}
                    id={'wizard-nav-' + index}
                    active={index === currentStep ? 'active' : ''}>{step.name}</ListGroupItem>
            )}
        </ListGroup>
    </div>
);

VerticalWizardNav.propTypes = {
    currentStep: PropTypes.number.isRequired,
    steps: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired
};

export default VerticalWizardNav;
