package com.technovision.app.prediction_service.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;

public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Oxi Carbon Footprint API")
                        .version("1.0")
                        .description("API que genera predicciones sobre consumo energético usando inteligencia artificial a partir de un texto ingresado por el usuario. " +
                                "También permite guardar, listar y eliminar esas predicciones."));
    }
}
