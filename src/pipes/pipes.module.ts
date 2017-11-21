import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize/capitalize';
import { SanitizerPipe } from './sanitizer/sanitizer';
@NgModule({
	declarations: [CapitalizePipe,
    SanitizerPipe],
	imports: [],
	exports: [CapitalizePipe,
    SanitizerPipe]
})
export class PipesModule {}
