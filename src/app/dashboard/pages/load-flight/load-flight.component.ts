import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flight } from '@interfaces/req-response';
import { FlightService } from '@services/flight.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './load-flight.component.html',

})
export default class LoadFlightComponent {

  flights: Flight[] = [];
  constructor(private flightService: FlightService, private toastr: ToastrService) { }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Check file extension
      const fileName: string = file.name;
      if (fileName.endsWith('.json')) {
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
          const contents = e.target.result;

          if (this.isJSONString(contents)) {
            const flights = this.flightService.processFlightJSON(contents);
            console.log(flights);
            this.flightService.LoadFlight(flights).subscribe(message => {
              this.toastr.success(message, 'Success');
            });
          } else {
            console.error('The selected file is not a valid JSON.');
            this.toastr.error('Error', 'Error', {
              timeOut: 3000,
            });
          }
        };
        reader.readAsText(file);
      } else {
        this.toastr.error('Error', 'Error', {
          timeOut: 3000,
        });
      }
    }
  }

  isJSONString(str: string): boolean {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  }

}
