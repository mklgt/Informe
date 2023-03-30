import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import SignaturePad from 'signature_pad';
import { SessionService } from '../service/session.service';
import { Informe } from '../shared/informe.model';
import { PdfService } from '../service/pdfservice.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  signaturePad: SignaturePad;
  @ViewChild('canvas') canvasEl: ElementRef;
  signatureImg: string;
  informeForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private sessionService: SessionService, private pdfService: PdfService) { }

  ngOnInit(): void {
    this.informeForm = this.fb.group({
      nombre: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required]],
      licencia: ['', [Validators.required]],
      fecha1: ['', [Validators.required]],
      fecha2: ['', [Validators.required]],
      fecha3: ['', [Validators.required]],
      incidencia: ['', [Validators.required]],
    });
  }

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  comprobarDatos() {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    let informe = new Informe();
    let date = new Date();
    informe.nombre = this.informeForm.get('nombre').value;
    informe.dni = this.informeForm.get('dni').value;
    informe.direccion = this.informeForm.get('direccion').value;
    informe.telefono = this.informeForm.get('telefono').value;
    informe.email = this.informeForm.get('email').value;
    informe.licencia = this.informeForm.get('licencia').value;
    informe.fecha1 = this.informeForm.get('fecha1').value;
    informe.fecha2 = this.informeForm.get('fecha2').value;
    informe.fecha3 = this.informeForm.get('fecha3').value;
    informe.incidencias = this.informeForm.get('incidencia').value;
    informe.dia = date.getDate().toString();
    informe.mes = monthNames[date.getMonth()]
    informe.ano = date.getFullYear().toString();
    informe.firma = this.signaturePad.toDataURL();
    console.log(informe)
    this.generateInformePDF(informe);
  }

  startDrawing(event: Event) {
    console.log(event);
    // works in device not in browser
  }

  moved(event: Event) {
    // works in device not in browser
  }

  clearPad() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;

  }

  async generateInformePDF(respuesta: Informe) {
    const nuevoPdfBytes = await this.pdfService.agregarContenidoInforme(respuesta);
    const blob = new Blob([nuevoPdfBytes], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    // Crear un enlace temporal
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Informe_' + respuesta.licencia; // Establecer el nombre del archivo descargado
    document.body.appendChild(link);
    link.click();
    // Eliminar el enlace temporal
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    //window.open(url);
  }

}
