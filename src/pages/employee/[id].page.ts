import { Router, RouterLocation } from '@vaadin/router';
import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';

import common from '@/assets/styles/_common.scss?inline';
import { Employee, useEmplooyeeStore } from '@/stores/employee.store';
import { pinia } from '@/utils/store-create.util';
import { departments, positions } from '@/utils/employee-generator.util';

@customElement('employee-detail')
export class EmployeeDetail extends LitElement {
  static route = {
    path: '/employee/:id',
    // children: [
    //   {
    //     path: 'detail',
    //     component: 'employee-detail',
    //   },
    // ],
  };

  @state() private _employeeId = '';
  @state() private _localEmployee: Employee = {} as Employee;
  public location!: RouterLocation;
  private employeeStore = useEmplooyeeStore(pinia);
  private unsubscribe: (() => void) | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._employeeId = this.location.params.id as string;
    this._localEmployee = JSON.parse(JSON.stringify(this.employeeStore.get(Number(this._employeeId)))) || ({} as Employee);
    this.unsubscribe = this.employeeStore.$subscribe(() => {
      this._localEmployee = this.employeeStore.get(Number(this._employeeId)) || ({} as Employee);
      this.requestUpdate();
    });
  }

  private get employee() {
    return this.employeeStore.get(Number(this._employeeId));
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe?.();
  }

  private _handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    console.log(target.value, target.name);

    if (target.name === 'department') {
      const newDepartment = target.value;
      const newPosition = positions[newDepartment as keyof typeof positions][0];

      this._localEmployee = {
        ...this._localEmployee,
        department: newDepartment,
        position: newPosition,
      };

      this.requestUpdate();
    } else {
      this._localEmployee = {
        ...this._localEmployee,
        [target.name]: target.value,
      };
    }
  }

  private _handleSubmit(e: Event) {
    e.preventDefault();
    this.employeeStore.update(this._localEmployee);
    Router.go('/employee');
  }

  render() {
    if (!this.employee) return html`<div>Employee not found</div>`;

    return html`
      <div class="flex flex-column gap-4">
        <h1 class="text-primary">Employee Detail</h1>
        <form @submit=${this._handleSubmit} class="employee-form flex flex-column gap-8 " method="post">
          <div class="form-grid">
            <div class="form-group">
              <label>firstName</label>
              <input name="firstName" .value=${live(this._localEmployee.firstName || '')} @input=${this._handleInput} required />
            </div>

            <div class="form-group">
              <label>lastName</label>
              <input name="lastName" .value=${live(this._localEmployee.lastName || '')} @input=${this._handleInput} required />
            </div>

            <div class="form-group">
              <label>dateOfEmployment</label>
              <input name="dateOfEmployment" .value=${live(this._localEmployee.dateOfEmployment || '')} @input=${this._handleInput} required />
            </div>

            <div class="form-group">
              <label>dateOfBirth</label>
              <input name="dateOfBirth" .value=${live(this._localEmployee.dateOfBirth || '')} @input=${this._handleInput} required />
            </div>

            <div class="form-group">
              <label>Phone:</label>
              <input type="tel" name="phone" .value=${live(this._localEmployee.phone || '')} @input=${this._handleInput} required />
            </div>

            <div class="form-group">
              <label>Email:</label>
              <input type="email" name="email" .value=${live(this._localEmployee.email || '')} @input=${this._handleInput} required />
            </div>

            <!-- Department seçimi -->
            <div class="form-group">
              <label>department</label>
              <select name="department" .value=${live(this._localEmployee.department)} @input=${this._handleInput} required>
                ${departments.map((department) => html` <option .value=${department} ?selected=${this._localEmployee.department === department}>${department}</option> `)}
              </select>
            </div>

            <!-- Position seçimi -->
            <div class="form-group">
              <label>position</label>
              <select name="position" .value=${live(this._localEmployee.position)} @input=${this._handleInput} required>
                ${positions[this._localEmployee.department as keyof typeof positions]?.map(
                  (position) => html` <option value="${position}" ?selected=${this._localEmployee.position === position}>${position}</option> `,
                )}
              </select>
            </div>
          </div>
          <button type="submit" class="submit-button" @click=${this._handleSubmit}>Update Employee</button>
        </form>
      </div>
    `;
  }

  static styles = css`
    ${unsafeCSS(common)}
  `;
}
