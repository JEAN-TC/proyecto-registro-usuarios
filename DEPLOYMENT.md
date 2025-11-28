# Guía de Despliegue para Producción

Este documento te guiará para desplegar tu aplicación full-stack, que consta de tres partes:
1.  **Frontend (Vue.js)**: Se desplegará en **Netlify**.
2.  **User Service (Node.js/Express)**: Se desplegará en **Render**.
3.  **Matching Service (Node.js/Express)**: Se desplegará también en **Render**.

## Paso 1: Preparar tu Base de Datos en la Nube

Tus servicios de backend necesitan una base de datos PostgreSQL que sea accesible desde internet.

1.  **Crea una cuenta** en un proveedor de bases de datos como [Supabase](https://supabase.com/), [Neon](https://neon.tech/) o [Render Postgres](https://render.com/docs/databases#postgresql).
2.  **Crea una nueva base de datos** PostgreSQL.
3.  **Obtén la URL de conexión** de la base de datos. Se verá algo así: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`. Guárdala, la necesitarás en el siguiente paso.
4.  **Ejecuta las migraciones de Prisma:** Para que tu nueva base de datos tenga las tablas correctas, deberás ejecutar el siguiente comando desde tu máquina local, apuntando a la base de datos en la nube. **Haz esto para CADA servicio (`user-service` y `matching-service`)**:
    ```bash
    # En la carpeta user-service/
    DATABASE_URL="TU_NUEVA_URL_DE_CONEXION" npx prisma migrate deploy

    # En la carpeta matching-service/
    DATABASE_URL="TU_NUEVA_URL_DE_CONEXION" npx prisma migrate deploy
    ```

## Paso 2: Desplegar los Servicios de Backend en Render

Repite estos pasos para `user-service` y `matching-service`.

1.  **Sube tu código a GitHub**: Asegúrate de que tu proyecto esté en un repositorio de GitHub.
2.  **Crea una cuenta en Render**: Ve a [Render](https://render.com/) y regístrate.
3.  **Crea un nuevo "Web Service"**:
    *   Conecta tu repositorio de GitHub.
    *   **Build Command**: `npm install && npm run build`
    *   **Start Command**: `npm run start`
4.  **Añade las Variables de Entorno**: En la sección "Environment" de tu servicio en Render, añade las siguientes variables (usando los archivos `.env.example` como guía):
    *   `DATABASE_URL`: La URL de tu base de datos en la nube que obtuviste en el Paso 1.
    *   `JWT_SECRET`: Crea una clave secreta larga y segura. **Debe ser la misma para ambos servicios**.
    *   `FRONTEND_URL`: La dejarás en blanco por ahora. La rellenarás en el Paso 3.
5.  **Despliega**: Haz clic en "Create Web Service". Render construirá y desplegará tu aplicación.
6.  **Obtén la URL del backend**: Una vez desplegado, Render te dará una URL pública para tu servicio (ej: `https://user-service-abcd.onrender.com`). Cópiala.

## Paso 3: Desplegar el Frontend en Netlify

1.  **Sube tu código a GitHub** (si no lo has hecho ya).
2.  **Crea una cuenta en Netlify**: Ve a [Netlify](https://www.netlify.com/) y regístrate.
3.  **Crea un nuevo sitio desde Git**:
    *   Conecta tu repositorio de GitHub.
    *   **Build Command**: `npm run build`
    *   **Publish directory**: `dist`
4.  **Añade las Variables de Entorno**: Ve a "Site settings" > "Build & deploy" > "Environment" y añade las siguientes variables:
    *   `VITE_USER_SERVICE_API_URL`: Pega la URL de tu `user-service` que obtuviste de Render.
    *   `VITE_MATCHING_SERVICE_API_URL`: Pega la URL de tu `matching-service` que obtuviste de Render.
5.  **Despliega el sitio**: Netlify construirá y desplegará tu frontend.
6.  **Obtén la URL del frontend**: Netlify te dará la URL pública de tu sitio (ej: `https://mi-proyecto.netlify.app`).

## Paso 4: Conectar Todo

1.  **Vuelve a Render**.
2.  Ve a la configuración de entorno de `user-service` y `matching-service`.
3.  En la variable `FRONTEND_URL`, pega la URL de tu sitio de Netlify.
4.  Guarda los cambios. Render redetectará los cambios y reiniciará tus servicios.

¡Y eso es todo! Tu aplicación debería estar completamente funcional en producción.
