export interface InputFindCustomerDto {
  id: string;
}

export interface OutputFindCustomerDto {
  id: string;
  name: string;
  adress: {
    street: string;
    city: string;
    number: number;
    zip: string;
  };
}
