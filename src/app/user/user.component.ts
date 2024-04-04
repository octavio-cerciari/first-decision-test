import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserInterface } from 'src/core/models/user.interface';
import { UserModalComponent } from './user-modal/user-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserFilterStatusEnum } from 'src/core/enums/user-status.enum';

const ELEMENT_DATA: UserInterface[] = [
  { name: 'Octavio', lastName: 'Cerciari', phone: '16997966653', email: 'octavio.cerciari@gmail.com', status: 'Ativo', language: 'Português BR', profile: 'Desenvolvedor', preferredContact: 'Todos', createdDate: '10/10/2020', lastAccess: '10/10/2020 às 13:00h' },
  { name: 'Nathalia', lastName: 'Cerciari', phone: '16997966653', email: 'nathalia.cerciari@gmail.com', status: 'Pendente', language: 'Inglês EN', profile: 'Gerente', preferredContact: 'Telefone', createdDate: '10/10/2021', lastAccess: '10/10/2021 às 11:00h' },
  { name: 'Nathan', lastName: 'Cerciari', phone: '16997966653', email: 'nathan.cerciari@gmail.com', status: 'Ativo', language: 'Português BR', profile: 'Suporte', preferredContact: 'E-mail', createdDate: '10/10/2022', lastAccess: '10/10/2022 às 17:00h' },
  { name: 'Fernando', lastName: 'Cerciari', phone: '16997966653', email: 'fernando.cerciari@gmail.com', status: 'Bloqueado', language: 'Espanhol ES', profile: 'Analista', preferredContact: 'Todos', createdDate: '10/10/2023', lastAccess: '10/10/2023 às 10:00h' },
] as UserInterface[];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit, AfterViewInit {
  modalDialog: MatDialogRef<UserModalComponent> | any;
  userFilterStatusEnum = UserFilterStatusEnum;
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
      if (filter === UserFilterStatusEnum.TODOS) {
        return data.status.toLowerCase().includes('');;
      }
      else if (filter === UserFilterStatusEnum.ATIVO || filter === UserFilterStatusEnum.PENDENTE || filter === UserFilterStatusEnum.BLOQUEADO) {
        return data.status.toLowerCase().includes(filter.toLowerCase());
      }
      else {
        return data.name.toLowerCase().includes(filter.toLowerCase()) || data.email.toLowerCase().includes(filter.toLowerCase());
      }
     };
   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  searchInput(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value;
  }

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  filter(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value;
  }

  openUserModal(index: number, element?: UserInterface) {
    this.modalDialog = this.matDialog.open( UserModalComponent, {
      data: element,
      panelClass: 'user-modal'
    } )

    this.modalDialog.afterClosed().subscribe( ( result: any ) => {
      // TODO Chamada Salvar Banco de Dados
      if (result && result.newInvite) { ELEMENT_DATA.push(result.user); this.dataSource = new MatTableDataSource(ELEMENT_DATA); };

      // TODO Chamada Editar Banco de Dados
      if (result && !result.newInvite) {
        ELEMENT_DATA[index] = result.user; 
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
       };
    } );
  }
}
