import { Injectable } from '@angular/core';
import { Informe } from '../shared/informe.model';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  async agregarContenidoInforme(respuesta: Informe) {

    const url =
      'http://localhost:4200/assets/pdf/plantillaServiciosMinimos.pdf';
    const response = await fetch(url);
    console.log(response)
    const pdfBytes = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const { width, height } = firstPage.getSize();
    firstPage.drawText(respuesta.nombre, {
      x: 200,
      y: height / 2 + 238,
      size: 10,
    })
    firstPage.drawText(respuesta.dni, {
      x: 360,
      y: height / 2 + 238,
      size: 10,
    })
    firstPage.drawText(respuesta.direccion, {
      x: 250,
      y: height / 2 + 225,
      size: 10,
    })
    firstPage.drawText(respuesta.telefono, {
      x: 200,
      y: height / 2 + 209,
      size: 10,
    })
    firstPage.drawText(respuesta.email, {
      x: 350,
      y: height / 2 + 215,
      size: 7,
    })
    firstPage.drawText(respuesta.licencia, {
      x: 328,
      y: height / 2 + 195,
      size: 10,
    })
    firstPage.drawText(respuesta.fecha1, {
      x: 280,
      y: height / 2 + 122,
      size: 10,
    })
    firstPage.drawText(respuesta.fecha2, {
      x: 280,
      y: height / 2 + 108,
      size: 10,
    })
    firstPage.drawText(respuesta.fecha3, {
      x: 280,
      y: height / 2 + 95,
      size: 10,
    })
    firstPage.drawText(respuesta.incidencias, {
      x: 160,
      y: height / 2 + 58,
      size: 10,
    })
    firstPage.drawText(respuesta.dia, {
      x: 223,
      y: height / 2 + 31,
      size: 10,
    })
    firstPage.drawText(respuesta.mes, {
      x: 254,
      y: height / 2 + 31,
      size: 10,
    })
    firstPage.drawText(respuesta.ano.substring(2), {
      x: 336,
      y: height / 2 + 31,
      size: 10,
    })
    const imageBase64 = respuesta.firma!;
    const imageBytes = Buffer.from(imageBase64.split(',')[1], 'base64');
    const image = await pdfDoc.embedPng(imageBytes);
    firstPage.drawImage(image, {
      x: 210,
      y: height / 2 - 25,
      width: 75,
      height: 40,
    });
    const nuevoPdfBytes = await pdfDoc.save();
    return nuevoPdfBytes;
  }
}
