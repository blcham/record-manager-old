import TestUtils from "react-dom/test-utils";
import React from "react";
import {IntlProvider} from "react-intl";
import InstitutionPatients from "../../../js/components/institution/InstitutionPatients";
import enLang from '../../../js/i18n/en';
import {ROLE} from "../../../js/constants/DefaultConstants";

describe('InstitutionPatients', function () {
    const intlData = enLang;
    let recordsLoaded,
        formTemplatesLoaded = {},
        currentUser = {
            username: 'testUser',
            role: ROLE.DOCTOR
        },
        records,
        onEdit = jest.fn();

    it('renders card', function () {
        recordsLoaded = {
            records
        };
        const tree = TestUtils.renderIntoDocument(
            <IntlProvider locale="en" {...intlData}>
                <InstitutionPatients recordsLoaded={recordsLoaded} formTemplatesLoaded={formTemplatesLoaded}
                                     onEdit={onEdit} currentUser={currentUser} />
            </IntlProvider>);
        const cardHeading = TestUtils.findRenderedDOMComponentWithClass(tree, 'card');
        expect(cardHeading).not.toBeNull();
        const cardBody = TestUtils.findRenderedDOMComponentWithClass(tree, 'card-body');
        expect(cardBody).not.toBeNull();
    });
});