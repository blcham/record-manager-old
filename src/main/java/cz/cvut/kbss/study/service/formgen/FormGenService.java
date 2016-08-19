package cz.cvut.kbss.study.service.formgen;

import cz.cvut.kbss.study.model.PatientRecord;
import cz.cvut.kbss.study.persistence.dao.formgen.FormGenDao;
import cz.cvut.kbss.study.rest.dto.RawJson;
import cz.cvut.kbss.study.rest.util.RestUtils;
import cz.cvut.kbss.study.service.data.DataLoader;
import cz.cvut.kbss.study.util.ConfigParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
public class FormGenService {

    private static final Logger LOG = LoggerFactory.getLogger(FormGenService.class);

    // FormGen repository URL
    private static final String REPOSITORY_URL_PARAM = "repositoryUrl";
    private static final String RECORD_GRAPH_ID_PARAM = "recordGraphId";

    @Autowired
    private FormGenDao formGenDao;

    @Autowired
    private DataLoader dataLoader;

    @Autowired
    private Environment environment;

    /**
     * Gets a form from a remote generator service.
     *
     * @param record Record for which the form should be generated
     * @return Form template in JSON-LD
     */
    public RawJson generateForm(PatientRecord record) {
        Objects.requireNonNull(record);
        final URI context = formGenDao.persist(record);
        return loadFormStructure(context);
    }

    private RawJson loadFormStructure(URI context) {
        final String serviceUrl = environment.getProperty(ConfigParam.FORM_GEN_SERVICE_URL.toString(), "");
        final String repoUrl = environment.getProperty(ConfigParam.FORM_GEN_REPOSITORY_URL.toString(), "");
        if (serviceUrl.isEmpty() || repoUrl.isEmpty()) {
            LOG.error("Form generator service URL or repository URL is missing. Service URL: {}, repository URL: {}.",
                    serviceUrl, repoUrl);
            return new RawJson("");
        }
        final Map<String, String> params = new HashMap<>();
        params.put(RECORD_GRAPH_ID_PARAM, RestUtils.encodeUrl(context.toString()));
        params.put(REPOSITORY_URL_PARAM, RestUtils.encodeUrl(repoUrl));
        return new RawJson(dataLoader.loadData(serviceUrl, params));
    }

    public RawJson getPossibleValues(String query) {
        Objects.requireNonNull(query);
        return new RawJson(dataLoader.loadData(query, Collections.emptyMap()));
    }
}