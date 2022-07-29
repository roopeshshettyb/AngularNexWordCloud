import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { iframeComponent } from './iframe/iframe.component'
const routes: Routes = [
    { path: 'upload', component: UploadComponent },
    { path: 'iframe', component: iframeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [UploadComponent]
