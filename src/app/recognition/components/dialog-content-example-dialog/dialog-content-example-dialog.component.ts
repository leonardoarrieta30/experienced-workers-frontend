import {Component, ViewChild} from '@angular/core';
import {Worker} from "../../model/worker";
import {NgForm} from "@angular/forms";
import {WorkersService} from "../../services/workers.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import * as _ from 'lodash';

@Component({
  selector: 'app-dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.component.html',
  styleUrls: ['./dialog-content-example-dialog.component.css']
})
export class DialogContentExampleDialogComponent {
  WorkerData: Worker;

  data: any;

  isEditMode = false;

  @ViewChild('workerForm', {static: false})
  WorkerForm!: NgForm;


  constructor(private workersService: WorkersService,public dialogRef: MatDialogRef<DialogContentExampleDialogComponent>) {
    this.WorkerData = {} as Worker;
  }

  addWorker(){
    this.WorkerData.id=0
    this.workersService.create(this.WorkerData).subscribe((response: any) => {
      this.data.push({...response});
      this.data = this.data.map((o:any) => { return o });
    });
  }
  deleteItem(id:number){
    // this.openDialogDelete('3000ms', '1500ms');
    // this.showDialog = !this.showDialog;
    this.workersService.delete(id).subscribe(() =>{
      this.data = this.data.filter((o: Worker) => {return o.id !== id? o : false;});
    });
    console.log(this.data);
    // alert(`Deleted Data with id ${id}`);
  }
  updateWorker(){
    this.workersService.update(this.WorkerData.id, this.WorkerData).subscribe((response: any) => {
      this.data = this.data.map((o:Worker) => {
        if(o.id === response.id){
          o = response;
        }
        return o;
      })
    });
  }
  editItem(element: Worker) {
    this.WorkerData = _.cloneDeep(element);
    this.isEditMode = true;
  }
  cancelEdit(){
    this.isEditMode = false;
    this.WorkerForm.resetForm();
  }

  onSubmit() {
    if (this.WorkerForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log('about to update');
        this.updateWorker();
      } else {
        console.log('about to add');
        this.addWorker();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }
}
