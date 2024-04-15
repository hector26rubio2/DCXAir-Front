import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import type { ApiResponse, Filter, Flight, Journey } from '@interfaces/req-response';
import { Observable, map } from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class FlightService {

    private http = inject(HttpClient);
    private apiUrl = 'https://localhost:7230/api/';

    constructor() {

    }
    GetOriginAirports(): Observable<string[]> {
        return this.http.get<ApiResponse<string>>(`${this.apiUrl}Flight/origin-airports`)
            .pipe(

                map(resp => resp.Data)
            )

    }

    GetDestinationAirports(): Observable<string[]> {
        return this.http.get<ApiResponse<string>>(`${this.apiUrl}Flight/destination-airports`)
            .pipe(

                map(resp => resp.Data)
            )

    }

    SearchFlights(filterData: Filter): Observable<Journey[]> {
        return this.http.post<ApiResponse<Journey>>(`${this.apiUrl}Flight/by-filter`, filterData).pipe(
            map(response => response.Data)
        );
    }

    processFlightJSON(jsonContent: string): Flight[] {
        try {
            const flights: Flight[] = JSON.parse(jsonContent);
            return flights;

        } catch (error) {
            console.error('Error parsing JSON:', error);
            return []
        }
    }

    LoadFlight(data: Flight[]): Observable<string> {
        console.log(data);
        return this.http.post<ApiResponse<string>>(`${this.apiUrl}Flight/batch`, data).pipe(
            map(response => response.Message)
        );
    }
}

