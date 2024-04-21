import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommanService, formInterFace } from '../comman.service';

@Component({
  selector: 'crud-app',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class AddComponent implements OnInit {
  addDataForm!: FormGroup;
  AllData: formInterFace[] = [];
  isUpdateData = false;
  IdForUpdate!: string;

  constructor(private fb: FormBuilder, private commanService: CommanService) { }

  ngOnInit(): void {
    this.initForm();
    this.getData();
  }

  initForm(): void {
    this.addDataForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  getData() {
    this.commanService.getData().subscribe((res) => {
      this.AllData = res;
      this.addDataForm.reset();
    })
  }

  addData() {
    const payload: formInterFace = {
      firstName: this.addDataForm?.value.firstName,
      lastName: this.addDataForm?.value.lastName,
      email: this.addDataForm?.value.email
    }
    if (this.isUpdateData) {
      this.commanService.updateDataById(this.IdForUpdate, payload).subscribe((res) => {
        this.getData();
        this.isUpdateData = false;
      })
    } else {
      this.commanService.postData(payload).subscribe(() => {
        this.getData();
      })
    }
  }

  deleteData(id: string | undefined) {
    id && this.commanService.deleteData(id).subscribe(() => {
      this.getData();
    })
  }

  getDataById(id: string | undefined) {
    id && this.commanService.getDataById(id).subscribe((res: formInterFace) => {
      this.addDataForm.patchValue(res);
      this.isUpdateData = true;
      if(res.id){
        this.IdForUpdate = res.id;
      }
    })
  }
}
