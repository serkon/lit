import { defineStore } from 'pinia';

interface State {
  employees: Employee[];
  id: number;
}

const employees: Employee[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    dateOfEmployment: new Date('2020-01-01'),
    dateOfBirth: new Date('1985-03-15'),
    phone: '+1 123 456 7890',
    email: 'john.doe@example.com',
    department: 'Engineering',
    position: 'Software Developer',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    dateOfEmployment: new Date('2018-05-15'),
    dateOfBirth: new Date('1990-07-22'),
    phone: '+1 987 654 3210',
    email: 'jane.smith@example.com',
    department: 'Marketing',
    position: 'Marketing Manager',
  },
  {
    id: 3,
    firstName: 'Michael',
    lastName: 'Johnson',
    dateOfEmployment: new Date('2019-11-20'),
    dateOfBirth: new Date('1982-09-03'),
    phone: '+1 555 123 4567',
    email: 'michael.johnson@example.com',
    department: 'Finance',
    position: 'Accountant',
  },
];

export const useEmplooyeeStore = defineStore('employee', {
  state: (): State => ({ employees, id: employees.length }),
  actions: {
    addEmployee(employee: Employee) {
      this.id++;
      this.employees.push({
        ...employee,
        id: this.id,
      });
    },
    deleteEmployee(id: number) {
      this.employees = this.employees.filter((employee: Employee) => employee.id !== id);
    },
    updateEmployee(id: number) {
      this.employees = this.employees.map((employee: Employee) => (employee.id === id ? employee : employee));
    },
    getEmployee(id: number) {
      return this.employees.find((employee: Employee) => employee.id === id);
    },
    getAllEmployees(): Employee[] {
      return this.employees;
    },
  },
});

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  dateOfEmployment: Date;
  dateOfBirth: Date;
  phone: string;
  email: string;
  department: string;
  position: string;
}
