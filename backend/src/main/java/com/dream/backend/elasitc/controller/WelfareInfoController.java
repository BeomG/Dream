package com.dream.backend.elasitc.controller;

import com.dream.backend.controller.ApiResponse;
import com.dream.backend.domain.welfare.Welfare;
import com.dream.backend.domain.welfare.repository.WelfareRepository;
import com.dream.backend.elasitc.entity.WelfareInfo;
import com.dream.backend.elasitc.entity.WelfareInfoRequestDto;
import com.dream.backend.elasitc.service.WelfareInfoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/welfare_info")
public class WelfareInfoController {

    private final WelfareInfoService welfareInfoService;
    private final WelfareRepository welfareRepository;

    @GetMapping("/create")
    public ApiResponse<Object> createIndex() {
        welfareInfoService.setClient();
        welfareInfoService.createIndex();
        welfareInfoService.closeAllClient();

        return ApiResponse.ok(null);
    }

    @GetMapping("/get/{id}")
    public WelfareInfo getInfo(@PathVariable("id") int id) throws IOException {

        welfareInfoService.setClient();
        WelfareInfo welfareInfo = welfareInfoService.getDocument(id);
        welfareInfoService.closeAllClient();

        return welfareInfo;
    }

    @GetMapping("/search")
    public ApiResponse searchException() {
        return ApiResponse.badRequest("No Expression");
    }

    @GetMapping("/search/{expression}")
    public List<WelfareInfo> searchInfo(@PathVariable("expression") String expr) {
        welfareInfoService.setClient();
        String query = welfareInfoService.tokenizeOnlyProper(expr);
        List<WelfareInfo> results = welfareInfoService.searchDocument(query);
        welfareInfoService.closeAllClient();
        if(!results.isEmpty())
            return results;

        return null;
    }

    @GetMapping("/search/reliable/{expression}")
    public List<WelfareInfo> reliableSearchInfo(@PathVariable("expression") String expr) {
        welfareInfoService.setClient();
        String query = welfareInfoService.tokenizeOnlyProper(expr);
        List<WelfareInfo> results = welfareInfoService.searchReliableDocument(query);
        welfareInfoService.closeAllClient();
        if(!results.isEmpty())
            return results;

        return null;
    }

    @GetMapping("/search/must/{expression}")
    public List<WelfareInfo> mustSearchInfo(@PathVariable("expression") String text) {
        welfareInfoService.setClient();
        List<WelfareInfo> results = welfareInfoService.mustSearchDocument(text);
        welfareInfoService.closeAllClient();

        return results;
    }

    @GetMapping("/search/complex/{must}/{expression}")
    public List<WelfareInfo> complexSearchInfo(@PathVariable("must") String must, @PathVariable("expression") String expr) {
        welfareInfoService.setClient();
        String query = welfareInfoService.tokenized(expr);

        List<WelfareInfo> results = welfareInfoService.complexSearchDocument(must, query);
        welfareInfoService.closeAllClient();

        if(!results.isEmpty())
            return results;

        return null;
    }

    @PostMapping("/index")
    public ApiResponse<Object> indexInfo(@RequestBody WelfareInfoRequestDto dto) {
        welfareInfoService.setClient();
        welfareInfoService.insertDocument(dto.getWelfareId(), dto.getName(), dto.getDescription());
        welfareInfoService.closeAllClient();

        return ApiResponse.ok(null);
    }

    @GetMapping("/synchro")
    public String synchronize() {
        welfareInfoService.setClient();
        List<Welfare> list = welfareRepository.findAll();

        for(Welfare item: list) {
            welfareInfoService.insertDocument(item.getId(), item.getName(), item.getDescription_origin());
        }

        welfareInfoService.closeAllClient();

        return "OK";
    }

    @GetMapping("/proper/{text}")
    public ApiResponse<String> getProperNoun(@PathVariable("text") String text) {
        welfareInfoService.setClient();
        String result = welfareInfoService.tokenizeOnlyProper(text);
        welfareInfoService.closeAllClient();

        return ApiResponse.ok(result);
    }
}
