package com.dream.backend.elasitc.service;

import co.elastic.clients.elasticsearch.core.DeleteResponse;
import co.elastic.clients.elasticsearch.core.GetResponse;
import co.elastic.clients.elasticsearch.core.IndexResponse;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.dream.backend.elasitc.entity.WelfareInfo;
import lombok.RequiredArgsConstructor;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.indices.AnalyzeRequest;
import org.elasticsearch.client.indices.AnalyzeResponse;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class WelfareInfoService extends ElasticConnectionService {

    public void createIndex() {
        try {
            esClient.indices().create(c -> c.index("welfare_info"));
        } catch(IOException e) {
            e.printStackTrace();
        }
    }

    public void insertDocument(Long id, String name, String desc) {
        WelfareInfo welfareInfo = new WelfareInfo(id, name, desc, tokenized(desc));
        try {
            IndexResponse response = esClient.index(i -> i
                    .index("welfare_info")
                    .id(Long.toString(id))
                    .document(welfareInfo)
            );
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public WelfareInfo getDocument(int id) {
        try {
            GetResponse<WelfareInfo> response = esClient.get(g -> g
                    .index("welfare_info")
                    .id(Integer.toString(id)),
                    WelfareInfo.class
            );

            if(response.found()) {
                return response.source();
            }
        } catch(IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    public void removeDocument(int id) {

        try {
            DeleteResponse response = esClient.delete(d -> d
                    .index("welfare_info")
                    .id(Integer.toString(id))
            );
        } catch(IOException e) {
            e.printStackTrace();
        }
    }

    public List<WelfareInfo> searchDocument(String words) {
        List<WelfareInfo> results = new ArrayList<>();
        SearchResponse<WelfareInfo> response;
        try {
             response = esClient.search(s -> s
                    .index("welfare_info")
                             .query(q -> q
                             .match(t -> t
                                     .field("keywords")
                                     .query(words)
                             )
                     ),
                     WelfareInfo.class
             );

            List<Hit<WelfareInfo>> hits = response.hits().hits();
            for(Hit<WelfareInfo> hit: hits) {
                WelfareInfo welfareInfo = hit.source();
                welfareInfo.setScore(hit.score());
                results.add(welfareInfo);
            }

            return results;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    public List<WelfareInfo> mustSearchDocument(String text) {
        List<WelfareInfo> results = new ArrayList<>();
        SearchResponse<WelfareInfo> response;
        String qur = tokenizeOnlyProper(text);

        try {
            response = esClient.search(s -> s
                            .index("welfare_info")
                            .query(q -> q
                                    .bool(b -> b
                                            .must(m -> m
                                                    .match(t -> t
                                                            .field("keywords")
                                                            .query(qur))))),
                    WelfareInfo.class
            );

            List<Hit<WelfareInfo>> hits = response.hits().hits();
            for(Hit<WelfareInfo> hit: hits) {
                WelfareInfo welfareInfo = hit.source();
                welfareInfo.setScore(hit.score());
                results.add(welfareInfo);
            }

            return results;

        } catch(IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    public List<WelfareInfo> complexSearchDocument(String must, String query) {
        List<WelfareInfo> results = new ArrayList<>();
        SearchResponse<WelfareInfo> response;

        try {
            response = esClient.search(s -> s
                    .index("welfare_info")
                    .query(q -> q
                            .bool(b -> b
                                    .must(m -> m
                                            .match(t -> t
                                                    .field("keywords")
                                                    .query(must)))
                                    .should(sd -> sd
                                            .match(t -> t
                                                    .field("keywords")
                                                    .query(query))))),
                    WelfareInfo.class
            );

            List<Hit<WelfareInfo>> hits = response.hits().hits();
            for(Hit<WelfareInfo> hit: hits) {
                WelfareInfo welfareInfo = hit.source();
                welfareInfo.setScore(hit.score());
                results.add(welfareInfo);
            }

            return results;

        } catch(IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    public List<WelfareInfo> searchReliableDocument(String words) {
        List<WelfareInfo> results = new ArrayList<>();
        SearchResponse<WelfareInfo> response;
        try {
            response = esClient.search(s -> s
                            .index("welfare_info")
                            .query(q -> q
                                    .match(t -> t
                                            .field("keywords")
                                            .query(words)
                                    )
                            ),
                    WelfareInfo.class
            );

            List<Hit<WelfareInfo>> hits = response.hits().hits();
            double lowestLimit = response.hits().maxScore() * 0.8;
            for(Hit<WelfareInfo> hit: hits) {
                if(hit.score() >= lowestLimit) {
                    WelfareInfo welfareInfo = hit.source();
                    welfareInfo.setScore(hit.score());
                    results.add(welfareInfo);
                }
            }

            return results;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    public String tokenized(String text) {
        String results = "";
        try {
//            Request request = new Request(
//                    "GET",
//                    "/_analyze"
//            );
//            request.setEntity(new NStringEntity(
//                    "{\"tokenizer\": \"nori_tokenizer\"," +
//                            "\"text\": \"" + text + "\"}",
//                    ContentType.APPLICATION_JSON
//            ));

//            필터 추가: 어미, 감탄사, 조사, 의존명사, 대명사, 일반부사, 접속부사, 동사, 동사 파생 접미사, 보조 용언
            AnalyzeRequest request = AnalyzeRequest.withIndexAnalyzer("korean_analyzer_stopwords", "nori_analyzer", text);
            AnalyzeResponse response = client.indices().analyze(request, RequestOptions.DEFAULT);

            List<AnalyzeResponse.AnalyzeToken> tokens = response.getTokens();

            for (AnalyzeResponse.AnalyzeToken token : tokens) {
                results += token.getTerm() + " ";
            }
//            Response response = restClient.performRequest(request);
//            System.out.println(EntityUtils.toString(response.getEntity()));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return results;
    }

    public String tokenizeOnlyProper(String text) {
        String results = "";
        try {
            // 고유 명사만 추출하는 analyzer
            AnalyzeRequest request = AnalyzeRequest.withIndexAnalyzer("korean_proper", "nori_analyzer", text);
            AnalyzeResponse response = client.indices().analyze(request, RequestOptions.DEFAULT);

            List<AnalyzeResponse.AnalyzeToken> tokens = response.getTokens();

            for (AnalyzeResponse.AnalyzeToken token : tokens) {
                results += token.getTerm() + " ";
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return results;
    }
}
