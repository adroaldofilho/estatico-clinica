import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Util {

    constructor(){

    }
    
    formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hora = '' + d.getHours(),
            minuto = '' + d.getMinutes();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        if (hora.length < 2)
            hora = '0' + hora;
        if (minuto.length < 2)
            minuto = '0' + minuto;
        
        return day + '/' + month + '/' + year + ' - ' + hora + ':' + minuto;
        // return [day, month, year].join('-');
    }
}