import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import AdminProductos from '../../pages/admin-productos/admin-productos';
import { renderWithRouter } from '../helpers/renderWithRouter';
import { seedLocalStorage } from '../helpers/localStorageMock.mjs';

describe('Testing de Componente y Estilos - AdminProductos', () => {
  it('debe renderizar la tabla con las clases de CSS Modules', () => {
    seedLocalStorage('usuarioLogueado', { nombre: 'Admin', rol: 'administrador' });
    seedLocalStorage('productos', [
      { id: 1, codigo: 'BER01', nombre: 'Berlín Pastelero', precio: 1000, stock: 5, stockCritico: 10, categoria: 'Pastelería' }
    ]);

    renderWithRouter(<AdminProductos />);

    // Buscar la fila creada
    const celdaNombre = screen.getByText('Berlín Pastelero');
    expect(celdaNombre).toBeInTheDocument();

    // Comprobar que los botones tienen las clases de acciones
    const btnEditar = screen.getByText(/✏️ Editar/i);
    expect(btnEditar.className).toMatch(/btn-accion/);
    expect(btnEditar.className).toMatch(/btn-editar/);
  });
});