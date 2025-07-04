# Documentación de Comandos Básicos de Git y Terminal

## ¿Qué es Git y cómo usarlo?

**Git** es un sistema de control de versiones distribuido que permite gestionar el historial de cambios en proyectos de software, trabajar en equipo y mantener sincronizado el código.

En **Windows**, Git se utiliza principalmente a través de **Git Bash**, una terminal que se instala junto con Git. Para abrirla en una carpeta específica, simplemente **haz clic derecho dentro de la carpeta y selecciona “Git Bash Here”**.

### 📥 Descarga e instalación

Puedes descargar Git desde su sitio oficial:

👉 [https://git-scm.com](https://git-scm.com)

Una vez instalado, puedes abrir Git Bash y ejecutar `git --version` para comprobar que funciona correctamente.


## Creación y Navegación de Carpetas

```bash
mkdir Nombre_carpeta
# Crear una carpeta

cd Carpeta
# Acceder a una carpeta

cd ..
# Salir de la carpeta actual

ls
# Listar archivos y carpetas

pwd
# Mostrar la ubicación exacta del directorio actual
```

## Inicialización y Clonado de Repositorios

```bash
git init
# Iniciar un repositorio Git dentro de una carpeta

git clone URL
# Clonar un repositorio remoto usando la URL (.git)
```

## Seguimiento y Versionado

```bash
git status
# Ver el estado actual de los archivos del repositorio

git add Nombre_archivo
# Agregar un archivo específico al área de staging

git add .
# Agregar todos los archivos al área de staging

git commit -m "Mensaje"
# Crear un commit con una descripción

git commit --amend
# Modificar el último commit (requiere git add previo)
```

## Manejo de Ramas y Remotos

```bash
git branch -M main
# Renombrar la rama actual a 'main'

git remote add origin Link_Github
# Agregar repositorio remoto (solo al iniciar uno nuevo)

git push -u origin main
# Primer envío al repositorio remoto (usa -u para rastrear rama)

git push origin main
# Enviar cambios a la rama 'main'

git pull origin main --rebase
# Traer y combinar cambios remotos con rebase
```

## Manejo de Archivos y Versiones

```bash
git mv file_from file_to
# Mover o renombrar archivos bajo control de versiones

git tag -a v0.1 -m 'my version 0.1'
# Crear una etiqueta (tag) con anotación

git tag
# Ver todas las etiquetas existentes

git show v0.16
# Ver detalles de una etiqueta específica

git push origin v0.1
# Subir una etiqueta al repositorio remoto
```

## Flujo general

```bash
git add .
git commit -m ""
git push origin main
# Secuencia para subir un commit
```

## Sino

```bash
git pull origin main --rebase
git add .
git commit --amend
git push --force origin main
# Secuencia para modificar y forzar el envío de un commit ya empujado
```