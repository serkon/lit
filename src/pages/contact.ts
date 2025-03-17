import { LitElement, html, css, unsafeCSS } from 'lit';
import common from '@/assets/styles/_common.scss?inline';

class ContactPage extends LitElement {
  static styles = [
    css`
      ${unsafeCSS(common)}
      :host {
        --grow: 1;
        --direction: column;
        display: flex;
        align-items: center;
      }
    `,
  ];

  render() {
    return html`
      <div class="page flex flex-column grow gap-8 justify-content-center align-items-center">
        <header>
          <a href="/employees" class="ghost my-3 block">← Back</a>
          <div class="container">
            <h1 class="my-4">Contact</h1>
            <p class="subheading">
              Looking for a <span class="emphasis">skilled web developer and UI designer</span> to bring your project to life? I specialize in creating
              <span class="highlight">modern, responsive, and user-friendly applications</span> with cutting-edge technologies. Let's discuss how I can help you achieve your goals!
              Reach me at
              <a href="mailto:serkankonakci@gmail.com">serkankonakci@gmail.com</a>
            </p>
          </div>
        </header>

        <section class="flex flex-column gap-3">
          <h3>Skills</h3>

          <p>
            Nuxt, Pinia, TypeScript, Angular.io, React, Redux, ReactNative, Ionic Framework, Vue.js, Vuex, NodeJs, AngularJS, Websocket, Webpack, Grunt, Gulp,
            Bower, JavaScript (Native), NodeJS, JQuery, SASS, LESS, CSS, HTML5, PHP, JAVA, SOAP, REST, XML, Vaadin Framework, MySQL, PostgreSQL, MsSQL, SVN, GIT, Web Security, XSS
            Attacks Knowledge, Jira
          </p>
        </section>

        <section class="flex flex-column gap-3">
          <h3>Graphic Tools</h3>

          <p>Figma, Adobe Photoshop, Adobe Illustrator, Corel Draw, UX Tools, Mockup, Zeplin, Invision</p>
        </section>

        <footer>
          <div class="container">
            <p>&copy; 2025 srknc.</p>
          </div>
        </footer>
      </div>
    `;
  }
}
customElements.define('page-contact', ContactPage);
