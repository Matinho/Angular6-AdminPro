import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  canActivate(): Promise<boolean> | boolean {

    const token = this._usuarioService.token;
    const payload = JSON.parse( atob( token.split( '.' )[1] ));
    const expirado = this.expirado( payload.exp );

    // si el token esta expirado lo saco al login
    if ( expirado ) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaRenovacion( payload.exp );
  }

  verificaRenovacion( fechaExp: number ): Promise<boolean> {
    return new Promise( (resolve, reject ) => {

      const tokenExp = new Date( fechaExp * 1000 );
      const ahora = new Date();

      ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000 ) );

      if ( tokenExp.getTime() > ahora.getTime() ) {

        resolve( true );

      } else {

        this._usuarioService.renuevaToken()
              .subscribe( () => {
                resolve( true ); // actualizo el token
              }, () => {
                this.router.navigate(['/login']); // si hubo error al renovar el token lo saco al login
                reject( false ); // hubo un problema y no pude actualizar el token
              });

      }

    });
  }

  expirado( fechaExp: number ) {

    const ahora = new Date().getTime() / 1000; // getTime viene en segundos pero lo necesito en milisegundos

    if ( fechaExp < ahora ) {
      return true; // expiró el token
    } else {
      return false; // no expiró el token
    }

  }
}
