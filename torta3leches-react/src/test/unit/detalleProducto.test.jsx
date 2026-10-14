import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import DetalleProducto from '../../pages/detalle-producto/detalle-producto';

const PRODUCTO_MOCK = [
  {
    id: 1,
    codigo: 'TC001',
    nombre: 'Torta Cuadrada de Chocolate',
    descripcion: 'Torta rica en cacao con relleno de ganache.',
    precio: 45000,
    stock: 10,
    categoria: 'Tortas Cuadradas',
    imagen: '/img/torta-chocolate.jpg'
  }
];

describe('Testing de Componente - DetalleProducto', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe mostrar mensaje de "Producto no encontrado" para un ID inexistente', () => {
    localStorage.setItem('productos', JSON.stringify(PRODUCTO_MOCK));

    render(
      <MemoryRouter initialEntries={['/detalle-producto/999']}>
        <Routes>
          <Route path="/detalle-producto/:id" element={<DetalleProducto />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Producto no encontrado/i)).toBeInTheDocument();
  });

  it('debe renderizar la información correcta cuando el producto existe', () => {
    localStorage.setItem('productos', JSON.stringify(PRODUCTO_MOCK));

    render(
      <MemoryRouter initialEntries={['/detalle-producto/1']}>
        <Routes>
          <Route path="/detalle-producto/:id" element={<DetalleProducto />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Torta Cuadrada de Chocolate')).toBeInTheDocument();
    expect(screen.getByText(/Torta rica en cacao con relleno de ganache/i)).toBeInTheDocument();
    expect(screen.getByText('$45.000')).toBeInTheDocument();
  });

  it('debe añadir el producto al carrito en localStorage al hacer clic en el botón', () => {
    localStorage.setItem('productos', JSON.stringify(PRODUCTO_MOCK));

    render(
      <MemoryRouter initialEntries={['/detalle-producto/1']}>
        <Routes>
          <Route path="/detalle-producto/:id" element={<DetalleProducto />} />
        </Routes>
      </MemoryRouter>
    );

    const btnAgregar = screen.getByRole('button', { name: /Añadir al Carrito/i });
    fireEvent.click(btnAgregar);

    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    expect(carritoGuardado).toHaveLength(1);
    expect(carritoGuardado[0].id).toBe(1);
  });
});