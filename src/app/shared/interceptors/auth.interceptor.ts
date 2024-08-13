import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { SesionService } from './sesion.service';

/**
 * HTTP Interceptor for adding an authorization token to outgoing requests.
 * 
 * This interceptor retrieves the current authentication token from `SesionService` and 
 * adds it to the `Authorization` header of the outgoing HTTP request. It handles errors by 
 * logging them and can be extended to manage specific cases, such as unauthorized access.
 * 
 * @function
 * @param req - The HTTP request object to be intercepted.
 * @param next - The `HttpHandler` to pass the modified request to the next handler in the chain.
 * @returns {Observable<HttpEvent<any>>} - An observable of the HTTP event with the updated request.
 * 
 */
export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const sesionService = inject(SesionService);
  let authToken: string = sesionService.getCurrentSesion();

  // Clone the request and add the authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  // Pass the cloned request with the updated header to the next handler
  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 401) {
          // Specific handling for unauthorized errors
          console.error('Unauthorized request:', err);
          // You might trigger a re-authentication flow or redirect the user here
        } else {
          // Handle other HTTP error codes
          console.error('HTTP error:', err);
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
      }

      // Re-throw the error to propagate it further
      return throwError(() => err);
    })
  );
};
