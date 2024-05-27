PROYECTO To Do List

Se necesita crear una aplicación web para llevar el 
control de Tareas y Metas personales (To do List),esto con el
objetivo de tener un lugar donde nuestras tareas para alcanzar
ciertas metas queden reflejadas por escrito, además de poder 
agregar una fecha límite para cumplirla. 

INSTRUCCIONES:


Asegurate de tener instalado docker y git en tu computadora.

Paso 1: clona el repositorio en tu maquina local. utilizando:

        git clone https://github.com/9PaulCatalan9/maqueta-html.git
        cd maqueta-html

Paso 2:  Crear una imagen de docker para la aplicacion con el
siguiente comando

        docker build -t todo-list-image .

Paso 3: Ejecutar la aplicacion con el siguiente comando

        docker run -d -p 80:80 todo-list-image

Paso 4: Abrir el navegador y ir a:

        http://localhost:4000
