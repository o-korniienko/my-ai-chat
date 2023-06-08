package org.example.service;

import lombok.RequiredArgsConstructor;
import org.example.domain.ChatElement;
import org.example.domain.ChatGPTAnswer;
import org.example.domain.TranslateElement;
import org.example.http.HttpSender;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final HttpSender sender;

    public ChatElement askChatGPT(String question) {
        ChatElement chatElement = new ChatElement();
        chatElement.setQuestion(question);
        Optional<ChatGPTAnswer> answer = sender.askChatGPTByApi(question);
        answer.ifPresent(chatGPTAnswer -> {
            if (chatGPTAnswer.getError() != null) {
                chatElement.setError(chatGPTAnswer.getError());
            } else {
                try {
                    chatElement.setAnswer(chatGPTAnswer.getChoices().get(0).getMessage().getContent());
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                    chatElement.setError(e.getMessage());
                }
            }
        });
        return chatElement;
    }

    public TranslateElement translate(String inputText, String language) {
        TranslateElement response = new TranslateElement();
        String question = "translate into " + language + ": " + inputText;
        Optional<ChatGPTAnswer> answer = sender.askChatGPTByApi(question);
        answer.ifPresent(chatGPTAnswer -> {
            if (chatGPTAnswer.getError() != null) {
                response.setError(chatGPTAnswer.getError());
            } else {
                try {
                    response.setTranslated(answer.get().getChoices().get(0).getMessage().getContent());
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                    response.setError(e.getMessage());
                }
            }
        });
        return response;
    }
}
