(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{"2SfW":function(s,n){s.exports='<span class="hljs-keyword">import</span> { Component, EventEmitter, Injectable, Output } from <span class="hljs-string">\'@angular/core\'</span>;\n<span class="hljs-keyword">import</span> { CalendarDayViewComponent, CalendarUtils } from <span class="hljs-string">\'angular-calendar\'</span>;\n<span class="hljs-keyword">import</span> { DayView, DayViewEvent, GetDayViewArgs } from <span class="hljs-string">\'calendar-utils\'</span>;\n\n<span class="hljs-keyword">const</span> EVENT_WIDTH = <span class="hljs-number">150</span>;\n\n<span class="hljs-comment">// extend the interface to add the array of users</span>\n<span class="hljs-interface"><span class="hljs-keyword">interface</span> DayViewScheduler <span class="hljs-keyword">extends</span> DayView </span>{\n  users: <span class="hljs-built_in">any</span>[];\n}\n\n@Injectable()\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> DayViewSchedulerCalendarUtils extends CalendarUtils {\n  getDayView(args: GetDayViewArgs): DayViewScheduler {\n    <span class="hljs-keyword">const</span> view: DayViewScheduler = {\n      ...super.getDayView(args),\n      users: []\n    };\n    view.events.forEach(({ event }) =&gt; {\n      <span class="hljs-comment">// assumes user objects are the same references,</span>\n      <span class="hljs-comment">// if 2 users have the same structure but different object references this will fail</span>\n      <span class="hljs-keyword">if</span> (!view.users.includes(event.meta.user)) {\n        view.users.push(event.meta.user);\n      }\n    });\n    <span class="hljs-comment">// sort the users by their names</span>\n    view.users.sort((user1, user2) =&gt; user1.name.localeCompare(user2.name));\n    view.events = view.events.map(dayViewEvent =&gt; {\n      <span class="hljs-keyword">const</span> index = view.users.indexOf(dayViewEvent.event.meta.user);\n      dayViewEvent.left = index * EVENT_WIDTH; <span class="hljs-comment">// change the column of the event</span>\n      <span class="hljs-keyword">return</span> dayViewEvent;\n    });\n    view.width = view.users.length * EVENT_WIDTH;\n    <span class="hljs-keyword">return</span> view;\n  }\n}\n\n@Component({\n  <span class="hljs-comment">// tslint:disable-line max-classes-per-file</span>\n  selector: <span class="hljs-string">\'mwl-day-view-scheduler\'</span>,\n  styles: [\n    `\n      .day-view-column-headers {\n        display: flex;\n        margin-left: <span class="hljs-number">70</span>px;\n      }\n      .day-view-column-header {\n        width: <span class="hljs-number">150</span>px;\n        border: solid <span class="hljs-number">1</span>px black;\n        text-align: center;\n      }\n    `\n  ],\n  providers: [\n    {\n      provide: CalendarUtils,\n      useClass: DayViewSchedulerCalendarUtils\n    }\n  ],\n  templateUrl: <span class="hljs-string">\'day-view-scheduler.component.html\'</span>\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> DayViewSchedulerComponent extends CalendarDayViewComponent {\n  view: DayViewScheduler;\n\n  @Output()\n  userChanged = <span class="hljs-keyword">new</span> EventEmitter();\n\n  eventDragged(dayEvent: DayViewEvent, xPixels: <span class="hljs-built_in">number</span>, yPixels: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">void</span> {\n    <span class="hljs-keyword">if</span> (yPixels !== <span class="hljs-number">0</span>) {\n      <span class="hljs-keyword">super</span>.dragEnded(dayEvent, { y: yPixels, x: <span class="hljs-number">0</span> } as <span class="hljs-built_in">any</span>); <span class="hljs-comment">// original behaviour</span>\n    }\n    <span class="hljs-keyword">if</span> (xPixels !== <span class="hljs-number">0</span>) {\n      <span class="hljs-keyword">const</span> columnsMoved = xPixels / EVENT_WIDTH;\n      <span class="hljs-keyword">const</span> currentColumnIndex = <span class="hljs-keyword">this</span>.view.users.findIndex(\n        user =&gt; user === dayEvent.event.meta.user\n      );\n      <span class="hljs-keyword">const</span> newIndex = currentColumnIndex + columnsMoved;\n      <span class="hljs-keyword">const</span> newUser = <span class="hljs-keyword">this</span>.view.users[newIndex];\n      <span class="hljs-keyword">if</span> (newUser) {\n        <span class="hljs-keyword">this</span>.userChanged.emit({ event: dayEvent.event, newUser });\n      }\n    }\n  }\n}\n'},"6nCy":function(s,n){s.exports='<span class="hljs-keyword">import</span> { NgModule } from <span class="hljs-string">\'@angular/core\'</span>;\n<span class="hljs-keyword">import</span> { CommonModule } from <span class="hljs-string">\'@angular/common\'</span>;\n<span class="hljs-keyword">import</span> { RouterModule } from <span class="hljs-string">\'@angular/router\'</span>;\n<span class="hljs-keyword">import</span> { CalendarModule, DateAdapter } from <span class="hljs-string">\'angular-calendar\'</span>;\n<span class="hljs-keyword">import</span> { adapterFactory } from <span class="hljs-string">\'angular-calendar/date-adapters/date-fns\'</span>;\n<span class="hljs-keyword">import</span> { DemoUtilsModule } from <span class="hljs-string">\'../demo-utils/module\'</span>;\n<span class="hljs-keyword">import</span> { DemoComponent } from <span class="hljs-string">\'./component\'</span>;\n<span class="hljs-keyword">import</span> { DayViewSchedulerComponent } from <span class="hljs-string">\'./day-view-scheduler.component\'</span>;\n\n@NgModule({\n  imports: [\n    CommonModule,\n    CalendarModule.forRoot({\n      provide: DateAdapter,\n      useFactory: adapterFactory\n    }),\n    DemoUtilsModule,\n    RouterModule.forChild([{ path: <span class="hljs-string">\'\'</span>, component: DemoComponent }])\n  ],\n  declarations: [DemoComponent, DayViewSchedulerComponent],\n  exports: [DemoComponent]\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> DemoModule {}\n'},"8MkR":function(s,n){s.exports='<div class="cal-day-view" #dayViewContainer>\n  <div class="day-view-column-headers">\n    <div class="day-view-column-header" *ngFor="let user of view?.users">\n      {{ user.name }}\n    </div>\n  </div>\n  <div\n    class="cal-hour-rows"\n    mwlDroppable\n    (dragEnter)="eventDragEnter = eventDragEnter + 1"\n    (dragLeave)="eventDragEnter = eventDragEnter - 1"\n  >\n    <div class="cal-events">\n      <div\n        #event\n        *ngFor="let dayEvent of view?.events; trackBy:trackByDayEvent"\n        class="cal-event-container"\n        [class.cal-draggable]="dayEvent.event.draggable"\n        [class.cal-starts-within-day]="!dayEvent.startsBeforeDay"\n        [class.cal-ends-within-day]="!dayEvent.endsAfterDay"\n        [ngClass]="dayEvent.event.cssClass"\n        mwlResizable\n        [resizeEdges]="{top: dayEvent.event?.resizable?.beforeStart, bottom: dayEvent.event?.resizable?.afterEnd}"\n        [resizeSnapGrid]="{top: eventSnapSize, bottom: eventSnapSize}"\n        [validateResize]="validateResize"\n        (resizeStart)="resizeStarted(dayEvent, $event, dayViewContainer)"\n        (resizing)="resizing(dayEvent, $event)"\n        (resizeEnd)="resizeEnded(dayEvent)"\n        mwlDraggable\n        [dragAxis]="{x: true, y: dayEvent.event.draggable && currentResizes.size === 0}"\n        [dragSnapGrid]="{y: eventSnapSize || hourSegmentHeight, x: eventWidth}"\n        [validateDrag]="validateDrag"\n        (dragStart)="dragStarted(event, dayViewContainer)"\n        (dragEnd)="eventDragged(dayEvent, $event.x, $event.y)"\n        [style.marginTop.px]="dayEvent.top"\n        [style.height.px]="dayEvent.height"\n        [style.marginLeft.px]="dayEvent.left + 70"\n        [style.width.px]="dayEvent.width - 1">\n        <mwl-calendar-day-view-event\n          [dayEvent]="dayEvent"\n          [tooltipPlacement]="tooltipPlacement"\n          [tooltipTemplate]="tooltipTemplate"\n          [tooltipAppendToBody]="tooltipAppendToBody"\n          [customTemplate]="eventTemplate"\n          [eventTitleTemplate]="eventTitleTemplate"\n          [eventActionsTemplate]="eventActionsTemplate"\n          (eventClicked)="eventClicked.emit({event: dayEvent.event})">\n        </mwl-calendar-day-view-event>\n      </div>\n    </div>\n    <div class="cal-hour" *ngFor="let hour of hours; trackBy:trackByHour" [style.minWidth.px]="view?.width + 70">\n      <mwl-calendar-day-view-hour-segment\n        *ngFor="let segment of hour.segments; trackBy:trackByHourSegment"\n        [style.height.px]="hourSegmentHeight"\n        [segment]="segment"\n        [segmentHeight]="hourSegmentHeight"\n        [locale]="locale"\n        [customTemplate]="hourSegmentTemplate"\n        (mwlClick)="hourSegmentClicked.emit({date: segment.date})"\n        mwlDroppable\n        dragOverClass="cal-drag-over"\n        dragActiveClass="cal-drag-active"\n        (drop)="eventDropped($event, segment.date, false)">\n      </mwl-calendar-day-view-hour-segment>\n    </div>\n  </div>\n</div>\n'},ADG2:function(s,n){s.exports='<span class="hljs-keyword">import</span> { Component, ChangeDetectionStrategy } from <span class="hljs-string">\'@angular/core\'</span>;\n<span class="hljs-keyword">import</span> {\n  CalendarEvent,\n  CalendarEventTimesChangedEvent\n} from <span class="hljs-string">\'angular-calendar\'</span>;\n<span class="hljs-keyword">import</span> { colors } from <span class="hljs-string">\'../demo-utils/colors\'</span>;\n<span class="hljs-keyword">import</span> { addHours, startOfDay } from <span class="hljs-string">\'date-fns\'</span>;\n\n<span class="hljs-keyword">const</span> users = [\n  {\n    id: <span class="hljs-number">0</span>,\n    name: <span class="hljs-string">\'John smith\'</span>,\n    color: colors.yellow\n  },\n  {\n    id: <span class="hljs-number">1</span>,\n    name: <span class="hljs-string">\'Jane Doe\'</span>,\n    color: colors.blue\n  }\n];\n\n@Component({\n  selector: <span class="hljs-string">\'mwl-demo-component\'</span>,\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  templateUrl: <span class="hljs-string">\'template.html\'</span>\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> DemoComponent {\n  viewDate = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();\n\n  events: CalendarEvent[] = [\n    {\n      title: <span class="hljs-string">\'An event\'</span>,\n      color: users[<span class="hljs-number">0</span>].color,\n      start: addHours(startOfDay(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()), <span class="hljs-number">5</span>),\n      meta: {\n        user: users[<span class="hljs-number">0</span>]\n      },\n      resizable: {\n        beforeStart: <span class="hljs-literal">true</span>,\n        afterEnd: <span class="hljs-literal">true</span>\n      },\n      draggable: <span class="hljs-literal">true</span>\n    },\n    {\n      title: <span class="hljs-string">\'Another event\'</span>,\n      color: users[<span class="hljs-number">1</span>].color,\n      start: addHours(startOfDay(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()), <span class="hljs-number">2</span>),\n      meta: {\n        user: users[<span class="hljs-number">1</span>]\n      },\n      resizable: {\n        beforeStart: <span class="hljs-literal">true</span>,\n        afterEnd: <span class="hljs-literal">true</span>\n      },\n      draggable: <span class="hljs-literal">true</span>\n    },\n    {\n      title: <span class="hljs-string">\'An 3rd event\'</span>,\n      color: users[<span class="hljs-number">0</span>].color,\n      start: addHours(startOfDay(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()), <span class="hljs-number">7</span>),\n      meta: {\n        user: users[<span class="hljs-number">0</span>]\n      },\n      resizable: {\n        beforeStart: <span class="hljs-literal">true</span>,\n        afterEnd: <span class="hljs-literal">true</span>\n      },\n      draggable: <span class="hljs-literal">true</span>\n    }\n  ];\n\n  eventTimesChanged({\n    event,\n    newStart,\n    newEnd\n  }: CalendarEventTimesChangedEvent): <span class="hljs-built_in">void</span> {\n    event.start = newStart;\n    event.end = newEnd;\n    <span class="hljs-keyword">this</span>.events = [...this.events];\n  }\n\n  userChanged({ event, newUser }) {\n    event.color = newUser.color;\n    event.meta.user = newUser;\n    <span class="hljs-keyword">this</span>.events = [...this.events];\n  }\n}\n'},FB2l:function(s,n){s.exports='<div class="row">\n  <div class="col-md-6">\n    <div class="btn-group">\n      <div\n        class="btn btn-primary"\n        mwlCalendarPreviousView\n        [view]="\'day\'"\n        [(viewDate)]="viewDate">\n        Previous\n      </div>\n      <div\n        class="btn btn-outline-secondary"\n        mwlCalendarToday\n        [(viewDate)]="viewDate">\n        Today\n      </div>\n      <div\n        class="btn btn-primary"\n        mwlCalendarNextView\n        [view]="\'day\'"\n        [(viewDate)]="viewDate">\n        Next\n      </div>\n    </div>\n  </div>\n  <div class="col-md-6 text-right">\n    <h3>{{ viewDate | calendarDate:(\'dayViewTitle\') }}</h3>\n  </div>\n</div>\n<br>\n\n<mwl-day-view-scheduler\n  [viewDate]="viewDate"\n  [events]="events"\n  (eventTimesChanged)="eventTimesChanged($event)"\n  (userChanged)="userChanged($event)"\n>\n</mwl-day-view-scheduler>\n'},I0LL:function(s,n){s.exports="import { Component, EventEmitter, Injectable, Output } from '@angular/core';\nimport { CalendarDayViewComponent, CalendarUtils } from 'angular-calendar';\nimport { DayView, DayViewEvent, GetDayViewArgs } from 'calendar-utils';\n\nconst EVENT_WIDTH = 150;\n\n// extend the interface to add the array of users\ninterface DayViewScheduler extends DayView {\n  users: any[];\n}\n\n@Injectable()\nexport class DayViewSchedulerCalendarUtils extends CalendarUtils {\n  getDayView(args: GetDayViewArgs): DayViewScheduler {\n    const view: DayViewScheduler = {\n      ...super.getDayView(args),\n      users: []\n    };\n    view.events.forEach(({ event }) => {\n      // assumes user objects are the same references,\n      // if 2 users have the same structure but different object references this will fail\n      if (!view.users.includes(event.meta.user)) {\n        view.users.push(event.meta.user);\n      }\n    });\n    // sort the users by their names\n    view.users.sort((user1, user2) => user1.name.localeCompare(user2.name));\n    view.events = view.events.map(dayViewEvent => {\n      const index = view.users.indexOf(dayViewEvent.event.meta.user);\n      dayViewEvent.left = index * EVENT_WIDTH; // change the column of the event\n      return dayViewEvent;\n    });\n    view.width = view.users.length * EVENT_WIDTH;\n    return view;\n  }\n}\n\n@Component({\n  // tslint:disable-line max-classes-per-file\n  selector: 'mwl-day-view-scheduler',\n  styles: [\n    `\n      .day-view-column-headers {\n        display: flex;\n        margin-left: 70px;\n      }\n      .day-view-column-header {\n        width: 150px;\n        border: solid 1px black;\n        text-align: center;\n      }\n    `\n  ],\n  providers: [\n    {\n      provide: CalendarUtils,\n      useClass: DayViewSchedulerCalendarUtils\n    }\n  ],\n  templateUrl: 'day-view-scheduler.component.html'\n})\nexport class DayViewSchedulerComponent extends CalendarDayViewComponent {\n  view: DayViewScheduler;\n\n  @Output()\n  userChanged = new EventEmitter();\n\n  eventDragged(dayEvent: DayViewEvent, xPixels: number, yPixels: number): void {\n    if (yPixels !== 0) {\n      super.dragEnded(dayEvent, { y: yPixels, x: 0 } as any); // original behaviour\n    }\n    if (xPixels !== 0) {\n      const columnsMoved = xPixels / EVENT_WIDTH;\n      const currentColumnIndex = this.view.users.findIndex(\n        user => user === dayEvent.event.meta.user\n      );\n      const newIndex = currentColumnIndex + columnsMoved;\n      const newUser = this.view.users[newIndex];\n      if (newUser) {\n        this.userChanged.emit({ event: dayEvent.event, newUser });\n      }\n    }\n  }\n}\n"},Nuoy:function(s,n){s.exports="import { Component, ChangeDetectionStrategy } from '@angular/core';\nimport {\n  CalendarEvent,\n  CalendarEventTimesChangedEvent\n} from 'angular-calendar';\nimport { colors } from '../demo-utils/colors';\nimport { addHours, startOfDay } from 'date-fns';\n\nconst users = [\n  {\n    id: 0,\n    name: 'John smith',\n    color: colors.yellow\n  },\n  {\n    id: 1,\n    name: 'Jane Doe',\n    color: colors.blue\n  }\n];\n\n@Component({\n  selector: 'mwl-demo-component',\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  templateUrl: 'template.html'\n})\nexport class DemoComponent {\n  viewDate = new Date();\n\n  events: CalendarEvent[] = [\n    {\n      title: 'An event',\n      color: users[0].color,\n      start: addHours(startOfDay(new Date()), 5),\n      meta: {\n        user: users[0]\n      },\n      resizable: {\n        beforeStart: true,\n        afterEnd: true\n      },\n      draggable: true\n    },\n    {\n      title: 'Another event',\n      color: users[1].color,\n      start: addHours(startOfDay(new Date()), 2),\n      meta: {\n        user: users[1]\n      },\n      resizable: {\n        beforeStart: true,\n        afterEnd: true\n      },\n      draggable: true\n    },\n    {\n      title: 'An 3rd event',\n      color: users[0].color,\n      start: addHours(startOfDay(new Date()), 7),\n      meta: {\n        user: users[0]\n      },\n      resizable: {\n        beforeStart: true,\n        afterEnd: true\n      },\n      draggable: true\n    }\n  ];\n\n  eventTimesChanged({\n    event,\n    newStart,\n    newEnd\n  }: CalendarEventTimesChangedEvent): void {\n    event.start = newStart;\n    event.end = newEnd;\n    this.events = [...this.events];\n  }\n\n  userChanged({ event, newUser }) {\n    event.color = newUser.color;\n    event.meta.user = newUser;\n    this.events = [...this.events];\n  }\n}\n"},"V+2Q":function(s,n){s.exports='<span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"cal-day-view"</span> #<span class="hljs-attribute">dayViewContainer</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"day-view-column-headers"</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"day-view-column-header"</span> *<span class="hljs-attribute">ngFor</span>=<span class="hljs-value">"let user of view?.users"</span>&gt;</span>\n      {{ user.name }}\n    <span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-title">div</span>\n    <span class="hljs-attribute">class</span>=<span class="hljs-value">"cal-hour-rows"</span>\n    <span class="hljs-attribute">mwlDroppable</span>\n    (<span class="hljs-attribute">dragEnter</span>)=<span class="hljs-value">"eventDragEnter = eventDragEnter + 1"</span>\n    (<span class="hljs-attribute">dragLeave</span>)=<span class="hljs-value">"eventDragEnter = eventDragEnter - 1"</span>\n  &gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"cal-events"</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-title">div</span>\n        #<span class="hljs-attribute">event</span>\n        *<span class="hljs-attribute">ngFor</span>=<span class="hljs-value">"let dayEvent of view?.events; trackBy:trackByDayEvent"</span>\n        <span class="hljs-attribute">class</span>=<span class="hljs-value">"cal-event-container"</span>\n        [<span class="hljs-attribute">class.cal-draggable</span>]=<span class="hljs-value">"dayEvent.event.draggable"</span>\n        [<span class="hljs-attribute">class.cal-starts-within-day</span>]=<span class="hljs-value">"!dayEvent.startsBeforeDay"</span>\n        [<span class="hljs-attribute">class.cal-ends-within-day</span>]=<span class="hljs-value">"!dayEvent.endsAfterDay"</span>\n        [<span class="hljs-attribute">ngClass</span>]=<span class="hljs-value">"dayEvent.event.cssClass"</span>\n        <span class="hljs-attribute">mwlResizable</span>\n        [<span class="hljs-attribute">resizeEdges</span>]=<span class="hljs-value">"{top: dayEvent.event?.resizable?.beforeStart, bottom: dayEvent.event?.resizable?.afterEnd}"</span>\n        [<span class="hljs-attribute">resizeSnapGrid</span>]=<span class="hljs-value">"{top: eventSnapSize, bottom: eventSnapSize}"</span>\n        [<span class="hljs-attribute">validateResize</span>]=<span class="hljs-value">"validateResize"</span>\n        (<span class="hljs-attribute">resizeStart</span>)=<span class="hljs-value">"resizeStarted(dayEvent, $event, dayViewContainer)"</span>\n        (<span class="hljs-attribute">resizing</span>)=<span class="hljs-value">"resizing(dayEvent, $event)"</span>\n        (<span class="hljs-attribute">resizeEnd</span>)=<span class="hljs-value">"resizeEnded(dayEvent)"</span>\n        <span class="hljs-attribute">mwlDraggable</span>\n        [<span class="hljs-attribute">dragAxis</span>]=<span class="hljs-value">"{x: true, y: dayEvent.event.draggable &amp;&amp; currentResizes.size === 0}"</span>\n        [<span class="hljs-attribute">dragSnapGrid</span>]=<span class="hljs-value">"{y: eventSnapSize || hourSegmentHeight, x: eventWidth}"</span>\n        [<span class="hljs-attribute">validateDrag</span>]=<span class="hljs-value">"validateDrag"</span>\n        (<span class="hljs-attribute">dragStart</span>)=<span class="hljs-value">"dragStarted(event, dayViewContainer)"</span>\n        (<span class="hljs-attribute">dragEnd</span>)=<span class="hljs-value">"eventDragged(dayEvent, $event.x, $event.y)"</span>\n        [<span class="hljs-attribute">style.marginTop.px</span>]=<span class="hljs-value">"dayEvent.top"</span>\n        [<span class="hljs-attribute">style.height.px</span>]=<span class="hljs-value">"dayEvent.height"</span>\n        [<span class="hljs-attribute">style.marginLeft.px</span>]=<span class="hljs-value">"dayEvent.left + 70"</span>\n        [<span class="hljs-attribute">style.width.px</span>]=<span class="hljs-value">"dayEvent.width - 1"</span>&gt;</span>\n        <span class="hljs-tag">&lt;<span class="hljs-title">mwl-calendar-day-view-event</span>\n          [<span class="hljs-attribute">dayEvent</span>]=<span class="hljs-value">"dayEvent"</span>\n          [<span class="hljs-attribute">tooltipPlacement</span>]=<span class="hljs-value">"tooltipPlacement"</span>\n          [<span class="hljs-attribute">tooltipTemplate</span>]=<span class="hljs-value">"tooltipTemplate"</span>\n          [<span class="hljs-attribute">tooltipAppendToBody</span>]=<span class="hljs-value">"tooltipAppendToBody"</span>\n          [<span class="hljs-attribute">customTemplate</span>]=<span class="hljs-value">"eventTemplate"</span>\n          [<span class="hljs-attribute">eventTitleTemplate</span>]=<span class="hljs-value">"eventTitleTemplate"</span>\n          [<span class="hljs-attribute">eventActionsTemplate</span>]=<span class="hljs-value">"eventActionsTemplate"</span>\n          (<span class="hljs-attribute">eventClicked</span>)=<span class="hljs-value">"eventClicked.emit({event: dayEvent.event})"</span>&gt;</span>\n        <span class="hljs-tag">&lt;/<span class="hljs-title">mwl-calendar-day-view-event</span>&gt;</span>\n      <span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>\n    <span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"cal-hour"</span> *<span class="hljs-attribute">ngFor</span>=<span class="hljs-value">"let hour of hours; trackBy:trackByHour"</span> [<span class="hljs-attribute">style.minWidth.px</span>]=<span class="hljs-value">"view?.width + 70"</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-title">mwl-calendar-day-view-hour-segment</span>\n        *<span class="hljs-attribute">ngFor</span>=<span class="hljs-value">"let segment of hour.segments; trackBy:trackByHourSegment"</span>\n        [<span class="hljs-attribute">style.height.px</span>]=<span class="hljs-value">"hourSegmentHeight"</span>\n        [<span class="hljs-attribute">segment</span>]=<span class="hljs-value">"segment"</span>\n        [<span class="hljs-attribute">segmentHeight</span>]=<span class="hljs-value">"hourSegmentHeight"</span>\n        [<span class="hljs-attribute">locale</span>]=<span class="hljs-value">"locale"</span>\n        [<span class="hljs-attribute">customTemplate</span>]=<span class="hljs-value">"hourSegmentTemplate"</span>\n        (<span class="hljs-attribute">mwlClick</span>)=<span class="hljs-value">"hourSegmentClicked.emit({date: segment.date})"</span>\n        <span class="hljs-attribute">mwlDroppable</span>\n        <span class="hljs-attribute">dragOverClass</span>=<span class="hljs-value">"cal-drag-over"</span>\n        <span class="hljs-attribute">dragActiveClass</span>=<span class="hljs-value">"cal-drag-active"</span>\n        (<span class="hljs-attribute">drop</span>)=<span class="hljs-value">"eventDropped($event, segment.date, false)"</span>&gt;</span>\n      <span class="hljs-tag">&lt;/<span class="hljs-title">mwl-calendar-day-view-hour-segment</span>&gt;</span>\n    <span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>\n'},qXoR:function(s,n,a){"use strict";a.r(n),a.d(n,"sources",function(){return e});var e=[{filename:"component.ts",contents:{raw:a("Nuoy"),highlighted:a("ADG2")}},{filename:"template.html",contents:{raw:a("FB2l"),highlighted:a("yw7G")}},{filename:"day-view-scheduler.component.ts",contents:{raw:a("I0LL"),highlighted:a("2SfW")}},{filename:"day-view-scheduler.component.html",contents:{raw:a("8MkR"),highlighted:a("V+2Q")}},{filename:"module.ts",contents:{raw:a("tj+w"),highlighted:a("6nCy")}}]},"tj+w":function(s,n){s.exports="import { NgModule } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { RouterModule } from '@angular/router';\nimport { CalendarModule, DateAdapter } from 'angular-calendar';\nimport { adapterFactory } from 'angular-calendar/date-adapters/date-fns';\nimport { DemoUtilsModule } from '../demo-utils/module';\nimport { DemoComponent } from './component';\nimport { DayViewSchedulerComponent } from './day-view-scheduler.component';\n\n@NgModule({\n  imports: [\n    CommonModule,\n    CalendarModule.forRoot({\n      provide: DateAdapter,\n      useFactory: adapterFactory\n    }),\n    DemoUtilsModule,\n    RouterModule.forChild([{ path: '', component: DemoComponent }])\n  ],\n  declarations: [DemoComponent, DayViewSchedulerComponent],\n  exports: [DemoComponent]\n})\nexport class DemoModule {}\n"},yw7G:function(s,n){s.exports='<span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"row"</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"col-md-6"</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"btn-group"</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-title">div</span>\n        <span class="hljs-attribute">class</span>=<span class="hljs-value">"btn btn-primary"</span>\n        <span class="hljs-attribute">mwlCalendarPreviousView</span>\n        [<span class="hljs-attribute">view</span>]=<span class="hljs-value">"\'day\'"</span>\n        [(<span class="hljs-attribute">viewDate</span>)]=<span class="hljs-value">"viewDate"</span>&gt;</span>\n        Previous\n      <span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-title">div</span>\n        <span class="hljs-attribute">class</span>=<span class="hljs-value">"btn btn-outline-secondary"</span>\n        <span class="hljs-attribute">mwlCalendarToday</span>\n        [(<span class="hljs-attribute">viewDate</span>)]=<span class="hljs-value">"viewDate"</span>&gt;</span>\n        Today\n      <span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-title">div</span>\n        <span class="hljs-attribute">class</span>=<span class="hljs-value">"btn btn-primary"</span>\n        <span class="hljs-attribute">mwlCalendarNextView</span>\n        [<span class="hljs-attribute">view</span>]=<span class="hljs-value">"\'day\'"</span>\n        [(<span class="hljs-attribute">viewDate</span>)]=<span class="hljs-value">"viewDate"</span>&gt;</span>\n        Next\n      <span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>\n    <span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"col-md-6 text-right"</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-title">h3</span>&gt;</span>{{ viewDate | calendarDate:(\'dayViewTitle\') }}<span class="hljs-tag">&lt;/<span class="hljs-title">h3</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-title">br</span>&gt;</span>\n\n<span class="hljs-tag">&lt;<span class="hljs-title">mwl-day-view-scheduler</span>\n  [<span class="hljs-attribute">viewDate</span>]=<span class="hljs-value">"viewDate"</span>\n  [<span class="hljs-attribute">events</span>]=<span class="hljs-value">"events"</span>\n  (<span class="hljs-attribute">eventTimesChanged</span>)=<span class="hljs-value">"eventTimesChanged($event)"</span>\n  (<span class="hljs-attribute">userChanged</span>)=<span class="hljs-value">"userChanged($event)"</span>\n&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-title">mwl-day-view-scheduler</span>&gt;</span>\n'}}]);