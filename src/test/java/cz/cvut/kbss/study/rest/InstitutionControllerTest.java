package cz.cvut.kbss.study.rest;

import com.fasterxml.jackson.core.type.TypeReference;
import cz.cvut.kbss.study.dto.PatientRecordDto;
import cz.cvut.kbss.study.environment.generator.Generator;
import cz.cvut.kbss.study.environment.util.Environment;
import cz.cvut.kbss.study.model.Institution;
import cz.cvut.kbss.study.model.User;
import static org.junit.Assert.*;

import cz.cvut.kbss.study.service.InstitutionService;
import cz.cvut.kbss.study.service.PatientRecordService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;


public class InstitutionControllerTest extends BaseControllerTestRunner {
    @Mock
    private InstitutionService institutionServiceMock;

    @Mock
    private PatientRecordService patientRecordServiceMock;

    @InjectMocks
    private InstitutionController controller;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        super.setUp(controller);
        Institution institution = Generator.generateInstitution();
        User user = Generator.generateUser(institution);
        Environment.setCurrentUser(user);
    }

    @Test
    public void getAllInstitutionsReturnsEmptyListWhenNoInstitutionsAreFound() throws Exception {
        when(institutionServiceMock.findAll()).thenReturn(Collections.emptyList());

        final MvcResult result = mockMvc.perform(get("/institutions/")).andReturn();

        assertEquals(HttpStatus.OK, HttpStatus.valueOf(result.getResponse().getStatus()));
        final List<Institution> body = objectMapper.readValue(result.getResponse().getContentAsString(),
                new TypeReference<List<Institution>>() {
                });
        assertTrue(body.isEmpty());
    }

    @Test
    public void getAllInstitutionsReturnsAlphabeticallySortedInstitutions() throws Exception {
        Institution institution1 = Generator.generateInstitution();
        institution1.setName("C");
        Institution institution2 = Generator.generateInstitution();
        institution2.setName("A");
        Institution institution3 = Generator.generateInstitution();
        institution3.setName("B");
        List<Institution> institutions = new ArrayList<>();
        institutions.add(institution1);
        institutions.add(institution2);
        institutions.add(institution3);

        when(institutionServiceMock.findAll()).thenReturn(institutions);

        final MvcResult result = mockMvc.perform(get("/institutions/")).andReturn();

        assertEquals(HttpStatus.OK, HttpStatus.valueOf(result.getResponse().getStatus()));
        final List<Institution> body = objectMapper.readValue(result.getResponse().getContentAsString(),
                new TypeReference<List<Institution>>() {
                });

        assertEquals("A", body.get(0).getName());
        assertEquals("B", body.get(1).getName());
        assertEquals("C", body.get(2).getName());
        verify(institutionServiceMock).findAll();
    }

    @Test
    public void findByKeyReturnsInstitution() throws Exception {
        final String key = "12345";
        Institution institution = Generator.generateInstitution();
        institution.setKey(key);

        when(institutionServiceMock.findByKey(key)).thenReturn(institution);
        final MvcResult result = mockMvc.perform(get("/institutions/" + key)).andReturn();

        assertEquals(HttpStatus.OK, HttpStatus.valueOf(result.getResponse().getStatus()));
        final Institution res = objectMapper.readValue(result.getResponse().getContentAsString(), Institution.class);
        assertEquals(res.getUri(),institution.getUri());
        verify(institutionServiceMock).findByKey(key);
    }

    @Test
    public void findByKeyReturnsNotFound() throws Exception {
        final String key = "12345";

        when(institutionServiceMock.findByKey(key)).thenReturn(null);
        final MvcResult result = mockMvc.perform(get("/institutions/" + key)).andReturn();

        assertEquals(HttpStatus.NOT_FOUND, HttpStatus.valueOf(result.getResponse().getStatus()));
        verify(institutionServiceMock).findByKey(key);
    }

    @Test
    public void getTreatedPatientRecordsReturnsRecords() throws Exception {
        final String key = "12345";
        Institution institution = Generator.generateInstitution();
        institution.setKey(key);

        PatientRecordDto record1 = Generator.generatePatientRecordDto(Environment.getCurrentUser());
        PatientRecordDto record2 = Generator.generatePatientRecordDto(Environment.getCurrentUser());
        List<PatientRecordDto> records = new ArrayList<>();
        records.add(record1);
        records.add(record2);

        when(institutionServiceMock.findByKey(key)).thenReturn(institution);
        when(patientRecordServiceMock.findByInstitution(institution)).thenReturn(records);
        final MvcResult result = mockMvc.perform(get("/institutions/" + key + "/patients/")).andReturn();

        assertEquals(HttpStatus.OK, HttpStatus.valueOf(result.getResponse().getStatus()));
        final List<PatientRecordDto> body = objectMapper.readValue(result.getResponse().getContentAsString(),
                new TypeReference<List<PatientRecordDto>>() {
                });
        assertEquals(2, body.size());
        verify(institutionServiceMock).findByKey(key);
        verify(patientRecordServiceMock).findByInstitution(institution);
    }

    @Test
    public void createInstitutionReturnsResponseStatusCreated() throws Exception {
        Institution institution = Generator.generateInstitution();

        final MvcResult result = mockMvc.perform(post("/institutions/").content(toJson(institution))
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        assertEquals(HttpStatus.CREATED, HttpStatus.valueOf(result.getResponse().getStatus()));
    }

    @Test
    public void updateInstitutionReturnsResponseStatusNoContent() throws Exception {
        final String key = "12345";

        Institution institution = Generator.generateInstitution();
        institution.setKey(key);

        when(institutionServiceMock.findByKey(key)).thenReturn(institution);

        final MvcResult result = mockMvc.perform(put("/institutions/" + key).content(toJson(institution))
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        assertEquals(HttpStatus.NO_CONTENT, HttpStatus.valueOf(result.getResponse().getStatus()));
        verify(institutionServiceMock).findByKey(key);
    }

    @Test
    public void updateInstitutionReturnsResponseStatusBadRequest() throws Exception {
        final String key = "12345";

        Institution institution = Generator.generateInstitution();
        institution.setKey(key);

        when(institutionServiceMock.findByKey(key)).thenReturn(institution);

        final MvcResult result = mockMvc.perform(put("/institutions/123456" ).content(toJson(institution))
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        assertEquals(HttpStatus.BAD_REQUEST, HttpStatus.valueOf(result.getResponse().getStatus()));
    }

    @Test
    public void updateInstitutionReturnsResponseStatusNotFound() throws Exception {
        final String key = "12345";

        Institution institution = Generator.generateInstitution();
        institution.setKey(key);

        when(institutionServiceMock.findByKey(key)).thenReturn(null);

        final MvcResult result = mockMvc.perform(put("/institutions/" + key).content(toJson(institution))
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        assertEquals(HttpStatus.NOT_FOUND, HttpStatus.valueOf(result.getResponse().getStatus()));
        verify(institutionServiceMock).findByKey(key);
    }

    @Test
    public void deleteInstitutionReturnsResponseStatusNoContent() throws Exception {
        final String key = "12345";

        Institution institution = Generator.generateInstitution();
        institution.setKey(key);

        when(institutionServiceMock.findByKey(key)).thenReturn(institution);

        final MvcResult result = mockMvc.perform(delete("/institutions/12345" )).andReturn();

        assertEquals(HttpStatus.NO_CONTENT, HttpStatus.valueOf(result.getResponse().getStatus()));
        verify(institutionServiceMock).findByKey(key);
    }


}
