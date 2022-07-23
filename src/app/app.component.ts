import { AfterViewInit, Component, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import * as React from 'react';

// import * as ReactDOM from 'react-dom';

import nexwordcloud from './nexwordcloud';

import { createRoot } from 'react-dom/client';


@Component({
  selector: 'app-root',
  template: '<div [id]="rootId"></div>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges, AfterViewInit, OnDestroy {
  title = 'angularnexwordcloud';

  public rootId = 'rootId'

  ngOnChanges(changes: SimpleChanges) {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {

  }

  private render() {
    const container = document.getElementById(this.rootId)
    const root = createRoot(container!);
    root.render(React.createElement(nexwordcloud));
    // ReactDOM.render(React.createElement(nexwordcloud), document.getElementById(this.rootId));
  }
}
