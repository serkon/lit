import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './pagination.component.scss?inline';

@customElement('srknc-pagination')
export class SrkncPagination extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property() total: number = 0;
  @property() limit = 10;
  @property() active = 1;
  @property() count: number = 3;

  private dispatchPageChangeEvent() {
    const event = new CustomEvent('change', {
      detail: {
        active: this.active,
        limit: this.limit
      }
    });
    this.dispatchEvent(event);
  }

  private _prev() {
    this.active--;
    this._setActive(this.active);
  }

  private _next() {
    this.active++;
    this._setActive(this.active);
  }

  private _setActive(page: number) {
    this.active = page;
    console.log(this.active);
    this.dispatchPageChangeEvent();
  }

  get totalPages() {
    return Math.ceil(this.total / this.limit);
  }

  private getVisiblePages() {
    let start = Math.max(1, this.active - this.count);
    let end = Math.min(this.totalPages, this.active + this.count);

    // Eğer son sayfa civarındaysak, başlangıç noktasını geri çekelim
    if (end > this.totalPages - this.count) {
      start = Math.max(1, this.totalPages - this.count * 2);
    }

    // Eğer ilk sayfa civarındaysak, bitiş noktasını ileri çekelim
    if (start < 1 + this.count) {
      end = Math.min(this.totalPages, 1 + this.count * 2);
    }

    // Son kontroller
    start = Math.max(1, start);
    end = Math.min(this.totalPages, end);

    // Görünür sayfaları oluştur
    const pages = [];
    for (let i = start; i <= end; i++) {
      if (i <= this.totalPages) {
        pages.push(i);
      }
    }

    return pages;
  }

  render() {
    const visiblePages = this.getVisiblePages();
    const isFirstPage = this.active === 1;
    const isLastPage = this.active === this.totalPages;

    const showFirstPageSeparator = !visiblePages.includes(1) && this.totalPages > this.count * 2;
    const showLastPageSeparator = !visiblePages.includes(this.totalPages) && this.totalPages > this.count * 2;

    return html`<div class="flex gap-4 items-center justify-content-center my-4">
      <span class="text-sm text-gray">Total: ${this.total}</span>
      <div class="flex grow justify-content-center gap-2">
        <button class="ghost shadow-0 p-0 w-8" ?disabled=${isFirstPage} @click=${this._prev}>&lt;</button>

        ${showFirstPageSeparator
          ? html`
              <button @click=${() => this._setActive(1)} class="ghost shadow-0 p-0 w-8 ${this.active === 1 ? 'active' : ''}">1</button>
              <span class="w-8 dot">...</span>
            `
          : ''}
        ${visiblePages.map((page) => html` <button class="ghost shadow-0 p-0 w-8 ${this.active === page ? 'active' : ''}" @click=${() => this._setActive(page)}>${page}</button> `)}
        ${showLastPageSeparator
          ? html`
              <span class="w-8 dot">...</span>
              <button @click=${() => this._setActive(this.totalPages)} class="ghost shadow-0 p-0 w-8 ${this.active === this.totalPages ? 'active' : ''}">${this.totalPages}</button>
            `
          : ''}

        <button class="ghost shadow-0 p-0 w-8" ?disabled=${isLastPage} @click=${this._next}>&gt;</button>
      </div>

      <span class="text-sm text-gray">Page: ${this.active}/${this.totalPages}</span>
    </div>`;
  }
}
