import PDFParser from 'pdf2json';
import fs from 'fs';

Meteor.methods({
	callGet:function(){
		
		Future = Npm.require('fibers/future');

		let pdfParser 		  = new PDFParser(this,1),
			arrayPraias       = [],
			arrayInfoPraias   = [],
			jsonA             = {},
			url 	 		  = 'http://www.inema.ba.gov.br/wp-content/uploads/2011/08/Boletim-N20-Balneabilidade-para-Salvador-emitido-em-19-05-2017.pdf',
			pdfBuffer, temp, temp2, temp3, temp4, data
			myFuture 		  = new Future();

		HTTP.call( 'GET', url,{ encoding: 'binary', responseType: 'buffer' }, function(error, response) {
			if (error) {
				console.log('error,', error);
			}
			if (response) {
                console.log("****RESPONSE", response);

                pdfBuffer = response.content;
                
				fs.writeFileSync("file.pdf", pdfBuffer, 'binary');

			    pdfParser.on("pdfParser_dataError", function(errData){console.error('**error:',errData.parserError) });
				pdfParser.on("pdfParser_dataReady", function(pdfData) {

					fs.writeFileSync("./QualidadePraias.txt", pdfParser.getRawTextContent());
					console.log("writeFile call arrayMaker");
						
					arrayMaker();

			    });
			    pdfParser.loadPDF("file.pdf");
			}
		});

		function arrayMaker (){
			console.log("arrayMaker");
			let array = [];
			fs.stat("./file.pdf", function(err, stats) {
				if (stats) {
					let array = fs.readFileSync('QualidadePraias.txt').toString().split("\n");
						data  = array[3].substring(array[3].indexOf("Emitido")).replace('\r','');

					console.log("data: ", data);

					arrayPraias.push(data);
					console.log("start loop");
					for (let i = 5; i <= 43; i++) {
						console.log("Loop")
						if (i===34) {
							console.log("34")
						}
						else{
							console.log("operation")
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
					jsonA = {"array":arrayPraias};

					arrayPraias = [];

					// console.log("done!", jsonA);
					myFuture.return(jsonA)

				  
				}
				else {
					console.log("no")
				}
			});  
			
			if (myFuture.wait()) {
			console.log("call bdPopulate");
				bdPopulate(jsonA);

			}
		}

	bdPopulate = function(jsonPull){
		console.log("bdPopulate");
			 //pega o array da restAPI e gera um json
            
            for (var i = 1; i < jsonPull.array.length; i++) {
                console.log("Index: ", i);
                console.log("Praia: ", jsonPull.array[i].Praia);
                // console.log("FInd", Praias.findOne({codigo:jsonPull.array[i].Codigo}));
                
                // If do emitido  
                console.log("Emitido:", jsonPull.array[0])
                let idEmitido = Emitido.findOne(); 
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
                    return Praias.update({codigo:jsonPull.array[i].Codigo},
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
                    return Praias.insert({
                                    codigo: jsonPull.array[i].Codigo, 
                                    praia:jsonPull.array[i].Praia,
                                    qualidade: jsonPull.array[i].Qualidade,
                                    local: jsonPull.array[i].Local
                                  });
                }
            }
	}
	},
	// callGet:function(){
	// 	HTTP.call( 'GET', 'https://praiaget.herokuapp.com/rest/praiasget', function( error, response ) {
 //            if (error) {
 //                console.log("Error:", error);
 //            }
 //            else{ 
 //                jsonPull = JSON.parse(response.content); //pega o array da restAPI e gera um json
                
 //                for (var i = 1; i < jsonPull.array.length; i++) {
 //                    console.log("Index: ", i);
 //                    console.log("Praia: ", jsonPull.array[i].Praia);
 //                    console.log("FInd", Praias.findOne({codigo:jsonPull.array[i].Codigo}));
                    
 //                    // If do emitido  
 //                    console.log("Emitido:", jsonPull.array[0])
 //                    let idEmitido = Emitido.findOne()  
 //                    if ( idEmitido ) {
 //                        Emitido.update({_id:idEmitido._id},
 //                                    {
 //                                        $set: {
 //                                            emitido: jsonPull.array[0]
 //                                        }
 //                                    }
 //                        );                        
 //                    }
 //                    else{ 
 //                        Emitido.insert({emitido:jsonPull.array[0]});
 //                    }

 //                    // If das praias
 //                    if (Praias.findOne({codigo:jsonPull.array[i].Codigo})) {
 //                        console.log("Entrou no if");
 //                        Praias.update({codigo:jsonPull.array[i].Codigo},
 //                                    {
 //                                        $set: {
 //                                            codigo: jsonPull.array[i].Codigo, 
 //                                            praia:jsonPull.array[i].Praia,
 //                                            qualidade: jsonPull.array[i].Qualidade,
 //                                            local: jsonPull.array[i].Local
 //                                        }
 //                                    }
 //                        );
 //                    }
 //                    else{
 //                        Praias.insert({
 //                                        codigo: jsonPull.array[i].Codigo, 
 //                                        praia:jsonPull.array[i].Praia,
 //                                        qualidade: jsonPull.array[i].Qualidade,
 //                                        local: jsonPull.array[i].Local
 //                                      });
 //                    }
 //                }
 //            }
 //        });
	// },
});