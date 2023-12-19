export default {
  license:
    'eyJzY29wZSI6WyJBTEwiXSwicGxhdGZvcm0iOlsiaU9TIiwiQW5kcm9pZCIsIldpbmRvd3MiLCJKUyIsIldlYiJdLCJ2YWxpZCI6IjIwMjEtMDUtMjgiLCJtYWpvclZlcnNpb24iOjMsIm1heERheXNOb3RSZXBvcnRlZCI6NSwic2hvd1dhdGVybWFyayI6dHJ1ZSwicGluZ1JlcG9ydGluZyI6dHJ1ZSwiZGVidWdSZXBvcnRpbmciOiJvbiIsInRvbGVyYW5jZURheXMiOjUsInNob3dQb3BVcEFmdGVyRXhwaXJ5Ijp0cnVlLCJpb3NJZGVudGlmaWVyIjpbImNvbS5pbmZvcmNvcHJuIl0sImFuZHJvaWRJZGVudGlmaWVyIjpbImNvbS5pbmZvcmNvcHJuIl0sIndpbmRvd3NJZGVudGlmaWVyIjpbImNvbS5pbmZvcmNvcHJuIl0sIndlYklkZW50aWZpZXIiOlsiY29tLmluZm9yY29wcm4iXSwianNJZGVudGlmaWVyIjpbImNvbS5pbmZvcmNvcHJuIl0sImltYWdlUmVwb3J0Q2FjaGluZyI6dHJ1ZSwibGljZW5zZUtleVZlcnNpb24iOjIsImFkdmFuY2VkQmFyY29kZSI6dHJ1ZSwic3VwcG9ydGVkQmFyY29kZUZvcm1hdHMiOlsiQUxMIl19CmFLcGlITGcxZTF3MHFEdEp1ZVpJM2cwMlN6aEJQRHpvT2NwZ2hqYkw2VGNrRlo5MnRoSHY3djBKR2pGMzl2eEVCbVNuMHFWd3IyMnRSTFhyM3MvcWhGUUl5dkVmOE9KT0ZReUM5TUt2ZURQeFVCUHFXUWVjSVVYcythdzJYUDI1eHdBaW14Q0VnMnBTVk55ek5ibmRsUkFNVnhGRklEWkhrQ1lVZW0yN2VVRTJXVEZtSDllNmg4TnJLalZEalNQOTRkbUQ0a05XQXkzN01IazgrZ1BucjhWZkZoMEkwOHQzWEc4Q0YwMUJoc1B2Rk5IWTBFVk5iTTMrU2psQTlqN2x0bXUvRnJhcU9kdThSd3VuNEMyTlVweDdvOFhYWGFhZW9YaGFheVdDdzVWa2MxZkl2T3ljYXVGWFYwbmRJaWY2SmlFSWJ1Zk0zbmRETnczNlJXMmp6UT09',
  options: {
    camera: {
      captureResolution: '1080p',
    },
    flash: {
      mode: 'auto',
      alignment: 'bottom_right',
    },
    viewPlugin: {
      plugin: {
        id: 'Barcode_ID',
        barcodePlugin: {
          barcodeFormatOptions: [
            'UPC_E',
            'EAN_13',
            'UPC_A',
            'EAN_8',
            'AZTEC',
            'CODABAR',
            'CODE_11',
            'CODE_32',
            'CODE_39',
            'CODE_93',
            'CODE_128',
            'DATABAR',
            'DATA_MATRIX',
            'GS1_QR_CODE',
            'GS1_128',
            'ITF',
            'ISBT_128',
            'MSI',
            'MICRO_QR',
            'MICRO_PDF',
            'PDF_417',
            'POST_UK',
            'QR_CODE',
            'RSS_14',
            'RSS_EXPANDED',
            'TRIOPTIC',
            'USPS_4CB',
            'US_PLANET',
            'US_POSTNET',
          ],
        },
      },
      cutoutConfig: {
        style: 'rect',
        maxWidthPercent: '80%',
        maxHeightPercent: '80%',
        alignment: 'center',
        ratioFromSize: {
          width: 100,
          height: 80,
        },
        strokeWidth: 1,
        cornerRadius: 3,
        strokeColor: 'FFFFFF',
        outerColor: '000000',
        outerAlpha: 0.3,
        feedbackStrokeColor: '0099FF',
      },
      scanFeedback: {
        style: 'rect',
        strokeColor: '0099FF',
        fillColor: '220099FF',
        animationDuration: 150,
        blinkOnResult: true,
        beepOnResult: true,
        vibrateOnResult: true,
      },
      cancelOnResult: true,
    },
    doneButton: {
      // iOS only. Android uses hardware back button.
      title: 'OK',
      type: 'rect', // fullwidth, rect
      cornerRadius: 0,
      //"backgroundColor":"#EEEEEE", // default clearcolor
      textColor: 'FFFFFF',
      textColorHighlighted: 'CCCCCC',
      fontSize: 33,
      fontName: 'HelveticaNeue',
      positionXAlignment: 'center', // left,right,center - no affect on fullwidth
      positionYAlignment: 'bottom', // top, center, bottom
      offset: {
        x: 0, // postive -> right
        y: -88, // postive -> down
      },
    },
  },
};
