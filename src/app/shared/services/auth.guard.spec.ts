import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
    TestBed.runInInjectionContext(() => {
      const guard = inject(authGuard);
      return guard.canActivate(...guardParameters);
    });

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
