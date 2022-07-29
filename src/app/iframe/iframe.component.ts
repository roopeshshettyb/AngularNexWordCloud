import { AfterViewInit, Component, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import iframe from './iframe'


@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.css']
})
export class iframeComponent implements OnChanges, AfterViewInit, OnDestroy {
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
    root.render(React.createElement(iframe));
    // ReactDOM.render(React.createElement(nexwordcloud), document.getElementById(this.rootId));
  }
}
