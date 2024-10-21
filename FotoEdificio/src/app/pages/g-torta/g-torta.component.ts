import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { IonModal } from '@ionic/angular';
import { Chart } from 'chart.js/auto';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Foto } from 'src/app/classes/user/foto';
import { TipoCosa } from 'src/app/enums/tipoCosa';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { FotosService } from 'src/app/services/fotos.service';

@Component({
  selector: 'app-g-torta',
  templateUrl: './g-torta.component.html',
  styleUrls: ['./g-torta.component.scss'],
})
export class GTortaComponent implements OnInit, OnDestroy {

  public chart: any;
  fotos: Foto[] = [];
  fotosSub!: Subscription;
  elementoSeleccionado!: Foto;

  @ViewChild('openModalButton', { read: ElementRef }) openModalButton!: ElementRef;
  @ViewChild('modal') modal!: IonModal;

  constructor(private fotosService: FotosService, private auth: AuthFirebaseService, 
    private router: Router) {
    console.log('Constructor: Inicializando el componente');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy: Cancelando la suscripción a fotos');
    this.fotosSub?.unsubscribe();
  }

  ngOnInit() {
    console.log('ngOnInit: El componente GTortaComponent se ha inicializado');
    this.traerObjetos();
  }

  traerObjetos() {
    console.log('traerObjetos: Solicitando fotos desde el servicio');
    this.fotosSub = this.fotosService.getFotos(TipoCosa.Linda).subscribe(
      (informacion) => {
        console.log('traerObjetos: Fotos recibidas', informacion);
        this.fotos = informacion;
        this.createChart();
      },
      (error) => {
        console.error('traerObjetos: Error al obtener fotos', error);
      }
    );
  }

  mostrarFecha(fecha: Timestamp) {
    console.log('mostrarFecha: Convirtiendo Timestamp a fecha legible', fecha);
    return fecha.toDate().toLocaleString();
  }

  createChart() {
    console.log('createChart: Creando o actualizando el gráfico');

    try {
      if (this.chart) {
        console.log('createChart: Destruyendo el gráfico anterior');
        this.chart.destroy();
      }

      let labels: Array<string> = [];
      let data: Array<number> = [];

      console.log('createChart: Procesando fotos para construir etiquetas y datos');
      this.fotos.forEach((element) => {
        if (element.votos.length !== 0) {
          console.log('createChart: Foto con votos encontrada', element);
          labels.push(element.email + ' - ' + this.mostrarFecha(element.fecha));

          let likes = element.votos.filter((v) => v.tipo === 'up').length;
          let dislikes = element.votos.filter((v) => v.tipo === 'down').length;

          console.log('createChart: Cantidad de likes:', likes, 'Cantidad de dislikes:', dislikes);
          data.push(likes + dislikes);
        } else {
          console.log('createChart: Foto sin votos omitida', element);
        }
      });

      Chart.defaults.font.size = 16;

      this.chart = new Chart('MyChart', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Votos',
              data: data,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
            },
            tooltip: {
              enabled: true,
              position: 'nearest',
            },
          },
          onClick: (event, elements) => {
            console.log('createChart: Clic en el gráfico detectado', elements);
            if (elements && elements.length > 0) {
              this.onClickBarChart(elements[0].index);
            }
          },
        },
      });

      console.log('createChart: Gráfico creado con éxito');
    } catch (error) {
      console.error('createChart: Error al crear el gráfico', error);
    }
  }

  onClickBarChart(index: number) {
    console.log('onClickBarChart: Clic en el gráfico, índice seleccionado:', index);

    try {
      this.elementoSeleccionado = this.fotos[index];
      console.log('onClickBarChart: Elemento seleccionado', this.elementoSeleccionado);

      this.modal.present().then(() => {
        console.log('onClickBarChart: Modal abierto con éxito');
      }).catch((error) => {
        console.error('onClickBarChart: Error al abrir el modal', error);
      });
    } catch (error) {
      console.error('onClickBarChart: Error al procesar clic en el gráfico', error);
    }
  }

  votar(foto: Foto, tipo: 'up' | 'down') {
    console.log('votar: Procesando voto para la foto', foto, 'Tipo de voto:', tipo);

    try {
      if (!this.getVoto(foto)) {
        console.log('votar: No hay voto previo, añadiendo voto nuevo');
        this.fotosService.addVoto(foto, this.auth.userLogged.email, tipo);
      } else {
        if (!this.getVotoTipo(foto, tipo)) {
          console.log('votar: Se detectó un cambio en el tipo de voto, eliminando voto anterior');
          this.fotosService.deleteVoto(foto, this.auth.userLogged.email);
        } else {
          console.log('votar: Revirtiendo voto existente');
          this.fotosService.revertirVoto(foto, this.auth.userLogged.email);
        }
      }
    } catch (error) {
      console.error('votar: Error al procesar el voto', error);
    }
  }

  votoArriba(foto: Foto) {
    console.log('votoArriba: Procesando voto arriba para la foto', foto);
    this.votar(foto, 'up');
  }

  votoAbajo(foto: Foto) {
    console.log('votoAbajo: Procesando voto abajo para la foto', foto);
    this.votar(foto, 'down');
  }

  getVotoTipo(foto: Foto, tipo: 'up' | 'down') {
    console.log('getVotoTipo: Verificando si existe un voto del tipo', tipo, 'para la foto', foto);
    return foto.votos.some(voto => voto.email === this.auth.userLogged.email && voto.tipo === tipo);
  }

  getVoto(foto: Foto) {
    console.log('getVoto: Verificando si el usuario ha votado en la foto', foto);
    return foto.votos.some(voto => voto.email === this.auth.userLogged.email);
  }

  getCantidadVotos(foto: Foto, tipo: 'up' | 'down') {
    console.log('getCantidadVotos: Contando cantidad de votos del tipo', tipo, 'para la foto', foto);
    return foto.votos.filter(voto => voto.tipo === tipo).length;
  }
  devolver() {
    this.router.navigate(['/cosas-lindas']);
  }
}
