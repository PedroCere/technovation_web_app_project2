# 🌍 Oxi Carbon Footprint

**Oxi** es una plataforma web que permite a las empresas medir, entender y reducir su huella de carbono, utilizando inteligencia artificial y visualizaciones interactivas. Desarrollado bajo una arquitectura de microservicios, con un enfoque en sostenibilidad digital y experiencia de usuario.

🔗 **Deploy en Vercel**: https://technovation-web-app-project2.vercel.app

---

## 🧠 Funcionalidades Clave

- 📥 Ingreso diario de datos (energía, transporte, materiales, residuos).
- 🧮 Cálculo automático de emisiones de CO₂ en base a fuentes oficiales (GHG, CO₂Signal).
- 📈 Visualización gráfica de impacto ambiental (trends + breakdowns).
- 🔮 Predicciones futuras de emisiones usando IA.
- 🎯 Recomendaciones personalizadas para alcanzar objetivos Net Zero.
- 🔐 Sistema de usuarios seguro (registro, login, autenticación con JWT).
- 📊 Dashboard interactivo con comparativas por sector.
- 📤 Exportación de reportes y métricas.
  
---

## 🧰 Herramientas y Tecnologías

### 🔹 Frontend

- React.js + Vite
- Tailwind CSS + Framer Motion
- Chart.js & Recharts
- Formik + Yup
- Axios

### 🔹 Backend (Microservicios en Spring Boot)

- Spring Boot + Spring Security (JWT)
- Spring Data JPA (MySQL en Railway)
- Spring Cloud Config, Eureka, Gateway
- Feign Client + RestTemplate para llamadas entre servicios
- Validación con Hibernate Validator
- Arquitectura REST + DTOs

### 🔹 DevOps & Infraestructura

- GitHub Actions (CI/CD)
- Railway para despliegue backend
- Vercel para frontend
- GitHub Projects para backlog
- Notion + Slack (Scrum, dailies)

---

## 🧠 Arquitectura General

- **User Service**: registro, login, autenticación y roles.
- **Data + Calculation Service**: ingreso de datos y cálculo de emisiones.
- **Prediction Service (IA)**: modelo entrenado con `scikit-learn`, desplegado con FastAPI, llamado desde Spring.
- **Infraestructura adicional**: Eureka, Config Server, API Gateway.

📌 Toda la comunicación entre servicios se realiza vía HTTP con Feign y los tokens JWT se propagan para validación de sesiones.

---

## 🔌 APIs Externas Utilizadas

- [CO₂Signal API](https://api.co2signal.com): emisiones por región en tiempo real.
- GHG Protocol / EPA: factores de emisión (convertidos a JSON estáticos).

---

## 💾 Base de Datos

- 📦 Railway (MySQL)
- Diseño relacional
- Tablas por tipo de dato:
  - `energy_data`
  - `transport_data`
  - `materials_data`
  - `emission_result`
  - `users`

---

## 📊 Diagramas

### 🧩 Diagrama Entidad-Relación

- Usuarios con datos y roles.
- Datos históricos por día.
- Emisiones calculadas y predicciones almacenadas.

### ⚙️ Diagrama de Servicios

- `API Gateway` enruta peticiones a microservicios.
- `Config Server` carga config desde GitHub.
- `Eureka` para registro de servicios.
- `Prediction Service` vía FastAPI expone IA externa.

---

## 🎯 Roadmap Futuro

- 🔍 Comparativa de empresas por sector
- 🔌 Integración con APIs de consumo energético real
- 🎮 Gamificación por logros y reducción de emisiones
- 🌐 Multilenguaje (i18n)
- 📊 Reportes descargables y compartibles

---

## 🌎 Visión

**Oxi Carbon Footprint** busca empoderar a empresas con herramientas digitales para lograr una transición sostenible, alineada con los **ODS de la ONU** y regulaciones internacionales. Democratizamos la inteligencia climática para un futuro más verde.

---

## 🧪 Metodología de Trabajo

- Scrum con sprints semanales
- Backlog + tareas priorizadas (GitHub Projects)
- Dailies vía Slack / Notion
- QA con Jest + Cypress
- Despliegue continuo con GitHub Actions

---

## 🙌 Autores

Desarrollado por el equipo de innovación Technovation 
Mateo Baccillere
Gabriel Rosendorn 
Pedro Cereghetti
---

