import { AfterViewInit, Component, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import upload from './upload'


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnChanges, AfterViewInit, OnDestroy {
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
    root.render(React.createElement(upload));
    // ReactDOM.render(React.createElement(nexwordcloud), document.getElementById(this.rootId));
  }
}
