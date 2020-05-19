import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'startpage', loadChildren: () => import('./modules/startpage/startpage.module').then(m => m.StartpageModule) },
  { path: '', pathMatch: 'full', loadChildren: () => import('./modules/startpage/startpage.module').then(m => m.StartpageModule) },
  { path: 'editor', loadChildren: () => import('./modules/editor/editor.module').then(m => m.EditorModule) },
  { path: 'play', loadChildren: () => import('./modules/play/play.module').then(m => m.PlayModule) },
  { path: 'library', loadChildren: () => import('./modules/library/library.module').then(m => m.LibraryModule) },
  { path: 'store', loadChildren: () => import('./modules/store/store.module').then(m => m.StoreModule) },
  { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
