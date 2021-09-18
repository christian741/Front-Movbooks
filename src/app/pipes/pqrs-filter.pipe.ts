import { Pipe, PipeTransform } from '@angular/core';
import { Pqr } from '../models/pqr.model';

@Pipe({
  name: 'pqrsFilter'
})
export class PqrsFilterPipe implements PipeTransform {

  transform(pqrs: Pqr[], answered: boolean): Pqr[] {
    return pqrs.filter(x => x.answered === answered);
  }

}
