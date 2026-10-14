import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminUsuarios from '../../pages/admin-usuarios/admin-usuarios';

// Mock de alert para evitar advertencias de JSDOM
vi.stubGlobal('alert', vi.fn());

const USUARIOS_MOCK = [
  {
    run: '306869574',
    nombre: 'Carlos',
    apellidos: 'Gómez',
    correo: 'carlos@duoc.cl',
    tipoUsuario: 'administrador',
    region: 'Metropolitana',
    comuna: 'Santiago',
    direccion: 'Av. Siempre Viva 123'
  },
  {
    run: '16115511K',
    nombre: 'Ana',
    apellidos: 'Pérez',
    correo: 'ana@duoc.cl',
    tipoUsuario: 'cliente',
    region: 'Valparaíso',
    comuna: 'Viña del Mar',
    direccion: 'Calle Valparaíso 456'
  }
];

describe('Testing de Componente y Estilos - AdminUsuarios', () => {
  beforeEach(() => {
    localStorage.clear();

    // 1. Precargar usuario administrador en sesión para superar la validación del useEffect
    localStorage.setItem(
      'usuarioLogueado',
      JSON.stringify({
        run: '306869574',
        nombre: 'Admin',
        rol: 'administrador'
      })
    );

    // 2. Precargar la lista de usuarios en 'usuariosRegistrados'
    localStorage.setItem('usuariosRegistrados', JSON.stringify(USUARIOS_MOCK));
  });

  it('debe cargar y renderizar la lista de usuarios guardada en localStorage', () => {
    render(
      <BrowserRouter>
        <AdminUsuarios />
      </BrowserRouter>
    );

    // Verificar presencia de los nombres y correos de la tabla
    expect(screen.getByText(/Carlos Gómez/i)).toBeInTheDocument();
    expect(screen.getByText('carlos@duoc.cl')).toBeInTheDocument();
    expect(screen.getByText(/Ana Pérez/i)).toBeInTheDocument();
    expect(screen.getByText('ana@duoc.cl')).toBeInTheDocument();
  });

  it('debe renderizar las acciones con sus respectivas clases de estilo de CSS Modules', () => {
    render(
      <BrowserRouter>
        <AdminUsuarios />
      </BrowserRouter>
    );

    // Buscar botones de Editar en la tabla
    const btnsEditar = screen.getAllByRole('button', { name: /✏️ Editar/i });
    expect(btnsEditar.length).toBe(2);

    // Verificar que apliquen las clases dinámicas con Hash de CSS Modules
    expect(btnsEditar[0].className).toMatch(/btn-accion/);
    expect(btnsEditar[0].className).toMatch(/btn-editar/);
  });
});