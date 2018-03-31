package cz.cvut.kbss.study.util.etemplates;

public class ForgottenPassword extends BaseEmailTemplate{
    public ForgottenPassword(String username, String newPassword) {
        this.username = username;
        this.newPassword = newPassword;
    }

    private String username;
    private String newPassword;


    @Override
    public String getSubject() {
        return "Password Change";
    }

    @Override
    public String getHTMLContent() {
        String content = "<div>" +
                "<p>Hello "+ this.username + "</p>" +
                "<p>Your new password is: " + this.newPassword + "</p>" +
                "<p>Thanks,</p>" +
                "<p>StudyManager</p>" +
                "</div>";
        return content;
    }
}
