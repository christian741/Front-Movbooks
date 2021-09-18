import { Injectable } from '@angular/core';
import { UsersService } from '../services/users.service';

import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })

// AsyncValidator para REACTIVE FORM
export class UniqueNicknameValidator implements AsyncValidator {

    constructor(private usersService: UsersService) { }

    validate(ctrl: AbstractControl)
            : Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

        return this.usersService.findByNickname(ctrl.value).pipe(
            map(user => (user ? {uniqueNickname: true} : null)),
            catchError(() => of(null)) // si ocurre un error simplemente regresamos null
        );
    }
}
