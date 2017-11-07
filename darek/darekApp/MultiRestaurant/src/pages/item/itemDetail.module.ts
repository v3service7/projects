import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetailPage } from './itemDetail';

@NgModule({
	declarations: [
		ItemDetailPage
	],
	imports: [
		IonicPageModule.forChild(ItemDetailPage),
	],
})
export class ItemDetailPageModule {}
