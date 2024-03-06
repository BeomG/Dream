package com.dream.backend.elasitc.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.message.BasicHeader;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;


@Service
@Transactional
public class ElasticConnectionService {

    protected RestClient restClient;
    protected RestHighLevelClient client;
    protected ElasticsearchClient esClient;
    private String serverUrl = "j9c209.p.ssafy.io";
    private int port = 9200;
    private String apiKey = "NFl3amtZb0JsSzJlT3lYcXhRcmc6WDBabGZhYlpUdmlfNHpLTE5RMjk4Zw==";

    public void setClient() {
        HttpHost httphost = new HttpHost(serverUrl, port, "http");
        BasicHeader header = new BasicHeader("Authorization", "ApiKey " + apiKey);

        restClient = RestClient
                .builder(httphost)
                .setDefaultHeaders(new Header[] {header})
                .build();
        client = new RestHighLevelClient(RestClient
                .builder(httphost)
                .setDefaultHeaders(new Header[] {header})
        );
        ElasticsearchTransport transport = new RestClientTransport(
                restClient, new JacksonJsonpMapper()
        );
        esClient = new ElasticsearchClient(transport);
    }

    public void closeAllClient() {
        try {
            restClient.close();
            client.close();
        } catch(IOException e) {
            e.printStackTrace();
        }
    }
}
