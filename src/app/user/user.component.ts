import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserInterface } from 'src/core/models/user.interface';
import { UserModalComponent } from './user-modal/user-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

const ELEMENT_DATA: UserInterface[] = [
  { name: 'Octavio', lastName: 'Cerciari', phone: '16997966653', email: 'octavio.cerciari@gmail.com', status: 'Ativo', language: 'Português BR', createdDate: '10/10/2020', lastAccess: '10/10/2020 às 13:00h' },
  { name: 'Nathalia', lastName: 'Cerciari', phone: '16997966653', email: 'nathalia.cerciari@gmail.com', status: 'Pendente', language: 'Inglês EN', createdDate: '10/10/2021', lastAccess: '10/10/2021 às 11:00h' },
  { name: 'Nathan', lastName: 'Cerciari', phone: '16997966653', email: 'nathan.cerciari@gmail.com', status: 'Ativo', language: 'Português BR', createdDate: '10/10/2022', lastAccess: '10/10/2022 às 17:00h' },
  { name: 'Fernando', lastName: 'Cerciari', phone: '16997966653', email: 'fernando.cerciari@gmail.com', status: 'Bloqueado', language: 'Espanhol ES', createdDate: '10/10/2023', lastAccess: '10/10/2023 às 10:00h' },
] as UserInterface[];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {
  modalDialog: MatDialogRef<UserModalComponent> | any;
  constructor(
    private _liveAnnouncer: LiveAnnouncer, 
    public matDialog: MatDialog,
    
    ) {
    
  }

  displayedColumns: string[] = ['picture', 'name', 'status', 'createdDate', 'lastAccess', 'options'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngOnInit() {
    this.dataSource.filterPredicate = (data: UserInterface, filter: string) => {
      return data.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || data.email.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
     };
   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  searchInput(filterValue: any) {
    console.log(filterValue.target.value)
    this.dataSource.filter = filterValue.target.value;
  }

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openUserModal(element?: UserInterface) {
    this.modalDialog = this.matDialog.open( UserModalComponent, {
      data: element || null,
      panelClass: 'user-modal'
    } )
    this.modalDialog.afterClosed().subscribe( ( result: any ) => {
      console.log(result);
    } );
  }
}
