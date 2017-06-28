import PDFParser from 'pdf2json';
import fs from 'fs';

Meteor.methods({
	callGet:function(){
        console.log("Test method!!");
        let pdfParser         = new PDFParser(this,1),
            arrayPraias       = [],
            arrayInfoPraias   = [],
            jsonA             = {},
            hoje              = moment().format('DD-MM-YYYY'),
            hoje2             = moment().format('DD_MM_YYYY'),
            changeNumber      = 0,
            idEmitido         = Emitido.findOne(),
            pdfBuffer, temp, temp2, temp3, temp4, data;

        function responseTest(){
            let ultimoBoletim   = idEmitido.ultimoBoletim,
                novoBoletim;
                
                console.log("ultimoBoletim", ultimoBoletim);

                ultimoBoletim   = parseInt(ultimoBoletim);
                novoBoletim     = ultimoBoletim + 1;
                novoBoletim     = novoBoletim.toString();
                novoBoletim = '24';

                console.log("novoBoletim", novoBoletim);

            // hoje = '26-05-2017-1';
            hoje = '16-06-2017';
            console.log("hoje", hoje)
            console.log("http://www.inema.ba.gov.br/wp-content/uploads/2011/08/Boletim-N"+novoBoletim+"-Balneabilidade-para-Salvador-emitido-em-"+hoje+".pdf")
            pdfBuffer = HTTP.call('GET', "http://www.inema.ba.gov.br/wp-content/uploads/2011/08/Boletim-N"+novoBoletim+"-Balneabilidade-para-Salvador-emitido-em-"+hoje+".pdf", { encoding: 'binary', responseType: 'buffer' }, function(error, response){
                console.log("pdfBuffer", response);
                if (error) {
                    console.log("error!", error)
                }
                else if (response && response.statusCode === 200) {
                    console.log("foi pdfBuffer.content:", response.content);
                    console.log("idEmitido.ultimoBoletim", idEmitido.ultimoBoletim);
                    console.log("url ultimoBoletim", novoBoletim);

                    Emitido.update({_id:idEmitido._id}, { $set:{ultimoBoletim:novoBoletim} });
                    
                    pdfBuffer = response.content;
                    arrayMaker(pdfBuffer);
                
                }
                else{
                    console.log("Não foi");
                    return;
                }

            });
        }
	}
});