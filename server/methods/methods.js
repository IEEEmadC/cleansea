import PDFParser from 'pdf2json';
import fs from 'fs';

Meteor.methods({
	// callGet:function(){
	// 	let pdfParser = new PDFParser(this,1),
	// 		stream 	  = fs.createWriteStream("file.txt"),
	// 		url 	  = 'http://www.inema.ba.gov.br/wp-content/uploads/2011/08/Boletim-N20-Balneabilidade-para-Salvador-emitido-em-19-05-2017.pdf';

	// 	HTTP.call( 'GET', url, function(error, response) {
	// 		if (error) {
	// 			console.log('error,', error);
	// 		}
	// 		if (response) {
	// 			console.log("****RESPONSE type:", typeof(response.content));
	// 			fs.writeFileSync("10111.pdf", response,'binary');
	// 			// // console.log("response", response.content);
	// 			//     pdfParser.on("pdfParser_dataError", function(errData){console.error('**error:',errData.parserError) });
 //    // 				pdfParser.on("pdfParser_dataReady", function(pdfData) {
	// 			//         console.log("pdfData", JSON.stringify(pdfData));
	// 			//     });
	// 			//     pdfParser.loadPDF(response.content);
	// 		}
	// 	});
	// },
	callGet:function(){
		HTTP.call( 'GET', 'https://praiaget.herokuapp.com/rest/praiasget', function( error, response ) {
            if (error) {
                console.log("Error:", error);
            }
            else{ 
                jsonPull = JSON.parse(response.content); //pega o array da restAPI e gera um json
                
                for (var i = 1; i < jsonPull.array.length; i++) {
                    console.log("Index: ", i);
                    console.log("Praia: ", jsonPull.array[i].Praia);
                    console.log("FInd", Praias.findOne({codigo:jsonPull.array[i].Codigo}));
                    
                    // If do emitido  
                    console.log("Emitido:", jsonPull.array[0])
                    let idEmitido = Emitido.findOne()  
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

                    // If das praias
                    if (Praias.findOne({codigo:jsonPull.array[i].Codigo})) {
                        console.log("Entrou no if");
                        Praias.update({codigo:jsonPull.array[i].Codigo},
                                    {
                                        $set: {
                                            codigo: jsonPull.array[i].Codigo, 
                                            praia:jsonPull.array[i].Praia,
                                            qualidade: jsonPull.array[i].Qualidade,
                                            local: jsonPull.array[i].Local
                                        }
                                    }
                        );
                    }
                    else{
                        Praias.insert({
                                        codigo: jsonPull.array[i].Codigo, 
                                        praia:jsonPull.array[i].Praia,
                                        qualidade: jsonPull.array[i].Qualidade,
                                        local: jsonPull.array[i].Local
                                      });
                    }
                }
            }
        });
	},
});