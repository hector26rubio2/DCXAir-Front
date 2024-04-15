import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnumValidatorPipe } from '../../../pipes/enum-validator.pipe';
import { CurrencyType, FlightType } from '../../../enum/CurrencyType .enum';
import { NgSelectModule } from '@ng-select/ng-select';
import { Journey, OptionType } from '@interfaces/req-response';
import { FlightService } from '@services/flight.service';


@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule,
    ReactiveFormsModule],
  templateUrl: './search-flight.component.html',
  styleUrl: './search-flight.component.css',

})
export default class SearchFlightComponent {

  form: FormGroup;
  originOptions: OptionType[] = [];
  destinationOptions: OptionType[] = [];
  journeys: Journey[] = [];
  currencyTypeOptions = [
    { label: 'Dollar', value: CurrencyType.Dollar },
    { label: 'Euro', value: CurrencyType.Euro },
    { label: 'Peso', value: CurrencyType.Peso }
  ];

  flightTypeOptions = [
    { label: 'One Way', value: FlightType.OneWay },
    { label: 'Round Trip', value: FlightType.RoundTrip }
  ];
  constructor(private fb: FormBuilder, private enumValidatorPipe: EnumValidatorPipe, private flightService: FlightService) {
    this.form = this.fb.group({
      Origin: ['', [Validators.required, Validators.maxLength(3), Validators.pattern('[A-Z]{3}')]],
      Destination: ['', [Validators.required, Validators.maxLength(3), Validators.pattern('[A-Z]{3}')]],
      CurrencyType: ['', [Validators.required]],
      FlightType: ['', [Validators.required, (control: AbstractControl) => this.enumValidatorPipe.transform(control.value, FlightType) ? null : { invalidEnum: true }]] // Arreglo de validadores
    });
  }

  getFieldErrors(field: string) {
    const formControl = this.form.get(field);
    return formControl?.errors;
  }

  ngOnInit(): void {
    this.getDestinationAirports();
    this.getOriginAirports();
  }

  getOriginAirports() {
    this.flightService.GetOriginAirports().subscribe(
      airports => {
        this.originOptions = airports.map((airport: string) => ({ label: airport, value: airport }));
      },
      error => {
        console.error('Error al obtener aeropuertos de origen:', error);
      }
    );
  }

  getDestinationAirports() {
    this.flightService.GetDestinationAirports().subscribe(
      airports => {
        this.destinationOptions = airports.map((airport: string) => ({ label: airport, value: airport }));
      },
      error => {
        console.error('Error al obtener aeropuertos de destino:', error);
      }
    );
  }


  onSubmit() {

    this.markAllFieldsAsTouched();
    if (this.form.valid) {

      this.flightService.SearchFlights({
        Origin: this.form.value.Origin,
        Destination: this.form.value.Destination,
        CurrencyType: parseInt(this.form.value.CurrencyType, 10),
        FlightType: this.form.value.FlightType
      }).subscribe(
        journeys => {
          console.log(journeys);
          this.journeys = journeys;
          // Aquí puedes realizar cualquier acción adicional con los datos recibidos
        },
        error => {
          console.error('Error al buscar vuelos:', error);
          // Aquí puedes manejar el error de manera adecuada, como mostrar un mensaje al usuario
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  isFieldInvalid(field: string) {
    const formControl = this.form.get(field);
    return formControl?.invalid && (formControl.dirty || formControl.touched);
  }

  markAllFieldsAsTouched() {
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
