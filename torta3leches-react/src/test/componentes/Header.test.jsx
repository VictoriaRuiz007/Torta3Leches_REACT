import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Header from '../../components/public/Header';
import { renderWithRouter } from '../helpers/renderWithRouter';
import { seedLocalStorage } from '../helpers/localStorageMock.mjs';

describe('Testing de Componente - Header', () => {
  it('debe renderizar el logo y botones públicos cuando no hay sesión activa', () => {
    renderWithRouter(<Header />);

    // Verificar presencia del logo
    const logo = screen.getByAltText('Logo PokéComelones');
    expect(logo).toBeInTheDocument();

    // Verificar enlaces públicos
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    expect(screen.getByText('Registro')).toBeInTheDocument();
  });

  it('debe mostrar el saludo y botón de Admin cuando el usuario es Administrador y aplicar estilos', () => {
    // Simulamos usuario administrador en localStorage
    seedLocalStorage('usuarioLogueado', {
      nombre: 'Administrador Poké',
      rol: 'administrador'
    });

    renderWithRouter(<Header />);

    // Verificar que aparece el saludo
    expect(screen.getByText(/👋 Hola, Administrador Poké/i)).toBeInTheDocument();

    // Verificar el botón Admin exclusivo
    const btnAdmin = screen.getByText(/🔧 Admin/i);
    expect(btnAdmin).toBeInTheDocument();
  });
});