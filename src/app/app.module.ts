import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableComponent } from './shared/components/table/table.component';
import { TableRowComponent } from './shared/components/table-row/table-row.component';
import { DeleteButtonComponent } from './shared/components/delete-button/delete-button.component';
import { FavoriteCheckboxComponent } from './shared/components/favorite-checkbox/favorite-checkbox.component';
import { TableHeaderComponent } from './shared/components/table-header/table-header.component';
import { ContentPageComponent } from './shared/components/content-page/content-page.component';
import { CreateRecordFormComponent } from './shared/components/create-record-form/create-record-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TableRowComponent,
    DeleteButtonComponent,
    FavoriteCheckboxComponent,
    TableHeaderComponent,
    ContentPageComponent,
    CreateRecordFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
