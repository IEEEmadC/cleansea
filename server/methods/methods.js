import PDFParser from 'pdf2json';
import fs from 'fs';

Meteor.methods({
    // Manual database fill
    pdfUpload:function(dataObj){

        let pdfBuffer         = Buffer.from(dataObj, 'base64'),
            pdfParser         = new PDFParser(this,1),
            arrayPraias       = [],
            arrayInfoPraias   = [],
            jsonA             = {},
            hoje              = moment().format('DD-MM-YYYY'),
            hoje2             = moment().format('DD_MM_YYYY'),
            changeNumber      = 0,
            idEmitido         = Emitido.findOne(),
            temp, temp2, temp3, temp4, data;

        fs.writeFileSync("file.pdf", pdfBuffer, 'binary');
     
        pdfParser.on("pdfParser_dataError", Meteor.bindEnvironment(function(errData){console.error('**error:', errData.parserError) }) );
        
        pdfParser.on("pdfParser_dataReady", Meteor.bindEnvironment(function(pdfData) {

            fs.writeFileSync("./QualidadePraias.txt", pdfParser.getRawTextContent());
               
            // ArrayMaker
            let array = fs.readFileSync('QualidadePraias.txt').toString().split("\n");
                data  = array[3].substring(array[3].indexOf("Emitido")).replace('\r','');

            arrayPraias.push(data);

            for (let i = 5; i <= 43; i++) {
                if (i===34) {
                    // console.log("34 Escape");
                }
                else{
                    temp = array[i].substring(0,array[i].indexOf("-")-1);

                    if (array[i].indexOf("Imprópria")>0) {
                        temp2 = array[i].substring(array[i].indexOf("Imprópria")).replace(/(\r\n|\n|\r)/gm,"");
                        temp3 = array[i].substring(array[i].indexOf("00")+2, array[i].indexOf("Imprópria"));
                        temp4 = array[i].substring(array[i].indexOf("-")+2, array[i].indexOf("00")+2);
                    }
                    if (array[i].indexOf("Própria")>0) {
                        temp2 = array[i].substring(array[i].indexOf("Própria")).replace(/(\r\n|\n|\r)/gm,"");
                        temp3 = array[i].substring(array[i].indexOf("00")+2, array[i].indexOf("Própria"));
                        temp4 = array[i].substring(array[i].indexOf("-")+2, array[i].indexOf("00")+2);
                    }
                    arrayPraias.push({Praia: temp, Qualidade: temp2, Local: temp3, Codigo: temp4});
                }
            }
            jsonPull = {"array":arrayPraias};

            arrayPraias = [];

            // PopulateBD
            jsonPull.array.forEach(function(item, index){
                if (index === 0) {
                    if ( idEmitido ) {
                        Emitido.update({_id:idEmitido._id},
                                    {
                                        $set: {
                                            emitido: jsonPull.array[0]
                                        }
                                    }
                        );                        
                    }
                    else{ 
                        Emitido.insert({emitido:jsonPull.array[0]});
                    }
                }
                else{
                    if (Praias.findOne({codigo:item.Codigo})) {

                        Praias.update({codigo:item.Codigo},
                                    {
                                        $set: {
                                            codigo: item.Codigo, 
                                            praia:item.Praia,
                                            qualidade: item.Qualidade,
                                            local: item.Local
                                        }
                                    }
                        );
                    }
                    else{

                        Praias.insert({
                                        codigo: item.Codigo, 
                                        praia:item.Praia,
                                        qualidade: item.Qualidade,
                                        local: item.Local
                                      });
                    }

                }
            });

        }) );

        pdfParser.loadPDF("file.pdf");
    },
});