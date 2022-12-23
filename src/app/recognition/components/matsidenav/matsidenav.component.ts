import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-matsidenav',
  templateUrl: './matsidenav.component.html',
  styleUrls: ['./matsidenav.component.css']
})
export class MatsidenavComponent {
  // opened = false;

  // @Output() open = new EventEmitter();
  @Input() opened: boolean = false;


  //
  // xd():void{
  //   this.open.emit(this.opened=!this.opened);
  // }
}
