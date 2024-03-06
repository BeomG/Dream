package com.dream.backend.elasitc.repo;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;

public interface ElasticsearchRepo {

    public RestHighLevelClient getRestClient();
    public ElasticsearchClient getElasticClient();
}
