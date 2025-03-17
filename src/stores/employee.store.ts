import { defineStore } from 'pinia';
import { employees } from '@/utils/employee-generator.util';

interface State {
  employees: Employee[];
  id: number;
}

export const useEmplooyeeStore = defineStore('employee', {
  state: (): State => ({ employees, id: employees.length }),
  actions: {
    add(employee: Employee) {
      const { id, ...rest } = employee;
      this.employees.push({
        id: ++this.id,
        ...rest,
      });
      this.saveStorage();
    },
    delete(id: number) {
      this.employees = this.employees.filter((employee: Employee) => employee.id !== id);
      this.saveStorage();
    },
    update(employee: Employee) {
      const index = this.employees.findIndex((item: Employee) => item.id === employee.id);
      if (index !== -1) {
        this.employees[index] = employee;
        this.saveStorage();
      }
    },
    get(id: number): Employee | undefined {
      return this.employees.find((employee: Employee) => employee.id === id);
    },
    all(): Employee[] {
      return this.employees;
    },
    saveStorage() {
      localStorage.setItem('employees', JSON.stringify(this.employees));
    },
  },
});

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  dateOfEmployment: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  department: string;
  position: string;
}
