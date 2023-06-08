package org.example.controller;


import lombok.RequiredArgsConstructor;
import org.example.domain.ChatElement;
import org.example.domain.ChatGPTAnswer;
import org.example.domain.TranslateElement;
import org.example.service.ChatService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService service;

    @PostMapping("/ask_gpt")
    public ChatElement askChatGPT(@RequestBody String request){
        return service.askChatGPT(request);
    }


    @PostMapping("/translate")
    public TranslateElement translate(@RequestBody String inputText, @RequestParam(value = "language") String language){
        return service.translate(inputText, language);
    }
}
