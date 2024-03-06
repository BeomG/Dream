package com.dream.backend.elasitc.repo;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestHighLevelClient;

import java.io.IOException;

public class WelfareInfoRepo implements ElasticsearchRepo{

    private RestClientBuilder lowClient = null;
    private RestClient client = null;

    public WelfareInfoRepo(String serverUrl, int port) {
        lowClient = RestClient
            .builder(new HttpHost(serverUrl, port, "http"));
        client = lowClient.build();
    }
    @Override
    public RestHighLevelClient getRestClient() {

        RestHighLevelClient restClient = new RestHighLevelClient(lowClient);

        return restClient;
    }

    @Override
    public ElasticsearchClient getElasticClient() {

        ElasticsearchTransport transport = new RestClientTransport(this.client, new JacksonJsonpMapper());
        ElasticsearchClient esClient = new ElasticsearchClient(transport);

        return esClient;
    }

    public void closeClient() {
        try {
            this.client.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
