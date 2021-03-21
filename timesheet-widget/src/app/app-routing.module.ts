import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventInformationComponent } from './widget-components/event-information/event-information.component';

const routes: Routes = [
  { path: 'timesheet/:id', component: EventInformationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
