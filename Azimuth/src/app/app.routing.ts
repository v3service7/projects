import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';

import { SettingHeaderComponent } from './setting-header/setting-header.component'

const appRoutes: Routes =   [
	{ path: '', component: HeaderComponent },
	{ path: 'setting-page', component: SettingHeaderComponent }
	];


export const routing = RouterModule.forRoot(appRoutes);