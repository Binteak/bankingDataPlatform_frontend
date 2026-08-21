import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LaunchProcessService { 

    private readonly _djangoServer = '';
    private readonly _httpOptions = {
        //eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Content-Type': 'application/json' }
    };

    constructor(private _http: HttpClient) {}


    launchProcess(body: any): Observable<any> {
        return this._http.post<any>(`${this._djangoServer}/launch_process`, body, this._httpOptions);
    }
        
    
}