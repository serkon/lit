import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './header.component.scss?inline';

@customElement('srknc-header')
export class SrkncHeader extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  render() {
    return html`<div class="flex h-12 px-8 py-4 bg-alternative bg-light shadow-xs items-center justify-content-between">
      <img src="/logo.svg" class="w-16" alt="Logo" />
      <nav class="flex justify-content-between gap-4">
        <a href="/">Home</a> |
        <a href="/employees">Employees</a> |
        <a href="/employee/create">Create</a> |
        <a href="/contact">Contact</a>
        <!--
        <a href="/user/1">User 1</a>
        <a href="/user/2">User 2</a>
        -->
      </nav>
    </div>`;
  }
}
