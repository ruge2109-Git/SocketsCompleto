import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {PanelMenuModule} from 'primeng/panelmenu';
import {SidebarModule} from 'primeng/sidebar';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {RippleModule} from 'primeng/ripple';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService} from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ToolbarModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    PanelMenuModule,
    SidebarModule,
    TableModule,
    TooltipModule,
    ToastModule,
    RippleModule,
    ConfirmPopupModule,
    DropdownModule
  ],
  exports: [
    ToolbarModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    PanelMenuModule,
    SidebarModule,
    TableModule,
    TooltipModule,
    ToastModule,
    RippleModule,
    ConfirmPopupModule,
    DropdownModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class PrimeNgLibModule { }
