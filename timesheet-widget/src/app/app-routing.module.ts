import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsGuard } from './guards/events.guard';
import { EventInformationComponent } from './widget-components/event-information/event-information.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
    canActivate: [EventsGuard]
  },
  { path: 'timesheet/:id', component: EventInformationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
