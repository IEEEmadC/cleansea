import schedule from 'node-schedule';

moment.locale('pt-br');
moment.tz.setDefault('America/Bahia');

Meteor.startup(function () {
    console.log("Teste de startup");
    
    // let testeJob = schedule.scheduleJob('42 * * * * *', Meteor.bindEnvironment(function () {
        
    //     var now = moment();

    //     console.log("the answer to life, the universe, and everything!");
    //     console.log(now.format("DD/MM/YYYY HH:mm"));
    // }));

    let pullDB = schedule.scheduleJob('0 44 18 * * *', Meteor.bindEnvironment(function () {
        
        let now = moment(),
            jsonPull={};

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
        console.log("FInd", Praias.find().fetch());
        
    }));
});