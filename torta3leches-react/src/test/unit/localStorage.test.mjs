import { describe, it, expect, beforeEach } from 'vitest';

describe('Pruebas Unitarias - Gestión de Carrito en localStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe agregar un nuevo producto al carrito con cantidad 1', () => {
    const producto = { id: 1, nombre: 'Torta de Chocolate', precio: 45000 };
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrito.push({ ...producto, cantidad: 1 });
    localStorage.setItem('carrito', JSON.stringify(carrito));

    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    expect(carritoGuardado).toHaveLength(1);
    expect(carritoGuardado[0].cantidad).toBe(1);
    expect(carritoGuardado[0].nombre).toBe('Torta de Chocolate');
  });

  it('debe incrementar la cantidad si el producto ya existe en el carrito', () => {
    const producto = { id: 1, nombre: 'Torta de Chocolate', precio: 45000, cantidad: 1 };
    localStorage.setItem('carrito', JSON.stringify([producto]));

    let carrito = JSON.parse(localStorage.getItem('carrito'));
    const productoExistente = carrito.find((p) => p.id === producto.id);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    const carritoActualizado = JSON.parse(localStorage.getItem('carrito'));
    expect(carritoActualizado[0].cantidad).toBe(2);
  });

  it('debe calcular correctamente el total de la compra', () => {
    const carritoMock = [
      { id: 1, precio: 45000, cantidad: 2 }, // $90.000
      { id: 2, precio: 5000, cantidad: 3 }   // $15.000
    ];

    const total = carritoMock.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    expect(total).toBe(105000);
  });
});