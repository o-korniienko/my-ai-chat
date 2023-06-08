package org.example.http;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.domain.ChatGPTAnswer;
import org.example.domain.ChatGPTRequestObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class HttpSender {

    @Value("${chat.sender.timeout}")
    private int timeout;
    @Value("${chat.gpt.url}")
    private String url;
    @Value("${chat.gpt.api.secret.key}")
    private String secret;
    @Value("${chat.gpt.model}")
    private String chatModel;

    private final ObjectMapper mapper;


    public Optional<ChatGPTAnswer> sendRequest(ChatGPTRequestObject requestObject) {
        try {
            RestTemplate template = new RestTemplate(getClientHttpRequestFactory());

            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            headers.set("Authorisation", "Bearer");
            headers.setBearerAuth(secret);
            String jsonObject = "";
            try {
                jsonObject = mapper.writer().writeValueAsString(requestObject);
            } catch (JsonProcessingException e) {
                log.error("Method sendRequest got error " + e.getMessage());
                return Optional.empty();
            }


            HttpEntity<String> request = new HttpEntity<>(jsonObject, headers);

            ResponseEntity<ChatGPTAnswer> response = template.postForEntity(url, request, ChatGPTAnswer.class);

            if (response.getStatusCode() == HttpStatusCode.valueOf(200)) {
                return Optional.ofNullable(response.getBody());
            }
        } catch (RestClientException | IllegalArgumentException e) {
            log.error("Method sendRequest got error " + e.getMessage());
            ChatGPTAnswer answer = new ChatGPTAnswer();
            answer.setError(e.getMessage());
            return Optional.of(answer);
        }
        return Optional.empty();
    }

    private SimpleClientHttpRequestFactory getClientHttpRequestFactory() {
        SimpleClientHttpRequestFactory clientHttpRequestFactory
                = new SimpleClientHttpRequestFactory();
        //Connect timeout
        clientHttpRequestFactory.setConnectTimeout(timeout);

        //Read timeout
        clientHttpRequestFactory.setReadTimeout(timeout);
        return clientHttpRequestFactory;
    }

    public Optional<ChatGPTAnswer> askChatGPTByApi(String question) {
        ChatGPTRequestObject requestObject = new ChatGPTRequestObject();
        List<ChatGPTRequestObject.Message> messages = new ArrayList<>();
        ChatGPTRequestObject.Message message = requestObject.new Message();
        message.setContent(question);
        message.setRole("user");
        messages.add(message);
        requestObject.setMessages(messages);
        requestObject.setModel(chatModel);
        return sendRequest(requestObject);

    }
}
