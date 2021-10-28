import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Title} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {CheckingDetailComponent} from "../checking-detail/checking-detail.component";
import {Options} from "@angular-slider/ngx-slider";

export interface PeriodicElement {
  name: string;
  position: number;
  time: Date;
  status: string;
  degree: number
  imageUrl: string
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'time', 'degree', 'status', 'image'];
  ELEMENT_DATA: PeriodicElement[] = [
    {
      position: 1,
      name: 'Nhan Tran',
      time: this.generateRandomDate(),
      status: 'Accept',
      degree: 35.5,
      imageUrl: 'https://www.pyimagesearch.com/wp-content/uploads/2020/05/face_mask_detection_featured.jpg'
    },
    {
      position: 2,
      name: 'Nhan Tran',
      time: this.generateRandomDate(),
      status: 'Accept',
      degree: 35.5,
      imageUrl: 'https://www.pyimagesearch.com/wp-content/uploads/2020/05/face_mask_detection_featured.jpg'
    },
    {
      position: 3,
      name: 'Nhan Tran',
      time: this.generateRandomDate(),
      status: 'Accept',
      degree: 35.5,
      imageUrl: 'https://www.pyimagesearch.com/wp-content/uploads/2020/05/face_mask_detection_featured.jpg'
    },
    {
      position: 4,
      name: 'Nhan Tran',
      time: this.generateRandomDate(),
      status: 'Accept',
      degree: 35.5,
      imageUrl: 'https://www.pyimagesearch.com/wp-content/uploads/2020/05/face_mask_detection_featured.jpg'
    },
  ];
  dataSource = this.ELEMENT_DATA;

  statusList = [
    "Accept",
    "Denied",
  ]

  sliderOption: Options = {
    floor: 30,
    ceil: 45,
  }

  constructor(private dialog: MatDialog, private snackbar: MatSnackBar, private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle("Dashboard")
  }

  generateRandomDate() {
    return new Date();
  }

  openDialog() {
    this.dialog.open(CheckingDetailComponent, {
      width: '600px',
      height: '600px',
    })
  }
}
