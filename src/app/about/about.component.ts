import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  concat,
  fromEvent,
  interval,
  noop,
  observable,
  Observable,
  of,
  timer,
  merge,
  Subject,
  BehaviorSubject,
  AsyncSubject,
  ReplaySubject,
} from "rxjs";
import { delayWhen, filter, map, take, timeout } from "rxjs/operators";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  ngOnInit() {
    const subject = new ReplaySubject();
    //waits for a observbale complettion before emitting any values

    const series$ = subject.asObservable();

    series$.subscribe((val) => console.log("early sub: ", val));
    //logs 3. Logs nothing if subject is not completed

    subject.next(1);
    subject.next(2);
    subject.next(3);

    subject.complete();

    setTimeout(() => {
      series$.subscribe((val) => console.log("late sub: ", val));
      //Will also log 3
    }, 3000);
  }
}
