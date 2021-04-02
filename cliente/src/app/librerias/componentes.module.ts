import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgLibModule } from './prime-ng-lib.module';
import { AppbarComponent } from 'src/app/components/appbar/appbar.component';
import { FooterComponent } from 'src/app/components//footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuLateralComponent } from 'src/app/components//menu-lateral/menu-lateral.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';



@NgModule({
  declarations: [
    AppbarComponent,
    FooterComponent,
    MenuLateralComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    PrimeNgLibModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AppbarComponent,
    FooterComponent,
    FormsModule,
    SpinnerComponent,
    ReactiveFormsModule,
    MenuLateralComponent
  ]
})
export class ComponentesModule { }
