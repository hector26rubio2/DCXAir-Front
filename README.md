# DCXAirFront

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 17.3.1.

## Descripción

DCXAirFront es una aplicación de una sola página (SPA) desarrollada en Angular 17 que permite a los usuarios buscar vuelos y cargar información de vuelos.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Abre una terminal en la carpeta raíz del proyecto.
3. Ejecuta `npm install` para instalar las dependencias del proyecto.
4. Ejecuta `ng serve` para iniciar el servidor de desarrollo. La aplicación estará disponible en `http://localhost:4200/`.

## Enrutamiento

La aplicación utiliza Angular Router para gestionar la navegación entre las diferentes vistas. A continuación se describe la configuración de las rutas principales:

- `/dashboard`: Vista principal que contiene dos subvistas.
  - `/search-flight`: Permite a los usuarios buscar vuelos.
  - `/load-flight`: Permite a los usuarios cargar información de vuelos.

Además, cualquier otra ruta será redirigida automáticamente a `/dashboard/search-flight`.


## Contribuir

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork de este repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commits (`git commit -am 'Agrega nueva funcionalidad'`).
4. Sube tus cambios a tu repositorio fork (`git push origin feature/nueva-funcionalidad`).
5. Crea un pull request hacia la rama `main` de este repositorio.

## Soporte

Si necesitas ayuda o tienes alguna pregunta, no dudes en abrir un issue en este repositorio.

