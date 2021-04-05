

export class CommonServices {
    
    //Datas
    minDate: string;
    maxDate: string;

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    //função que formata o texto para o padrão Title Case
    titleCase(string) {
        if ((string === null) || (string === ''))
            return false;
        else
            string = string.toString();
        return string.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    };

    //função que formata o objeto para o padrão Base64
    convertToBase64(item) {
        return btoa(JSON.stringify(item));
    }

    //função que transforma as informações da tabela para o formato xls
    /* public exportExcel(jsonData: any[], fileName: string): void {
        const worksheet = XLSX.utils.json_to_sheet(jsonData);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveExcelFile(excelBuffer, fileName);
    } */

    //função que salva as informações da tabela para o formato xls
  /*   private saveExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        let date = new Date();
        let format = "  " + date.getDate() + " - " + date.getHours() + "_" + date.getMinutes()
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + format + EXCEL_EXTENSION);
    } */

    //função que inicia as validações de datas
    initDate() {
        this.getDateUpdate();
    }

    //função que define a data inicial e final
    getDateUpdate() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        let hour = String(today.getHours()).padStart(2, '0');;
        let minute = String(today.getMinutes()).padStart(2, '0');;
        let formatedHour = String(hour) + ":" + String(minute);

        this.minDate = yyyy + '-' + mm + '-' + dd + 'T' + formatedHour;
        this.maxDate = yyyy + '-' + mm + '-' + (Number(dd) + 5) + 'T' + formatedHour;
    }

    //função que define a data inicial e final
    formatDateddMMyyyy(data: Date) {
        data = new Date(data);
        var dia  = data.getDate().toString().padStart(2, '0');
        var mes  = (data.getMonth()+1).toString().padStart(2, '0');
        var ano  = data.getFullYear();
        return dia+"/"+mes+"/"+ano;
    }

}

