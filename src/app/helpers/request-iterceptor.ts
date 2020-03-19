import { map, tap, catchError } from 'rxjs/operators';
import { Injectable, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    
    constructor(
        private router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // admin true
        let adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIFVzZXIiLCJhZG1pbiI6dHJ1ZX0.hIOF-cqwrV5aFWcU5apn8weCwTJCq_0TSqA_Zc6nyhk';
        
        // admin false
        let userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik5vcm1hbCBVc2VyIiwiYWRtaW4iOmZhbHNlfQ.Lh0G_aP7VglE5UuXLdJmWbwrU-ucesV5rXi1o5pA74g';
        
        let cloneReq = req.clone({
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            method: 'GET',
            headers: req.headers.set('authority','jsonplaceholder.typicode.com')
        });
        return next.handle(cloneReq).pipe(
            map((event: HttpEvent<any>) => {
                console.log('req.url', req.url);
                console.log('req.method', req.method);
                let resp;
                if (req.url.endsWith('/api/authenticate') 
                    && req.method === 'POST') {
                    let body = JSON.parse(req.body);
                    if ((body.email === '1234' && body.password === '1234')
                        || (body.email === '4321' && body.password === '4321')) {
                        let returnToken = body.email === '1234' ? adminToken : userToken;
                        resp = new HttpResponse({
                            body: { token: returnToken },
                            status: 200
                        });
                    } else {
                        resp = new HttpResponse({
                            status: 400
                        });
                    }

                } 
                if (req.url.endsWith('/api/orders') 
                    && req.method === 'GET') {
                    console.log('req.headers',req.headers);
                    if (req.headers.get('Authorization') === 'Bearer ' + adminToken) {
                        resp = new HttpResponse({
                            body: [
                                { id: 1, name: 'order one' },
                                { id: 2, name: 'order two' }, 
                                { id: 3, name: 'order three' }
                            ],
                            status: 200
                        });
                    } else {
                        resp = new HttpResponse({
                            status: 401
                        });
                    }
                }
                return resp;
            }),
            catchError(this.handleError)
        )

    }

    private handleError(error: Response) {
        return throwError(new ErrorHandler());
      }
}
