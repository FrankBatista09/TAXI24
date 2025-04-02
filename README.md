
# 🚖 Taxi24 API

API REST para gestión de conductores, pasajeros, viajes y facturación. Desarrollada con NestJS + MongoDB, siguiendo Clean Architecture.

## 📋 Funcionalidades por módulo

### 1. 🚗 Drivers

| Funcionalidad        | Método | Ruta                          |
|----------------------|--------|-------------------------------|
| Crear Driver         | POST   | `/drivers`                    |
| Listar todos         | GET    | `/drivers`                    |
| Listar disponibles   | GET    | `/drivers/available`          |
| Buscar por ID        | GET    | `/drivers/:id`                |
| Buscar por cercanía  | GET    | `/drivers/nearby?lng=&lat=`   |

---

### 2. 🧍 Passengers

| Funcionalidad                  | Método | Ruta                                            |
|--------------------------------|--------|-------------------------------------------------|
| Crear Passenger                | POST   | `/passengers`                                   |
| Listar todos                   | GET    | `/passengers`                                   |
| Buscar por ID                  | GET    | `/passengers/:id`                               |
| Obtener conductores cercanos  | GET    | `/passengers/:id/nearest-drivers`               |

---

### 3. 🚕 Trips

| Funcionalidad           | Método | Ruta                            |
|-------------------------|--------|---------------------------------|
| Crear viaje con un conductor seleccionado automático             | POST   | `/trips/request/auto`               |
| Crear viaje seleccionando el conductor manualmente             | POST   | `/trips/request/manual`               |
| Listar viajes activos   | GET    | `/trips/active`                |
| Completar viaje         | POST   | `/trips/:id/complete`          |

> Al completar un viaje, automáticamente se libera el conductor y se genera una factura.

---

### 4. 🧾 Invoices

| Funcionalidad                        | Método | Ruta                      |
|-------------------------------------|--------|---------------------------|
| Generar factura desde viaje         | GET    | `/invoices/:tripId`       |
| Generación automática (completar trip) | ✅     | Internamente vía lógica  |

---

## 🐳 Uso con Docker

```bash
docker-compose up --build
```

La API se expone por defecto en: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Pruebas E2E

```bash
npm run test:e2e
```

---

## ▶️ Guía de Ejecución

### 1. Clonar repositorio

```bash
git clone https://github.com/FrankBatista09/Taxi24.git
cd Taxi24
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` y define la URI de MongoDB:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/taxi24
```

> O usa la URI del contenedor `mongo` si usas Docker Compose: `mongodb://mongo:27017/taxi24`

---

### 4. Ejecutar en modo desarrollo

```bash
npm run start:dev
```

### 5. Levantar con Docker

```bash
docker-compose up --build
```

Esto levantará:
- MongoDB en el puerto `27017`
- La API en `http://localhost:3000`

---

### 6. Probar la API

Pueden usar **Postman** 

---

## 👨‍💻 Autor

Desarrollado por Frank Junior Reyes Batista
