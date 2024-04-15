
export interface Filter {
  Origin: string;
  Destination: string
  CurrencyType: number;
  FlightType: string;
}

export interface OptionType {
  label: string;
  value: string;
}


export interface ApiResponse<T> {
  Data: T[];
  Message: string;
}

export interface Journey {
  Origin: string;
  Destination: string;
  Price: number;
  Flights: Flight[];

}

export interface Flight {
  Origin: string;
  Destination: string;
  Price: number;
  Transport?: Transport;
}

export interface Transport {
  FlightCarrier: string;
  FlightNumber: string;
}
