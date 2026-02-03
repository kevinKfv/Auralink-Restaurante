# Observabilidad y Manejo de Errores

Este proyecto utiliza **Pino** para logs estructurados de alto rendimiento y un filtro global de excepciones para estandarizar las respuestas de error.

## Logs (`nestjs-pino`)

Reemplazamos el logger por defecto de NestJS con `nestjs-pino` para obtener:
1.  **JSON Estructurado**: En producción, todos los logs son JSON de una sola línea, ideales para ser ingeridos por Datadog, CloudWatch, ELK, etc.
2.  **Contexto Automático**: Cada log incluye automáticamente el request ID, método HTTP, URL y tiempo de respuesta.

### Configuración

- **Desarrollo**: Se utiliza `pino-pretty` para formatear los logs y hacerlos legibles humanamente.
- **Producción**: Se desactivan los formatos "bonitos" y se usa JSON puro (`pino-http`).

### Uso Básido

```typescript
import { Logger } from '@nestjs/common'; // Ojo: NestJS wrapper, pero por debajo es Pino

export class MyService {
  private readonly logger = new Logger(MyService.name);

  doSomething() {
    this.logger.log('Doing something important');
    this.logger.error('Something went wrong', 'Stack Trace');
  }
}
```

## Manejo de Errores

Se ha implementado un **Filtro Global de Excepciones** (`AllExceptionsFilter`) que captura cualquier error no manejado (HTTP o interno) y devuelve siempre una respuesta JSON consistente.

### Formato de Error

```json
{
  "statusCode": 500,
  "timestamp": "2023-10-27T10:00:00.000Z",
  "path": "/api/users",
  "message": "Internal Server Error"
}
```

### Stack Traces
Los stack traces se loggean en la consola del servidor (JSON en prod) pero **NO** se envían al cliente por seguridad.
