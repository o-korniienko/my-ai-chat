package org.example.domain;

import lombok.Data;

import java.util.List;

@Data
public class ChatGPTRequestObject {
    private String model;
    private List<Message> messages;

    @Data
    public class Message {
        private String content;
        private String role;
    }
}
