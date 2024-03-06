package com.dream.backend.elasitc.controller;


import com.dream.backend.controller.ApiResponse;
import com.dream.backend.elasitc.service.WelfareInfoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;


@RestController
@RequiredArgsConstructor
@RequestMapping("/tokenize")
@Slf4j
public class ProductController {

    private final WelfareInfoService welfareInfoService;

    @GetMapping("/{korean_text}")
    public ApiResponse<String> getToken(@PathVariable("korean_text") String text) throws IOException {

        welfareInfoService.setClient();
        String result = welfareInfoService.tokenized(text);
        welfareInfoService.closeAllClient();

        return ApiResponse.ok(result);
    }
}
