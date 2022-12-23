import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route} from "@angular/router";
import {parallel} from "@angular/cdk/testing";

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit{

  theBestWorkerLikes:any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void{
    this.route.queryParams.subscribe(parameter => {
      this.theBestWorkerLikes = parameter;
      // this.theBestWorkerLikes = Object.values(this.theBestWorkerLikes);
      console.log(this.theBestWorkerLikes.name);
      console.log(this.theBestWorkerLikes.lastname);
      console.log(this.theBestWorkerLikes);
    })
  }


}
