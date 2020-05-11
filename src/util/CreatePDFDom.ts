import {PDF_HTML} from "./template/PDF_HTML";


export const createPDFDom = (html, css) => 　{

    let main = html.replace(/<header(?: .+?)?>.*?<\/header>/g, '');
    const print =
        `@media print {
            @page {
                size: A4;
                margin: 10mm;
            }
            ${css}
            p {
                flex: 0 1 auto;
            }
        }
        @media print {
          body {
             width: 190mm; /* needed for Chrome */
          }
        }
       `;

    // pdf用にDOM生成
    let iframe:any = document.getElementById('pdfContainer');
    if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.style.width = '190mm'
        iframe.style.height = '0'
        iframe.id = 'pdfContainer';
        document.body.appendChild(iframe);
    }
    let htmlData = PDF_HTML.replace(/{{HTML}}/g, html);
    htmlData = htmlData.replace(/{{style}}/g, `<style>${css}</style>`);
    const container = document.createElement('div');
    container.id = 'wrap';
    container.innerHTML = htmlData;
    iframe.contentWindow.document.body.innerHTML = "";
    iframe.contentWindow.document.body.appendChild(container);
    const containerElement = Array.prototype.slice.call(container.querySelectorAll('img, a, video'), 0)
    containerElement.forEach(function(e){
        const h = e.clientHeight;
        const w　= e.clientWidth;
        e.removeAttribute("height")
        e.removeAttribute("width")
        e.style.height = `${h}px`;
        e.style.width = `${w}px`;
    })

    const send = {
        main: PDF_HTML.replace(/{{HTML}}/g, container.outerHTML).replace(/{{style}}/g, ''),
        main_css: print,
        header: '',
        header_css: '',
        footer: '',
        footer_css: '',
    }
    return send
}
