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
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcmlvIFJvc3NpIiwiYWRtaW4iOnRydWV9.uYPniMkIZRHB3GYJyZIXfsKbfcKl7X92Tk6cRdYfBNU';
        
        // admin false
        //let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcmlvIFJvc3NpIiwiYWRtaW4iOmZhbHNlfQ.FoE-WLf9-HpCOt9VvpRg8htFLIp0Z1W9wuw9_TYaIiQ';
        
        let cloneReq = req.clone({
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            method: 'GET',
            headers: req.headers.set('authority','jsonplaceholder.typicode.com')
        });
        //console.log('2 interceptor request',cloneReq);
        return next.handle(cloneReq).pipe(
            map((event: HttpEvent<any>) => {
                console.log('req.url', req.url);
                console.log('req.method', req.method);
                let resp;
                if (req.url.endsWith('/api/authenticate') 
                    && req.method === 'POST') {
                    let body = JSON.parse(req.body);
                    if (body.email === '1234' && body.password === '1234') {
                        console.log('Username and Password VALID');
                        resp = new HttpResponse({
                            body: { token: token },
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
                    if (req.headers.get('Authorization') === 'Bearer ' + token) {
                        console.log('Getting Orders');
                        resp = new HttpResponse({
                            body: [1 ,2, 3],
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
