<template>
  <div class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
    <Header />
    <div class="p-6 flex-1 py-10 w-full">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Gestión de Usuarios</h2>

      <div class="mb-4">
        <button @click="mostrarFormularioAgregar = true" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Añadir Nuevo Usuario
        </button>
      </div>

      <div v-if="mostrarFormularioAgregar" class="bg-white dark:bg-gray-800 shadow-md rounded-md p-6 mb-4">
        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Agregar Nuevo Usuario</h3>
        <form @submit.prevent="agregarUsuario">
          <div class="mb-4">
            <label for="id_usuario" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">ID Usuario:</label>
            <input v-model="nuevoUsuario.id_usuario" type="number" id="id_usuario" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   placeholder="Ingrese el ID del usuario">
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Email:</label>
            <input v-model="nuevoUsuario.email" type="email" id="email" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="mb-4">
            <label for="contrasena" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Contraseña:</label>
            <input v-model="nuevoUsuario.contrasena" type="password" id="contrasena" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="mb-4">
            <label for="rol" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Rol:</label>
            <input v-model="nuevoUsuario.rol" type="text" id="rol" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   placeholder="Ej: Instructor, Administrador, Recepción">
          </div>
          <div class="mb-4">
            <label for="activo" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Activo:</label>
            <select v-model="nuevoUsuario.activo" id="activo"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option :value="true">Sí</option>
              <option :value="false">No</option>
            </select>
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Agregar Usuario
            </button>
            <button type="button" @click="mostrarFormularioAgregar = false" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <div v-if="mostrarFormularioEditar" class="bg-white dark:bg-gray-800 shadow-md rounded-md p-6 mb-4">
        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Editar Usuario</h3>
        <form @submit.prevent="actualizarUsuario">
          <div class="mb-4">
            <label for="edit_id_usuario" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">ID Usuario:</label>
            <input v-model="usuarioEditado.id_usuario" type="number" id="edit_id_usuario" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   placeholder="ID del usuario">
          </div>
          <div class="mb-4">
            <label for="edit_email" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Email:</label>
            <input v-model="usuarioEditado.email" type="email" id="edit_email" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="mb-4">
            <label for="edit_contrasena" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Contraseña:</label>
            <input v-model="usuarioEditado.contrasena" type="password" id="edit_contrasena" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="mb-4">
            <label for="edit_rol" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Rol:</label>
            <input v-model="usuarioEditado.rol" type="text" id="edit_rol" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   placeholder="Ej: Instructor, Administrador, Recepción">
          </div>
          <div class="mb-4">
            <label for="edit_activo" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Activo:</label>
            <select v-model="usuarioEditado.activo" id="edit_activo"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option :value="true">Sí</option>
              <option :value="false">No</option>
            </select>
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Guardar Cambios
            </button>
            <button type="button" @click="mostrarFormularioEditar = false" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <div class="shadow-md overflow-hidden rounded-md">
        <table class="min-w-full bg-white dark:bg-gray-800">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                ID Usuario
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Rol
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Activo
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="usuario in usuarios" :key="usuario.id_usuario">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {{ usuario.id_usuario }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {{ usuario.email }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {{ usuario.rol }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {{ usuario.activo ? 'Sí' : 'No' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="editUsuario(usuario)" class="text-indigo-600 hover:text-indigo-900 mr-2">Editar</button>
                <button @click="eliminarUsuario(usuario.id_usuario)" class="text-red-600 hover:text-red-900">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: "Usuarios",
  components: {
    Header,
    Footer,
  },
  setup() {
    const usuarios = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const nuevoUsuario = ref({ // Para el formulario de agregar
      id_usuario: '',
      email: '',
      contrasena: '',
      rol: '',
      activo: true
    });
    const usuarioEditado = ref({ // Para el formulario de editar
      id_usuario: null,
      email: '',
      contrasena: '',
      rol: '',
      activo: true
    });
    const mostrarFormularioAgregar = ref(false);
    const mostrarFormularioEditar = ref(false);

    const agregarUsuario = () => {
      const payload = {
        id_usuario: nuevoUsuario.value.id_usuario,
        email: nuevoUsuario.value.email,
        contrasena: nuevoUsuario.value.contrasena,
        rol: nuevoUsuario.value.rol,
        activo: nuevoUsuario.value.activo,
      };

      axios.post("http://localhost:3000/api/usuarios", payload)
        .then(response => {
          usuarios.value = [...usuarios.value, response.data];
          nuevoUsuario.value = {
            id_usuario: '',
            email: '',
            contrasena: '',
            rol: '',
            activo: true
          };
          mostrarFormularioAgregar.value = false;
          alert('Usuario agregado exitosamente');
        })
        .catch(err => {
          error.value = err.message;
          console.error("Error al agregar usuario:", err);
          alert('Error al agregar usuario');
        });
    };

    const editUsuario = (usuario) => {
      usuarioEditado.value = { ...usuario }; // Copiar los datos del usuario a editar
      mostrarFormularioEditar.value = true; // Mostrar el formulario de edición
    };

    const actualizarUsuario = () => {
      const payload = {
        id_usuario: usuarioEditado.value.id_usuario,
        email: usuarioEditado.value.email,
        contrasena: usuarioEditado.value.contrasena,
        rol: usuarioEditado.value.rol,
        activo: usuarioEditado.value.activo,
      };

      axios.put(`http://localhost:3000/api/usuarios/${usuarioEditado.value.id_usuario}`, payload)
        .then(response => {
          // Actualizar el usuario en la lista local
          const index = usuarios.value.findIndex(u => u.id_usuario === usuarioEditado.value.id_usuario);
          if (index !== -1) {
            usuarios.value[index] = { ...usuarioEditado.value };
          }
          mostrarFormularioEditar.value = false; // Ocultar el formulario
          alert('Usuario actualizado exitosamente');
        })
        .catch(err => {
          error.value = err.message;
          console.error("Error al actualizar usuario:", err);
          alert('Error al actualizar usuario');
        });
    };

    const eliminarUsuario = (id) => {
      axios.delete(`http://localhost:3000/api/usuarios/${id}`)
        .then(response => {
          if (response.status === 200) {
            usuarios.value = usuarios.value.filter(usuario => usuario.id_usuario !== id);
            alert('Usuario eliminado exitosamente');
          } else {
            alert('No se pudo eliminar el usuario');
          }
        })
        .catch(err => {
          error.value = err.message;
          console.error("Error al eliminar usuario:", err);
          alert('Error al eliminar usuario');
        });
    };

    onMounted(() => {
      axios
        .get("http://localhost:3000/api/usuarios")
        .then((response) => {
          usuarios.value = response.data;
          loading.value = false;
        })
        .catch((err) => {
          error.value = err.message;
          loading.value = false;
        });
    });

    return {
      usuarios,
      loading,
      error,
      nuevoUsuario,
      usuarioEditado,
      mostrarFormularioAgregar,
      mostrarFormularioEditar,
      agregarUsuario,
      editUsuario,
      actualizarUsuario,
      eliminarUsuario
    };
  },
};
</script>

<style scoped>
.text-2xl{
  font-size: 1.5rem;
  line-height: 2rem;
}
.font-bold{
  font-weight: 700;
}
.mb-4{
  margin-bottom: 1rem;
}
.text-gray-900{
  color: #111827;
}
.dark\:text-white{
  color: #fff;
}
.bg-green-500{
  background-color: #16a34a;
}
.hover\:bg-green-700:hover{
  background-color: #15803d;
}
.text-white{
  color: #fff;
}
.py-2{
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.px-4{
  padding-left: 1rem;
  padding-right: 1rem;
}
.rounded{
  border-radius: 0.25rem;
}
.shadow-md{
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.overflow-hidden{
  overflow: hidden;
}
.min-w-full{
  min-width: 100%;
}
.bg-white{
  background-color: #fff;
}
.dark\:bg-gray-800{
  background-color: #1f2937;
}
.bg-gray-50{
  background-color: #f9fafb;
}
.dark\:bg-gray-700{
  background-color: #374151;
}
thead tr th{
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  text-align: left;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
  letter-spacing: 0.025em;
  color: #6b7280;
}
tbody tr td{
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  white-space: nowrap;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #111827;
}
tbody tr{
  border-bottom-width: 1px;
  border-color: #e5e7eb;
}
tbody tr:last-child{
  border-bottom-width: 0;
}
.dark\:text-gray-400{
  color: #9ca3af;
}
.uppercase{
  text-transform: uppercase;
}
.tracking-wider{
  letter-spacing: 0.05em;
}
.divide-y > * + *{
  border-top-width: 1px;
  border-color: #e5e7eb;
}
.dark\:divide-gray-700 > * + *{
  border-color: #374151;
}
.text-sm{
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.font-medium{
  font-weight: 500;
}
.text-gray-700{
  color: #374151;
}
.dark\:text-gray-300{
  color: #d1d5db;
}
.text-right{
  text-align: right;
}
.text-indigo-600{
  color: #4f46e5;
}
.hover\:text-indigo-900:hover{
  color: #3730a3;
}
.mr-2{
  margin-right: 0.5rem;
}
.text-red-600{
  color: #dc2626;
}
.hover\:text-red-900:hover{
  color: #b91c1c;
}

/* Form Styles */
input[type="email"],
input[type="password"],
input[type="text"],
input[type="number"],
select {
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.375rem;
  border-width: 1px;
  border-color: #e0e0e0;
  color: #374151;
  font-size: 0.875rem;
  line-height: 1.25rem;
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  transition-property: border-color, box-shadow;
  transition-duration: 150ms;
  outline: none;
}

input[type="email"]:focus,
input[type="password"]:focus,
input[type="text"]:focus,
input[type="number"]:focus,
select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.bg-blue-500 {
  background-color: #3b82f6;
}
.bg-blue-500:hover {
  background-color: #2563eb;
}
.bg-gray-300 {
  background-color: #d1d5db;
}
.bg-gray-300:hover {
  background-color: #b0b3b8;
}
.text-gray-800{
  color: #374151;
}

.flex{
  display: flex;
}
.items-center{
  align-items: center;
}
.justify-between{
  justify-content: space-between;
}

</style>