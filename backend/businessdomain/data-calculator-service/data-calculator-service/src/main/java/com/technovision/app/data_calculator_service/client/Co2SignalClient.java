package com.technovision.app.data_calculator_service.client;

import com.technovision.app.data_calculator_service.client.config.Co2SignalClientConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(
        name = "co2-signal-client",
        url = "${api.co2signal.url}",
        configuration = Co2SignalClientConfig.class
)
public interface Co2SignalClient {
    @GetMapping("/carbon-intensity/latest")
    Co2SignalResponse getCarbonIntensity(
            @RequestParam("zone") String zone,
            @RequestHeader("auth-token") String token
    );

}
