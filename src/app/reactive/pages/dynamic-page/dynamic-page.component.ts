import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  //FORMULARIO
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Assasins', Validators.required],
    ])
  });

  public newFavorite: FormControl = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder) { }

  //PARA EL NG FOR
  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  //METODO PARA VALIDAR CAMPOS
  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
  }


  getFieldError(field: string): string | null {

    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {

      switch (key) {
        case 'required':
          return `El campo ${field} es requerido`;

        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres.`
      }

    }

    return null;

  }


  onAddToFavorites(): void {

    if (this.newFavorite.invalid) return;
    console.log(this.newFavorite.value);

  }

  onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }


  onSubmit(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    
    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();


  }


}
