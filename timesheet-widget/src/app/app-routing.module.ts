import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsGuard } from './guards/events.guard';
import { AddTaskComponent } from './widget-components/add-task/add-task.component';
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
      { path: 'add-task', component: AddTaskComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
