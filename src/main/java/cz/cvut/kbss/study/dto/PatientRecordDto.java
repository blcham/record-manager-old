package cz.cvut.kbss.study.dto;

import cz.cvut.kbss.jopa.model.annotations.*;
import cz.cvut.kbss.study.model.AbstractEntity;
import cz.cvut.kbss.study.model.Institution;
import cz.cvut.kbss.study.model.User;
import cz.cvut.kbss.study.model.Vocabulary;
import cz.cvut.kbss.study.model.util.HasOwlKey;

import java.util.Date;

@OWLClass(iri = Vocabulary.s_c_patient_record)
public class PatientRecordDto extends AbstractEntity implements HasOwlKey {

    @ParticipationConstraints(nonEmpty = true)
    @OWLDataProperty(iri = Vocabulary.s_p_key)
    private String key;

    @OWLDataProperty(iri = Vocabulary.s_p_formType)
    private String formType;

    @ParticipationConstraints(nonEmpty = true)
    @OWLAnnotationProperty(iri = Vocabulary.s_p_label)
    private String localName;

    @ParticipationConstraints(nonEmpty = true)
    @OWLObjectProperty(iri = Vocabulary.s_p_has_author, fetch = FetchType.EAGER)
    private User author;

    @OWLDataProperty(iri = Vocabulary.s_p_created)
    private Date dateCreated;

    @OWLDataProperty(iri = Vocabulary.s_p_modified)
    private Date lastModified;

    @OWLObjectProperty(iri = Vocabulary.s_p_has_last_editor, fetch = FetchType.EAGER)
    private User lastModifiedBy;

    @OWLObjectProperty(iri = Vocabulary.s_p_was_treated_at, fetch = FetchType.EAGER)
    private Institution institution;

    @Override
    public String getKey() {
        return key;
    }

    @Override
    public void setKey(String key) {
        this.key = key;
    }

    public String getLocalName() {
        return localName;
    }

    public void setLocalName(String localName) {
        this.localName = localName;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }

    public User getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(User lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public Institution getInstitution() {
        return institution;
    }

    public void setInstitution(Institution institution) {
        this.institution = institution;
    }

    public String getFormType() {
        return formType;
    }

    public void setFormType(String formType) {
        this.formType = formType;
    }

    @Override
    public String toString() {
        return "PatientRecordDto{" +
                "localName=" + localName +
                "dateCreated=" + dateCreated +
                ", institution=" + institution +
                "} " + super.toString();
    }
}
