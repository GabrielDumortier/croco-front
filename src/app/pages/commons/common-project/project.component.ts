import { Component, OnInit, Output, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Project } from 'src/app/models/projects.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProjectDetailsComponent } from '../../project-details/project-details.component';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  isSelected: boolean = false;

  favNotSelected = '../../../../assets/img/icons/favorite-notSelected.svg';
  favSelected = '../../../../assets/img/icons/favorite-selected.svg';

  projects: Project[];
  project: Project;
  status: string;
  user_id = "5da98631e2dcd109d6ab35db";
  user;

  @Input() project_id: string;

  toggleIsSelected(){
    event.stopPropagation();
    this.isSelected = !this.isSelected;

    this.user.projects.filter(project => {
      if (project._id === this.project._id) project.favorite = this.isSelected
    })
    this._dataService.putUser(this.user).subscribe(data=>data)
    //console.log(this.user)

  }

  hello(){
    alert("Hello");
  }

  constructor(
    private _dataService: DataService,
    private dialog : MatDialog
    ) { }

  openPopup(){
    event.stopPropagation();
    const dialogRef = this.dialog.open(ProjectDetailsComponent,{
      width : '1000px',
      data : {
        project_id : this.project_id
      }
    });
    dialogRef.afterClosed().subscribe(result =>{
      console.log('popup closed');
    })
  }

  ngOnInit() {
    this._dataService
      .getProjectById(this.project_id)
      .subscribe((data: Project) => {
        this.project = data['projects'];
        //console.log(this.project.color);
        this._dataService.getUserById(this.user_id).subscribe(data => {
          this.user = data['users']
          this.user.projects.filter(project => {
            if (project._id === this.project._id) this.isSelected = project.favorite || false
          })
        })
      })
    
  }

}
