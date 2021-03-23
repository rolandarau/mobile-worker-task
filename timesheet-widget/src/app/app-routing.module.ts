import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsGuard } from './guards/events.guard';
import { EventInformationComponent } from './widget-components/event-information/event-information.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [EventsGuard],
    children: [
      {
        path: 'timesheet/:id',
        component: EventInformationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
