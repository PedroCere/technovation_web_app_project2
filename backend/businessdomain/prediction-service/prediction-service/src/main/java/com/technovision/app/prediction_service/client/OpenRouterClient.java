package com.technovision.app.prediction_service.client;

import com.technovision.app.prediction_service.client.config.OpenRouterConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "openRouterClient", url = "https://openrouter.ai/api/v1/chat/completions", configuration = OpenRouterConfig.class )
public interface OpenRouterClient {

    @PostMapping
    String getPrediction(@RequestBody OpenRouterRequest request);
}
