import { AppRoutingRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';

import { AppComponent } from './app.component';

// import our custom module, library created using this article
// https://medium.com/@ngl817/building-an-angular-4-component-library-with-the-angular-cli-and-ng-packagr-53b2ade0701e
import { AngularMarkdownEditorModule } from '../lib/angular-markdown-editor/angular-markdown-editor.module';
import { ReactiveComponent } from './reactive/reactive.component';
import { TemplateComponent } from './template/template.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveComponent,
    TemplateComponent
  ],
  imports: [
    AppRoutingRoutingModule,
    BrowserModule,
    FormsModule,
    MarkdownModule.forRoot({
      provide: MarkedOptions,
      useFactory: (): MarkedOptions => {
        return {
          renderer: new MarkedRenderer(),
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        };
      },
    }),
    ReactiveFormsModule,
    AngularMarkdownEditorModule.forRoot({
      // add any Global Options/Config you might want
      // to avoid passing the same options over and over in each components of your App
      iconlibrary: 'glyph'
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
