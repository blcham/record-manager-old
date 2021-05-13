package cz.cvut.kbss.study.rest.handler;

/**
 * Contains information about an error and can be send to client as JSON to let him know what is wrong.
 */
public class ErrorInfo {

    private String message;

    private String messageId;

    private String requestUri;

    public ErrorInfo(String requestUri) {
        this.requestUri = requestUri;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * Gets error message identifier.
     * <p>
     * This identifier can be used by the UI to display a corresponding localized error message.
     *
     * @return Error message identifier
     */
    public String getMessageId() {
        return messageId;
    }

    public void setMessageId(String messageId) {
        this.messageId = messageId;
    }

    public String getRequestUri() {
        return requestUri;
    }

    public void setRequestUri(String requestUri) {
        this.requestUri = requestUri;
    }

    @Override
    public String toString() {
        return "ErrorInfo{" + requestUri + ", messageId=" + messageId + ", message='" + message + "'}";
    }

    /**
     * Creates a new instance with the specified message and request URI.
     *
     * @param message    Error message
     * @param requestUri URI of the request which caused the error
     * @return New {@code ErrorInfo} instance
     */
    public static ErrorInfo createWithMessage(String message, String requestUri) {
        final ErrorInfo errorInfo = new ErrorInfo(requestUri);
        errorInfo.setMessage(message);
        return errorInfo;
    }

    /**
     * Creates a new instance with the specified message, message identifier and request URI.
     * <p>
     * In case a message identifier is used, this is the preferred way of creating an {@link ErrorInfo} instance, as it
     * provides not only a UI-centric error message identifier, but also an error message which could be used by other
     * clients to determine the cause of the error.
     *
     * @param messageId  Error message identifier
     * @param message    Error message
     * @param requestUri URI of the request which caused the error
     * @return New {@code ErrorInfo} instance
     */
    public static ErrorInfo createWithMessageAndMessageId(String messageId, String message,  String requestUri) {
        final ErrorInfo errorInfo = new ErrorInfo(requestUri);
        errorInfo.setMessage(message);
        errorInfo.setMessageId(messageId);
        return errorInfo;
    }
}
