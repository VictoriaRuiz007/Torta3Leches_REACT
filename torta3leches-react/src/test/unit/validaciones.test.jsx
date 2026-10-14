import { describe, it, expect } from 'vitest';

export const validarRUT = (rut) => {
  if (!rut || typeof rut !== 'string') return false;
  
  const rutLimpio = rut.replace(/[.-]/g, '');
  if (!/^[0-9]+[0-9Kk]$/.test(rutLimpio)) return false;
  
  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1).toUpperCase();
  
  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }
  
  const resto = suma % 11;
  const dvCalc = 11 - resto;
  
  const dvExpected = dvCalc === 11 ? '0' : dvCalc === 10 ? 'K' : dvCalc.toString();
  
  return dv === dvExpected;
};

describe('Pruebas Unitarias - Validación de RUT/RUN', () => {
  it('debe validar un RUT correcto sin puntos ni guión (DV numérico)', () => {
    // 30.686.957-4 -> DV real es 4
    expect(validarRUT('306869574')).toBe(true);
  });

  it('debe validar un RUT correcto con DV con letra K', () => {
    // 16.115.511-K -> DV real es K
    expect(validarRUT('16115511K')).toBe(true);
  });

  it('debe validar RUTs formateados con puntos y guion', () => {
    expect(validarRUT('16.115.511-K')).toBe(true);
    expect(validarRUT('30.686.957-4')).toBe(true);
  });

  it('debe rechazar un RUT con dígito verificador erróneo', () => {
    expect(validarRUT('306869570')).toBe(false);
  });

  it('debe rechazar cadenas que no son números ni formato RUT', () => {
    expect(validarRUT('ABCDEFGH')).toBe(false);
  });
});