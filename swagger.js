const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const outputFile = './swagger-output.json';
const endpointsFiles = [
    './index.js',  // Incluir el archivo principal
    
];

const doc = {
    info: {
        version: "1.0.0",
        title: "API Proyecto GYM",
        description: "Documentación de la API del proyecto GYM"
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        
        { name: "Empleados", description: "Operaciones relacionadas con la tabla Empleados" },
        { name: "Gimnasios", description: "Operaciones relacionadas con la tabla Gimnasios" },
        { name: "Medidas_Cliente", description: "Operaciones relacionadas con la tabla Medidas_Cliente" },
        { name: "Objetivos_Cliente", description: "Operaciones relacionadas con la tabla Objetivos_Cliente" },
        { name: "Planes", description: "Operaciones relacionadas con la tabla Planes" },
        { name: "Promociones", description: "Operaciones relacionadas con la tabla Promociones" },
        { name: "Usuarios", description: "Operaciones relacionadas con la tabla Usuarios" },
        { name: "Instructores", description: "Operaciones relacionadas con la tabla Instructores" },
        { name: "Promocion_Plan", description: "Operaciones relacionadas con la tabla Promocion_Plan" },
        { name: "Cliente_Plan", description: "Operaciones relacionadas con la tabla Cliente_Plan" }
    ],
    components: {
        schemas: {
            tag:[{name: "Clientes", description: "Operaciones relacionadas con los clientes"}],
            Cliente: {
                type: 'object',
                properties: {
                    id_cliente: { type: 'integer', format: 'int32' },
                    id_usuario: { type: 'integer', format: 'int32' },
                    nombre: { type: 'string' },
                    apellido: { type: 'string' },
                    fecha_nacimiento: { type: 'string', format: 'date' },
                    telefono: { type: 'string' },
                    fecha_inscripcion: { type: 'string', format: 'date' },
                    condicion_medica: { type: 'string' },
                    id_gimnasio: { type: 'integer', format: 'int32' }
                }
            },
            Error: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            },
            Gimnasio: {
                type: 'object',
                properties: {
                    id_gimnasio: { type: 'integer', format: 'int32' },
                    nombre: { type: 'string' },
                    direccion: { type: 'string' },
                    telefono: { type: 'string' },
                    fecha_apertura: { type: 'string', format: 'date' }
                }
            },
            Usuario: {
                type: 'object',
                properties: {
                    id_usuario: { type: 'integer', format: 'int32' },
                    email: { type: 'string', format: 'email' },
                    contrasena: { type: 'string' },
                    rol: { type: 'string' },
                    activo: { type: 'boolean' }
                }
            },
            Empleado: {
                type: 'object',
                properties: {
                    id_empleado: { type: 'integer', format: 'int32' },
                    id_usuario: { type: 'integer', format: 'int32' },
                    nombre: { type: 'string' },
                    apellido: { type: 'string' },
                    telefono: { type: 'string' },
                    fecha_contratacion: { type: 'string', format: 'date' },
                    puesto: { type: 'string' },
                    id_gimnasio: { type: 'integer', format: 'int32' }
                }
            },
            MedidasCliente: {
                type: 'object',
                properties: {
                    id_medidas: { type: 'integer', format: 'int32' },
                    id_cliente: { type: 'integer', format: 'int32' },
                    fecha_medicion: { type: 'string', format: 'date' },
                    peso: { type: 'number', format: 'float' },
                    altura: { type: 'number', format: 'float' },
                    porcentaje_grasa: { type: 'number', format: 'float' },
                    masa_muscular: { type: 'number', format: 'float' },
                    cintura: { type: 'number', format: 'float' },
                    cadera: { type: 'number', format: 'float' },
                    brazo: { type: 'number', format: 'float' }
                }
            },
            Plan: {
              type: 'object',
              properties: {
                id_plan: {type: 'integer', format: 'int32'},
                nombre: {type: 'string'},
                precio: {type: 'number', format: 'float'},
                duracion_meses: {type: 'integer', format: 'int32'},
                descripcion: {type: 'string'}
              }
            },
            ClientePlan: {
                type: 'object',
                properties: {
                  id_cliente: {type: 'integer', format: 'int32'},
                  id_plan: {type: 'integer', format: 'int32'},
                  fecha_inicio: {type: 'string', format: 'date'},
                  fecha_fin: {type: 'string', format: 'date'}
                }
            },
            Instructor: {
              type: 'object',
              properties: {
                id_instructor: {type: 'integer', format: 'int32'},
                id_empleado: {type: 'integer', format: 'int32'},
                especialidad: {type: 'string'},
                coach: {type:'string'}
              }
            },
            Promocion: {
                type: 'object',
                properties: {
                  id_promocion: {type: 'integer', format: 'int32'},
                  nombre: {type: 'string'},
                  descripcion: {type: 'string'},
                  fecha_inicio: {type: 'string', format: 'date'},
                  fecha_fin: {type: 'string', format: 'date'},
                  descuento_porcentaje: {type: 'number', format: 'float'},
                  id_gimnasio: {type: 'integer', format: 'int32'}
                }
            },
            PromocionPlan: {
              type: 'object',
              properties: {
                id_promocion: {type: 'integer', format: 'int32'},
                id_plan: {type: 'integer', format: 'int32'}
              }
            },
            ObjetivoCliente: {
              type: 'object',
              properties: {
                id_objetivo: {type: 'integer', format: 'int32'},
                id_cliente: {type: 'integer', format: 'int32'},
                objetivo: {type: 'string'},
                fecha_inicio: {type: 'string', format: 'date'},
                fecha_fin_estimada: {type: 'string', format: 'date'},
                comentarios: {type: 'string'}
              }
            }
        }
    },
    definitions: {}, // Mantén esto para compatibilidad con swagger-autogen
    paths: {
        // RUTAS DE GIMNASIOS
        "/gimnasios": {
            get: {
                tags: ["Gimnasios"],
                summary: "Obtiene todos los gimnasios",
                description: "Obtiene una lista de todos los gimnasios disponibles.",
                responses: {
                    200: {
                        description: "Lista de gimnasios",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Gimnasio"
                                    }
                                }
                            }
                        }
                    },
                    500: {
                        description: "Error del servidor",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ["Gimnasios"],
                summary: "Crea un nuevo gimnasio",
                description: "Crea un nuevo gimnasio con la información proporcionada.",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Gimnasio"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Gimnasio creado exitosamente",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Gimnasio"
                                }
                            }
                        }
                    },
                    400: {
                        description: "Solicitud inválida",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    },
                    500: {
                        description: "Error del servidor",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/gimnasios/{id}": {
            get: {
                tags: ["Gimnasios"],
                summary: "Obtiene un gimnasio por su ID",
                description: "Obtiene un gimnasio específico basado en su ID.",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        description: "ID del gimnasio a obtener",
                        schema: {
                            type: "integer",
                            format: "int32"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Datos del gimnasio",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Gimnasio"
                                }
                            }
                        }
                    },
                    404: {
                        description: "Gimnasio no encontrado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    },
                    500: {
                        description: "Error del servidor",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            },
            put: {
                tags: ["Gimnasios"],
                summary: "Actualiza un gimnasio existente",
                description: "Actualiza la información de un gimnasio existente basado en su ID.",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        description: "ID del gimnasio a actualizar",
                        schema: {
                            type: "integer",
                            format: "int32"
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Gimnasio"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Gimnasio actualizado exitosamente",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Gimnasio"
                                }
                            }
                        }
                    },
                    400: {
                        description: "Solicitud inválida",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    },
                    404: {
                        description: "Gimnasio no encontrado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    },
                    500: {
                        description: "Error del servidor",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ["Gimnasios"],
                summary: "Elimina un gimnasio por su ID",
                description: "Elimina un gimnasio existente basado en su ID.",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        description: "ID del gimnasio a eliminar",
                        schema: {
                            type: "integer",
                            format: "int32"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Gimnasio eliminado exitosamente",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Gimnasio"
                                }
                            }
                        }
                    },
                    404: {
                        description: "Gimnasio no encontrado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    },
                    500: {
                        description: "Error del servidor",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            }
        },

        // RUTAS DE CLIENTES
        "/clientes": {
            get: {
                tags: ["Clientes"],
                summary: "Obtiene todos los clientes",
                description: "Obtiene una lista de todos los clientes registrados.",
                responses: {
                    200: {
                        description: "Lista de clientes",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Cliente"
                                    }
                                }
                            }
                        }
                    },
                    500: {
                        description: "Error del servidor",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ["Clientes"],
                summary: "Crea un nuevo cliente",
                description: "Crea un nuevo cliente con la información proporcionada.",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cliente"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Cliente creado exitosamente",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Cliente"
                                }
                            }
                        }
                    },
                    400: {
                        description: "Solicitud inválida",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    },
                    500: {
                        description: "Error del servidor",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/clientes/{id}": {
            get: {
                tags: ["Clientes"],
                summary: "Obtiene un cliente por su ID",
                description: "Obtiene un cliente específico basado en su ID.",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        description: "ID del cliente a obtener",
                        schema: {
                            type: "integer",
                            format: "int32"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Datos del cliente",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Cliente"
                                }
                            }
                        }
                    },
                    404: {
                        description: "Cliente no encontrado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    },
                    500: {
                        description: "Error del servidor",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            },
            put: {
                tags: ["Clientes"],
                summary: "Actualiza un cliente existente",
                description: "Actualiza la información de un cliente existente basado en su ID.",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        description: "ID del cliente a actualizar",
                        schema: {
                            type: "integer",
                            format: "int32"
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cliente"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Cliente actualizado exitosamente",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Cliente"
                                }
                            }
                        }
                    },
                    400: {
                        description: "Solicitud inválida",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    },
                    404: {
                        description: "Cliente no encontrado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    },
                    500: {
                        description: "Error del servidor",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ["Clientes"],
                summary: "Elimina un cliente por su ID",
                description: "Elimina un cliente existente basado en su ID.",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        description: "ID del cliente a eliminar",
                        schema: {
                            type: "integer",
                            format: "int32"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Cliente eliminado exitosamente",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Cliente"
                                }
                            }
                        }
                    },
                    404: {
                        description: "Cliente no encontrado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    },
                    500: {
                        description: "Error del servidor",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            }
        },

        // Aquí puedes continuar añadiendo las definiciones para las demás rutas
        // siguiendo el mismo patrón para Usuarios, Empleados, etc.
    }};

    swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
        console.log('Documentación Swagger generada con éxito');

    });