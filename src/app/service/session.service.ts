import { Injectable } from '@angular/core';
import { Informe } from '../shared/informe.model';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    public static INFORME: string = "courseCode";

    constructor() {
    }

    unsetAll() {
        sessionStorage.setItem(SessionService.INFORME, "");
    }

    setCourseCode(informe: Informe) {
        sessionStorage.setItem(SessionService.INFORME, JSON.stringify(informe));
    }

    getCourseCode(): Informe {
        return JSON.parse(sessionStorage.getItem(SessionService.INFORME));
    }

}
