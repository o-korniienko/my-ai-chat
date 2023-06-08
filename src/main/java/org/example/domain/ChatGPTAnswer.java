package org.example.domain;

import lombok.Data;

import java.util.List;

@Data
public class ChatGPTAnswer {

    private String id;
    private String object;
    private long created;
    private String model;
    private List<Choice> choices;
    private String error;

    @Data
    public static class Choice {

        private Message message;
        private String finish_reason;
        private long index;

        @Data
        public static class Message {
            private String content;
            private String role;
        }
    }
}
