BACKEND de To Do List - README

Este proyecto es una API backend para una aplicacion de
control de tareas y metas. La api realiza operaciones
CRUD para las metas como para las tareas.

Ee necesario tener instalado lo siguiente:
        - NODE JS
        - Workbench o Xampp
        - POSTMAN

INSTALACION:

Clonar el repositorio

        git clone https://github.com/9PaulCatalan9/http-rest.git
        cd http-rest

Instalacion de dependencias:

        npm install


La conexion a la base de datos esta configurada de la siguiente
forma:

        var connection = mysql.createConnection({
                host: "localhost",
                user: "root",
                database: "todolistdb",
                password: "galileo",
                port: "3307"
        });



Para iniciar:

        npm start