import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {MatTableDataSource} from '@angular/material/table';
import {SupplementaryAccount} from '../models/supplementary-account';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmResetAccountComponent} from '../confirm-reset-account/confirm-reset-account.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss'],
})
export class AccountManagementComponent implements OnInit {
  accountDataSource: MatTableDataSource<SupplementaryAccount> = new MatTableDataSource<SupplementaryAccount>();
  displayColumns = ['position', 'username', 'role', 'actions'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator

  constructor(private dialog: MatDialog,
              private accountService: AccountService,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this._fetchAccount()
  }

  _fetchAccount() {
    this.accountService.getSupplementaryAccount().subscribe(value => {
      console.log(value);
      this.accountDataSource.data = value
      this.accountDataSource.paginator = this.paginator;
    })
  }

  openConfirmResetAccountDialog(account: SupplementaryAccount) {
    this.dialog.open(ConfirmResetAccountComponent, {
      data: account,
      width: '400px',
    }).afterClosed().subscribe(message => {
        if (message == 'refresh') {
          this._fetchAccount()
          this.snackbar.open('Khôi phục thành công', '', {
            panelClass: 'green-snackbar',
          })
        }
      },
    );
  }
}
