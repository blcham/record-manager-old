package cz.cvut.kbss.study.service;

import cz.cvut.kbss.study.exception.ValidationException;
import cz.cvut.kbss.study.service.repository.BaseRepositoryService;
import cz.cvut.kbss.study.util.ConfigParam;
import cz.cvut.kbss.study.util.etemplates.BaseEmailTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.*;
import javax.annotation.PostConstruct;
import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;

@Service
public class EmailService {
    @Autowired
    private ConfigReader config;

    private String USER_NAME;
    private String DISPLAY_NAME;
    private String PASSWORD;
    private final String HOST = "smtp.gmail.com";
    protected static final Logger LOG = LoggerFactory.getLogger(BaseRepositoryService.class);

    @PostConstruct
    private void initConstants() {
        USER_NAME = config.getConfig(ConfigParam.E_USERNAME);
        DISPLAY_NAME = config.getConfig(ConfigParam.E_DISPLAY_NAME);
        PASSWORD = config.getConfig(ConfigParam.E_PASSWORD);
    }

    private Session getSession() {
        // Get system properties
        Properties props = System.getProperties();
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", HOST);
        props.put("mail.smtp.user", USER_NAME);
        props.put("mail.smtp.password", PASSWORD);
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");
        // Get the default Session object.
        return Session.getDefaultInstance(props);
    }

    public void sendEmail(BaseEmailTemplate emailTemplate, String recipientEmail, String ccEmail) {
        Session session = getSession();
        try {
            // Create a default MimeMessage object.
            MimeMessage message = new MimeMessage(session);

            // Set From: header field of the header.
            message.setFrom(new InternetAddress(USER_NAME, DISPLAY_NAME));

            // Set To: header field of the header.
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(recipientEmail));

            // Set CC: header field of the header.
            if (ccEmail != null) {
                message.addRecipient(Message.RecipientType.CC, new InternetAddress(ccEmail));
            }

            // Set Subject: header field
            message.setSubject(emailTemplate.getSubject());

            // Send the actual HTML message, as big as you like
            message.setContent(emailTemplate.getHTMLContent(), "text/html");

            // Send message
            Transport transport = session.getTransport("smtp");
            transport.connect(HOST, USER_NAME, PASSWORD);
            transport.sendMessage(message, message.getAllRecipients());
            transport.close();
        } catch (AddressException ae) {
            if (LOG.isTraceEnabled()) {
                LOG.trace("Unable to send email.", ae);
            }
            throw new ValidationException("Unable to send email", ae);
        } catch (MessagingException | UnsupportedEncodingException mex) {
            if (LOG.isTraceEnabled()) {
                LOG.trace("Unable to send email.", mex);
            }
            throw new IllegalArgumentException("Unable to send email.", mex);
        }
    }
}