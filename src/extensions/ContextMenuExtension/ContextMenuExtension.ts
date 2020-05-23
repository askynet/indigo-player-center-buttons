import { Module } from '@src/Module';
import { Events, IInstance } from '@src/types';
import pkgInfo from '../../../package.json';
import './context-menu.scss';

const logo = require('./indigo-logo-small.png');

export class ContextMenuExtension extends Module {
  public name: string = 'ContextMenuExtension';

  private contextMenu: HTMLDivElement;

  constructor(instance: IInstance) {
    super(instance);

    instance.container.addEventListener('contextmenu', this.onContextMenu);

    this.contextMenu = document.createElement('div');
    this.contextMenu.classList.add('ig_contextmenu');
    this.contextMenu.style.opacity = '0';
    instance.container.appendChild(this.contextMenu);

    this.addItem(
      `<img src='${logo}' /> Powered by <b>indigo-player v${
        pkgInfo.version
      }</b>`,
      () => {
        (window as any).open(
          'https://matvp91.github.io/indigo-player',
          '_blank',
        );
      },
    );
  }

  public addItem(html: string, onClick: any) {
    //const item = document.createElement('button');
    //item.innerHTML = html;
    //item.addEventListener('click', onClick);
    //this.contextMenu.appendChild(item);
  }

  private onContextMenu = event => {
    event.preventDefault();


   // window.addEventListener('click', this.onClick);
  };

  private onClick = () => {
    //this.contextMenu.style.opacity = '0';
    //this.contextMenu.style.pointerEvents = 'none';
   // window.removeEventListener('click', this.onClick);
  };
}
