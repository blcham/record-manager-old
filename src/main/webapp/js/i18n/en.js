/**
 * English localization.
 */

var Constants = require('../constants/Constants');

module.exports = {
    'locale': 'en',

    'messages': {
        'add': 'Add',
        'back': 'Go Back',
        'cancel': 'Cancel',
        'open': 'Open',
        'close': 'Close',
        'cancel-tooltip': 'Discard changes',
        'save': 'Save',
        'delete': 'Delete',
        'headline': 'Headline',
        'name': 'Name',
        'summary': 'Summary',
        'narrative': 'Narrative',
        'table-actions': 'Actions',
        'table-edit': 'Edit',
        'author': 'Author',
        'description': 'Description',
        'select.default': '--- Select ---',
        'yes': 'Yes',
        'no': 'No',
        'unknown': 'Unknown',
        'please-wait': 'Please wait...',
        'actions': 'Actions',

        'login.title': Constants.APP_NAME + ' - Login',
        'login.username': 'Username',
        'login.password': 'Password',
        'login.submit': 'Login',
        'login.register': 'Register',
        'login.error': 'Authentication failed.',
        'login.progress-mask': 'Logging in...',

        'main.dashboard-nav': 'Dashboard',
        'main.users-nav': 'Users',
        'main.clinics-nav': 'Clinics',
        'main.records-nav': 'Patient records',
        'main.logout': 'Logout',
        'main.my-profile': 'My profile',

        'dashboard.welcome': 'Hello {name}, Welcome to ' + Constants.APP_NAME + '.',
        'dashboard.create-tile': 'Create record',
        'dashboard.users-tile': 'View users',
        'dashboard.clinics-tile': 'View clinics',
        'dashboard.records-tile': 'View patient records',

        'notfound.title': 'Not found',
        'notfound.msg-with-id': '{resource} with id {identifier} not found.',
        'notfound.msg': '{resource} not found.',

        'users.panel-title': 'Users',
        'users.create-user': 'Create user',
        'users.email': 'Email',
        'users.open-tooltip': 'View and edit details of this user',
        'users.delete-tooltip': 'Delete this user',

        'delete.dialog-title': 'Delete item?',
        'delete.dialog-content': 'Are you sure you want to remove {itemLabel}?',

        'user.panel-title': 'User',
        'user.first-name': 'First name',
        'user.last-name': 'Last name',
        'user.username': 'Username',
        'user.password': 'Password',
        'user.password-confirm': 'Confirm password',
        'user.passwords-not-matching-tooltip': 'Passwords don\'t match',
        'user.is-admin': 'Is administrator?',
        'user.save-success': 'User saved successfully',
        'user.save-error': 'Unable to save user. Server responded with {error}.',

        'clinics.panel-title': 'Clinics',
        'clinics.create-clinic': 'Create clinic',
        'clinics.open-tooltip': 'View and edit details of this clinic',
        'clinics.delete-tooltip': 'Delete this clinic',

        'clinic.panel-title': 'Clinic',
        'clinic.name': 'Clinic name',
        'clinic.email': 'Contact email',
        'clinic.created': 'Clinic registered on {date}',
        'clinic.members.panel-title': 'Clinic\'s members',
        'clinic.patients.panel-title': 'Clinic\'s patients',
        'clinic.save-success': 'Clinic successfully saved.',
        'clinic.save-error': 'Unable to save clinic. Server responded with {}.',

        'records.panel-title': 'Patient records',
        'records.local-name': 'Patient identifier',
        'records.completion-status': 'Completion status',
        'records.completion-status-tooltip.complete': 'All required fields of the patient\'s record have been filled out.',
        'records.completion-status-tooltip.incomplete': 'Some of the required fields of the patient\'s record have not yet been filled out.',
        'records.last-modified': 'Last modified',
        'records.open-tooltip': 'View and edit the record of this patient',
        'records.delete-tooltip': 'Delete this record',

        'record.panel-title': 'Record of patient {identifier}',
        'record.form-title': 'Details',
        'record.clinic': 'Patient treated at',
        'record.created-by-msg': 'Created {date} by {name}.',
        'record.last-edited-msg': 'Last modified {date} by {name}.',
        'record.save-success': 'Patient record successfully saved.',
        'record.save-error': 'Unable to save record. Server responded with {}.',
        'record.form.please-wait': 'Loading form, please wait...',

        'help.local-name': 'Purpose of this entry is to help you reference anonymized patients. Use identifiers such as patient ordering number (e.g. "patient_1", "patient_2"), patient\'s initials (e.g. "M.E."), etc.',

        'wizard.previous': 'Back',
        'wizard.next': 'Next',
        'wizard.finish': 'Finish'
    }
};
