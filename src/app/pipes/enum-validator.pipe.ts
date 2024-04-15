import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'enumValidator'
})
@Injectable({
    providedIn: 'root'
})
export class EnumValidatorPipe implements PipeTransform {
    transform(value: any, enumValues: any): boolean {
        return Object.values(enumValues).includes(value);
    }
}