package org.example.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class ChatElement {

    private String question;
    private String answer;
    private String error;
}
