Ext.define('Infosys_web.controller.CuentasCorrientes', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: [
             'DesplegarInicial',
             'Clientes',
             'Cuentacorriente',
             'Cartolascuentacorriente',
             'cuentascontable',
             'cuentacorriente.Ctactemovimientos',
             'cuentacorriente.Librodiario',
             'cuentacorriente.Saldodocumentos'
             ],

    models: [
             'Cliente',
             'Cuentacorriente',
             'cuentascontable',
             'cuentacorriente.Ctactemovimientos',
             'cuentacorriente.Librodiario',
             'cuentacorriente.Saldodocumentos'],

    views: [
            'cuentascorrientes.CancelacionesPrincipal',
            'cuentascorrientes.CancelacionesIngresar',
            'cuentascorrientes.OtrosingresosPrincipal',
            'cuentascorrientes.OtrosingresosIngresar',
            'cuentascorrientes.CartolaPrincipal',
            'cuentascorrientes.VerCartola',
            'cuentascorrientes.VerComprobantes',
            'cuentascorrientes.CreacionCuentasPrincipal',
            'cuentascorrientes.AsociaCuenta',
            'cuentascorrientes.ResumenMovimientoPrincipal',
            'cuentascorrientes.LibroDiarioPrincipal',
            'cuentascorrientes.SaldoDocumentosPrincipal',
            'cuentascorrientes.SaldoDocumentosMail',
            ],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
            ref: 'topmenus',
            selector: 'topmenus'
        },{
            ref: 'panelprincipal',
            selector: 'panelprincipal'
        },{
            ref: 'cancelacionesprincipal',
            selector: 'cancelacionesprincipal'
        },{
            ref: 'cancelacionesingresar',
            selector: 'cancelacionesingresar'
        },{
            ref: 'otrosingresosprincipal',
            selector: 'otrosingresosprincipal'
        },{
            ref: 'otrosingresosingresar',
            selector: 'otrosingresosingresar'
        },{
            ref: 'cartolaprincipal',
            selector: 'cartolaprincipal'
        },{
            ref: 'vercartola',
            selector: 'vercartola'
        },{
            ref: 'vercomprobantes',
            selector: 'vercomprobantes'
        },{
            ref: 'creacioncuentasprincipal',
            selector: 'creacioncuentasprincipal'
        },{
            ref: 'asociacuenta',
            selector: 'asociacuenta'
        },{
            ref: 'resumenmovimientoprincipal',
            selector: 'resumenmovimientoprincipal'
        },{
            ref: 'librodiarioprincipal',
            selector: 'librodiarioprincipal'
        },{
            ref: 'saldodocumentosprincipal',
            selector: 'saldodocumentosprincipal'
        },{
            ref: 'saldodocumentosmail',
            selector: 'saldodocumentosmail'
        }

    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({

            
            'cancelacionesprincipal button[action=agregarcancelacion]': {
                click: this.agregarcancelacion
            },  
            'cancelacionesprincipal button[action=buscarctactecancelacion]': {
                click: this.buscarctactecancelacion
            },
            'cancelacionesprincipal button[action=cerrarpantalla]': {
                click: this.cerrarpantalla
            },      
            'cartolaprincipal button[action=cerrarpantalla]': {
                click: this.cerrarpantalla
            },                   
            'creacioncuentasprincipal button[action=buscarcuentacontable]': {
                click: this.buscarcuentacontable
            },      
            'creacioncuentasprincipal button[action=cerrarpantalla]': {
                click: this.cerrarpantalla
            },                    
            'cartolaprincipal button[action=buscarctactecartola]': {
                click: this.buscarctactecartola
            },            
            'otrosingresosprincipal button[action=buscarctacteotrosingresos]': {
                click: this.buscarctacteotrosingresos
            },            
            'cancelacionesprincipal': {
                verCartola: this.verCartola
            },          
                                       
            'otrosingresosprincipal': {
                verCartola: this.verCartola
            },
            'cartolaprincipal': {
                verCartola: this.verCartola
            },      
            'vercomprobantes': {
                verComprobante: this.verComprobantes
            },   
            'vercartola': {
                verComprobante: this.verComprobantes
            },               
            'creacioncuentasprincipal': {
                asociacuenta: this.asociacuenta
            },                                                
            'asociacuenta button[action=grabarasociacuenta]': {
                click: this.grabarasociacuenta
            },      


            'otrosingresosprincipal button[action=agregarotrosingresos]': {
                click: this.agregarotrosingresos
            },    
            'otrosingresosprincipal button[action=cerrarpantalla]': {
                click: this.cerrarpantalla
            },                            
            'cancelacionesingresar button[action=cancelacioningresargrabar]': {
                click: this.cancelacioningresargrabar
            },    
            'otrosingresosingresar button[action=otrosingresosingresargrabar]': {
                click: this.otrosingresosingresargrabar
            },
            'resumenmovimientoprincipal button[action=buscarmovimientos]': {
                click: this.buscarmovimientos
            },                            
            'resumenmovimientoprincipal button[action=exportarresmovimientos]': {
                click: this.exportarresmovimientos
            },                                        
            'resumenmovimientoprincipal button[action=generarresmovpdf]': {
                click: this.generarresmovpdf
            },  
            'resumenmovimientoprincipal button[action=cerrarpantalla]': {
                click: this.cerrarpantalla
            },  
            'librodiarioprincipal button[action=exportarlibrodiario]': {
                click: this.exportarlibrodiario
            },                   
            'librodiarioprincipal button[action=buscarlibrodiario]': {
                click: this.buscarlibrodiario
            },  
            'librodiarioprincipal button[action=cerrarpantalla]': {
                click: this.cerrarpantalla
            },  

            'saldodocumentosprincipal button[action=buscarsaldodocumentos]': {
                click: this.buscarsaldodocumentos
            },     

            'saldodocumentosprincipal button[action=exportarsaldodocumentos]': {
                click: this.exportarsaldodocumentos
            },    

            'vercartola button[action=exportarcartola]': {
                click: this.exportarcartola
            },               


            'vercartola button[action=generarcartolapdf]': {
                click: this.generarcartolapdf
            },               


            'saldodocumentosprincipal button[action=cerrarpantalla]': {
                click: this.cerrarpantalla
            },               
                              
            'librodiarioprincipal button[action=generarlibrodiariopdf]': {
                click: this.generarlibrodiariopdf
            },

            'saldodocumentosprincipal button[action=generarsaldodocumentospdf]': {
                click: this.generarsaldodocumentospdf
            },
            'saldodocumentosprincipal button[action=generarsaldodocumentosmail]': {
                click: this.generarsaldodocumentosmail
            },
            'saldodocumentosmail button[action=saldoenviomail]': {
                click: this.saldoenviomail
            }
        });
    },


    agregarcancelacion: function(){
        var view = this.getCancelacionesprincipal();
        if (view.getSelectionModel().hasSelection()) {
              var row = view.getSelectionModel().getSelection()[0];
              var ctacteid = row.data.id;
              var title_rut = "";
              var title_nombre = "";
              var title_saldo = "";

              Ext.Ajax.request({
                 url: preurl + 'cuentacorriente/getCuentaCorrienteById/' + ctacteid ,
                 success: function(response, opts) {                         
                    var obj = Ext.decode(response.responseText);
                    var title_rut = obj.rut != '' ?  "Rut : " + obj.rut + ".  ": "";
                    var title_nombre = obj.cliente != '' ?  "Nombre : " + obj.cliente + ".  ": "";
                    var title_saldo = obj.saldo != '' ?  "Saldo $: " + obj.saldo + ".  ": "";

                    edit = Ext.create('Infosys_web.view.cuentascorrientes.CancelacionesIngresar').show();
                    Ext.Ajax.request({
                       //url: preurl + 'cuentacorriente/getCuentaCorriente/' + record.get('cuenta') + '/' + editor.value ,
                       url: preurl + 'cuentacorriente/getCorrelativo/',
                            params: {
                                tipoCorrelativo: 'CANCELACIONES CTA CTE'
                            },
                       success: function(response, opts) {                         
                          var obj = Ext.decode(response.responseText);
                          edit.down('#numeroId').setValue(obj.data[0].correlativo);
                          edit.down('#ctacteId').setValue(ctacteid);
                          edit.down('#totaldebe').setValue(0);
                          edit.down('#totalhaber').setValue(0);
                          edit.down('#ingresoDetalleCancelacionId').setTitle("Cancelacion Cuenta Corriente.  " + title_rut + title_nombre + title_saldo);
                       },
                       failure: function(response, opts) {
                          console.log('server-side failure with status code ' + response.status);
                       }
                    });           

                 },
                 failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                 }
              });          

        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;

        }


    },


    verCartola: function(r,t){
        if(t == 2){
          var total_debe = 0;
          var total_haber = 0;
        Ext.Ajax.request({
           //url: preurl + 'cuentacorriente/getCuentaCorriente/' + record.get('cuenta') + '/' + editor.value ,
           url: preurl + 'cuentacorriente/getTotalCartola?idcuentacorriente='+r.data.id,
           success: function(response, opts) {                         
                console.log(response)
              var obj = Ext.decode(response.responseText);
              total_debe = obj.data.debe;
              total_haber = obj.data.haber;
              saldo_cta_cte = obj.data.saldo;
              
              //edit.down('#numeroId').setValue(obj.data[0].correlativo);
                         // editor.record.set({saldo: obj.data[0].saldo});  
              console.log(total_debe)

              Ext.create('Infosys_web.view.cuentascorrientes.VerCartola', {ctacte: r.data.id, 
                                                                            cliente: r.data.cliente,
                                                                            rut : r.data.rut,
                                                                            saldo_cta_cte: saldo_cta_cte,
                                                                            total_debe: total_debe,
                                                                            total_haber: total_haber});

           },
           failure: function(response, opts) {
              console.log('server-side failure with status code ' + response.status);
           }
        });          

        }else{
          Ext.create('Infosys_web.view.cuentascorrientes.VerComprobantes', {ctacte: r.data.id, 
                                                                        cliente: r.data.cliente,
                                                                        rut : r.data.rut});

        }
        //Ext.create('Infosys_web.view.cuentascorrientes.VerCartola').show();

    },


    verComprobantes: function(r){

             window.open(preurl + 'cuentacorriente/verComprobantePDF?idmov='+r.data.idcomprobante);
 
    },


        asociacuenta: function(r){
        edit = Ext.create('Infosys_web.view.cuentascorrientes.AsociaCuenta').show();
       Ext.Ajax.request({
           //url: preurl + 'cuentacorriente/getCuentaCorriente/' + record.get('cuenta') + '/' + editor.value ,
           url: preurl + 'cuentacontable/getCuentaById/',
                params: {
                    idcuenta: r.data.id
                },                                                     
           success: function(response, opts) {
              var obj = Ext.decode(response.responseText);
              edit.down('#cuentaId').setValue(r.data.id);
              edit.down('#cuenta').setValue(obj.data[0].nombre);
              edit.down('#imputacion').setValue(obj.data[0].imputacion);
              edit.down('#tipocancelacion').setValue(obj.data[0].tipo_cancelacion);

             // editor.record.set({saldo: obj.data[0].saldo});  
           },
           failure: function(response, opts) {
              console.log('server-side failure with status code ' + response.status);
           }
        });


    },



    grabarasociacuenta: function(){
            var view = this.getAsociacuenta();
            var win = this.getCreacioncuentasprincipal();
            Ext.Ajax.request({
               url: preurl + 'cuentacontable/actualizaCuenta/',
                params: {
                    idcuenta: view.down('#cuentaId').getValue(),
                    imputacion: view.down('#imputacion').getValue(),
                    tipocancelacion: view.down('#tipocancelacion').getValue(),
                },               
               success: function(response, opts) {
                    view.close();
               },
               failure: function(response, opts) {
                  console.log('server-side failure with status code ' + response.status);
               }
            })  

         win.store.reload();              


    },


    buscarcuentacontable: function(){
        var view = this.getCreacioncuentasprincipal();
        nombre = view.down('#nombreId').getValue();
        //var stItem = view.down("grid").getStore();
        var stItem = this.getCuentascontableStore();

        Ext.Ajax.request({
           url: preurl + 'cuentacontable/getByName/',
            params: {
                nombre: nombre
            },               
           success: function(response, opts) {
                    console.log(Ext.decode(response.responseText));
                    var jsonData = Ext.decode(response.responseText)
                    var jsonRecords = jsonData.data;
                    stItem.loadData(jsonRecords);            
           },
           failure: function(response, opts) {
              console.log('server-side failure with status code ' + response.status);
           }
        })    


    },

    buscarctactecancelacion: function(){
        var view = this.getCancelacionesprincipal();
        nombre = view.down('#nombreId').getValue();
        //var stItem = view.down("grid").getStore();
        var stItem = this.getCuentacorrienteStore();

        Ext.Ajax.request({
           url: preurl + 'cuentacorriente/getByName/',
            params: {
                nombre: nombre
            },               
           success: function(response, opts) {
                    console.log(Ext.decode(response.responseText));
                    var jsonData = Ext.decode(response.responseText)
                    var jsonRecords = jsonData.data;
                    stItem.loadData(jsonRecords);            
           },
           failure: function(response, opts) {
              console.log('server-side failure with status code ' + response.status);
           }
        })    


    },



    buscarmovimientos: function(){
        var view = this.getResumenmovimientoprincipal();
        console.log(view);
        fecdesde = view.down('#fecdesdeId').getValue();
        fechasta = view.down('#fechastaId').getValue();

        var stItem = view.store;
        //var stItem = this.getCuentacorrienteStore();

        Ext.Ajax.request({
           url: preurl + 'cuentacorriente/getMovimientos/',
            params: {
                fecdesde: fecdesde,
                fechasta: fechasta
            },               
           success: function(response, opts) {
                    var jsonData = Ext.decode(response.responseText)
                    var jsonRecords = jsonData.data;
                    stItem.loadData(jsonRecords);            
           },
           failure: function(response, opts) {
              console.log('server-side failure with status code ' + response.status);
           }
        }) 


    },



    buscarlibrodiario: function(){
        var view = this.getLibrodiarioprincipal();
        fecdesde = view.down('#fecdesdeId').getValue();
        fechasta = view.down('#fechastaId').getValue();
        comprobanteid = view.down('#comprobanteId').getValue();

        var stItem = view.store;

        Ext.Ajax.request({
           url: preurl + 'cuentacorriente/getLibroDiarioByTipoComprobante/',
            params: {
              comprobante : comprobanteid,
              fecdesde : fecdesde,
              fechasta : fechasta,
            },               
           success: function(response, opts) {
                    var jsonData = Ext.decode(response.responseText)
                    var jsonRecords = jsonData.data;
                    stItem.loadData(jsonRecords);            
           },
           failure: function(response, opts) {
              console.log('server-side failure with status code ' + response.status);
           }
        }) 


    },


    buscarsaldodocumentos: function(){
        var view = this.getSaldodocumentosprincipal();
        rutcliente = view.down('#rutcliente').getValue();
        nombrecliente = view.down('#nombrecliente').getValue();
        cuentacontable = view.down('#cuentacontable').getValue();
        var stItem = view.store;
        if(rutcliente == null && nombrecliente == null && cuentacontable == null){
            Ext.Msg.alert('Alerta', 'Debe realizar alg&uacute;n filtro.');      
        }else{
          Ext.Ajax.request({
             url: preurl + 'cuentacorriente/getSaldoDocumentos/',
              params: {
                rutcliente : rutcliente,
                nombrecliente : nombrecliente,
                cuentacontable : cuentacontable,
              },               
             success: function(response, opts) {
                      var jsonData = Ext.decode(response.responseText)
                      var jsonRecords = jsonData.data;
                      stItem.loadData(jsonRecords);            
             },
             failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
             }
          })
        }

    },

    exportarresmovimientos: function(){

        var jsonCol = new Array()
        var i = 0;

        var grid =this.getResumenmovimientoprincipal();
        fecdesde = Ext.util.Format.date(grid.down('#fecdesdeId').getValue());
        fechasta = Ext.util.Format.date(grid.down('#fechastaId').getValue());

        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     

        window.open(preurl + 'adminServicesExcel/exportarExcelResMov?cols='+Ext.JSON.encode(jsonCol)+'&fecdesde='+fecdesde+'&fechasta='+fechasta);
 
    },


    generarresmovpdf: function(){

        var jsonCol = new Array()
        var i = 0;

        var grid =this.getResumenmovimientoprincipal();
        fecdesde = Ext.util.Format.date(grid.down('#fecdesdeId').getValue());
        fechasta = Ext.util.Format.date(grid.down('#fechastaId').getValue());

        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     

        window.open(preurl + 'cuentacorriente/exportarResMovPDF?cols='+Ext.JSON.encode(jsonCol)+'&fecdesde='+fecdesde+'&fechasta='+fechasta);
 
    },


    exportarlibrodiario: function(){

        var jsonCol = new Array()
        var i = 0;

        var grid =this.getLibrodiarioprincipal();
        fecdesde = Ext.util.Format.date(grid.down('#fecdesdeId').getValue());
        fechasta = Ext.util.Format.date(grid.down('#fechastaId').getValue());
        comprobanteid = grid.down('#comprobanteId').getValue();

        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     

        window.open(preurl + 'adminServicesExcel/exportarExcelLibroDiario?cols='+Ext.JSON.encode(jsonCol)+'&comprobante='+comprobanteid+'&fecdesde='+fecdesde+'&fechasta='+fechasta);
 
    },

    


    exportarsaldodocumentos: function(){
        var jsonCol = new Array()
        var i = 0;

        var grid =this.getSaldodocumentosprincipal();
        rutcliente = grid.down('#rutcliente').getValue();
        nombrecliente = grid.down('#nombrecliente').getValue();
        cuentacontable = grid.down('#cuentacontable').getValue();

        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     

        window.open(preurl + 'adminServicesExcel/exportarExcelSaldoDocumentos?cols='+Ext.JSON.encode(jsonCol)+'&rutcliente='+rutcliente+'&nombrecliente='+nombrecliente+'&cuentacontable='+cuentacontable);
 
    },



    exportarcartola: function(){

        var view =this.getVercartola();
        idctacte = view.down('#idctacte').getValue();

        window.open(preurl + 'adminServicesExcel/exportarExcelCartola?&idctacte='+idctacte);
    },

    generarlibrodiariopdf: function(){
        var jsonCol = new Array()
        var i = 0;

        var grid =this.getLibrodiarioprincipal();
        fecdesde = Ext.util.Format.date(grid.down('#fecdesdeId').getValue());
        fechasta = Ext.util.Format.date(grid.down('#fechastaId').getValue());
        comprobanteid = grid.down('#comprobanteId').getValue();

        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     

        window.open(preurl + 'cuentacorriente/exportarLibroDiarioPDF?cols='+Ext.JSON.encode(jsonCol)+'&comprobante='+comprobanteid+'&fecdesde='+fecdesde+'&fechasta='+fechasta);

    },


    generarsaldodocumentospdf: function(){

        var view = this.getSaldodocumentosprincipal();
        rutcliente = view.down('#rutcliente').getValue();
        nombrecliente = view.down('#nombrecliente').getValue();
        cuentacontable = view.down('#cuentacontable').getValue();
        var stItem = view.store;
        if(rutcliente == null && nombrecliente == null && cuentacontable == null){
            Ext.Msg.alert('Alerta', 'Debe realizar alg&uacute;n filtro.');  
        }else{
          var jsonCol = new Array()
          var i = 0;

          var grid =this.getSaldodocumentosprincipal();
          //rutcliente = grid.down('#rutcliente').getValue();
          //nombrecliente = grid.down('#nombrecliente').getValue();
          //cuentacontable = grid.down('#cuentacontable').getValue();

          Ext.each(grid.columns, function(col, index){
            if(!col.hidden){
                jsonCol[i] = col.dataIndex;
            }
            
            i++;
          })     
          window.open(preurl + 'cuentacorriente/exportarSaldoDocumentosPDF?cols='+Ext.JSON.encode(jsonCol)+'&rutcliente='+rutcliente+'&nombrecliente='+nombrecliente+'&cuentacontable='+cuentacontable);

        }
    },
    

    saldoenviomail : function(){
        var view =this.getSaldodocumentosmail();
        var email = view.down('#email').getValue();
        var mensaje = view.down('#mensaje').getValue();
        var rutcliente = view.down('#rutcliente').getValue();
        var nombrecliente = view.down('#nombrecliente').getValue();
        var cuentacontable = view.down('#cuentacontable').getValue();      

        form   = view.down('form');
        if(!form.getForm().isValid()){
            Ext.Msg.alert('Informacion', 'Rellene todos los campos correctamente');
            return false
        }else{
          // enviar por post
          var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Enviado mail..."});
          myMask.show();
          Ext.Ajax.request({
             //url: preurl + 'cuentacorriente/getCuentaCorriente/' + record.get('cuenta') + '/' + editor.value ,
             url: preurl + 'cuentacorriente/mailSaldoDocumentosPDF',
                  params: {
                      email: email,
                      rutcliente : rutcliente,
                      nombrecliente : nombrecliente,
                      cuentacontable : cuentacontable,
                      mensaje : mensaje
                  },
             success: function(response, opts) {             
                myMask.hide();
                Ext.Msg.alert('Informacion', 'El correo ha sido enviado exitosamente');
                view.close();             
                //var obj = Ext.decode(response.responseText);
                //edit.down('#numeroId').setValue(obj.data[0].correlativo);
                           // editor.record.set({saldo: obj.data[0].saldo});  


             },
             failure: function(response, opts) {
                myMask.hide();
                console.log('server-side failure with status code ' + response.status);
             }
          });  

        }       
      //window.open(preurl + 'cuentacorriente/mailSaldoDocumentosPDF?email='+email+'&rutcliente='+rutcliente+'&nombrecliente='+nombrecliente+'&cuentacontable='+cuentacontable);

    },

    generarsaldodocumentosmail: function(){
        var view = this.getSaldodocumentosprincipal();
        rutcliente = view.down('#rutcliente').getValue();
        nombrecliente = view.down('#nombrecliente').getValue();
        cuentacontable = view.down('#cuentacontable').getValue();

        if(rutcliente == null && nombrecliente == null && cuentacontable == null){
            Ext.Msg.alert('Alerta', 'Debe realizar alg&uacute;n filtro.');      
        }else{
          edit =   Ext.create('Infosys_web.view.cuentascorrientes.SaldoDocumentosMail').show();
          edit.down('#rutcliente').setValue(rutcliente);
          edit.down('#nombrecliente').setValue(nombrecliente);
          edit.down('#cuentacontable').setValue(cuentacontable);
        }
       //edit.down('#numeroId').setValue(obj.data[0].correlativo);
      //edit =   Ext.create('Infosys_web.view.cuentascorrientes.OtrosingresosIngresar').show();

     /* Ext.Ajax.request({
         //url: preurl + 'cuentacorriente/getCuentaCorriente/' + record.get('cuenta') + '/' + editor.value ,
         url: preurl + 'cuentacorriente/getCorrelativo/',
              params: {
                  tipoCorrelativo: 'OTROS INGRESOS CTA CTE'
              },
         success: function(response, opts) {                         
            var obj = Ext.decode(response.responseText);
            edit.down('#numeroId').setValue(obj.data[0].correlativo);
                       // editor.record.set({saldo: obj.data[0].saldo});  
         },
         failure: function(response, opts) {
            console.log('server-side failure with status code ' + response.status);
         }
      });   */        

    },

    generarcartolapdf: function(){

        var view =this.getVercartola();
        idctacte = view.down('#idctacte').getValue();

        window.open(preurl + 'cuentacorriente/exportarCartolaPDF?idctacte='+idctacte);
    },

    buscarctactecartola: function(){
        var view = this.getCartolaprincipal();
        nombre = view.down('#nombreId').getValue();
        //var stItem = view.down("grid").getStore();
        var stItem = this.getCartolascuentacorrienteStore();

        Ext.Ajax.request({
           url: preurl + 'cuentacorriente/getByNameCartola/',
            params: {
                nombre: nombre
            },               
           success: function(response, opts) {
                    console.log(Ext.decode(response.responseText));
                    var jsonData = Ext.decode(response.responseText)
                    var jsonRecords = jsonData.data;
                    stItem.loadData(jsonRecords);            
           },
           failure: function(response, opts) {
              console.log('server-side failure with status code ' + response.status);
           }
        })    


    },


    buscarctacteotrosingresos: function(){
        var view = this.getOtrosingresosprincipal();
        nombre = view.down('#nombreId').getValue();
        //var stItem = view.down("grid").getStore();
        var stItem = this.getCuentacorrienteStore();

        Ext.Ajax.request({
           url: preurl + 'cuentacorriente/getByName/',
            params: {
                nombre: nombre
            },               
           success: function(response, opts) {
                    console.log(Ext.decode(response.responseText));
                    var jsonData = Ext.decode(response.responseText)
                    var jsonRecords = jsonData.data;
                    stItem.loadData(jsonRecords);            
           },
           failure: function(response, opts) {
              console.log('server-side failure with status code ' + response.status);
           }
        })    


    },


    agregarotrosingresos: function(){
      var view = this.getOtrosingresosprincipal();
      if (view.getSelectionModel().hasSelection()) {
              var row = view.getSelectionModel().getSelection()[0];
              var ctacteid = row.data.id;
              var title_rut = "";
              var title_nombre = "";
              var title_saldo = "";


              Ext.Ajax.request({
                 url: preurl + 'cuentacorriente/getCuentaCorrienteById/' + ctacteid ,
                 success: function(response, opts) {                         
                    var obj = Ext.decode(response.responseText);
                    var title_rut = obj.rut != '' ?  "Rut : " + obj.rut + ".  ": "";
                    var title_nombre = obj.cliente != '' ?  "Nombre : " + obj.cliente + ".  ": "";
                    var title_saldo = obj.saldo != '' ?  "Saldo $: " + obj.saldo + ".  ": "";
                    var idcliente = obj.idcliente;

                    edit =   Ext.create('Infosys_web.view.cuentascorrientes.OtrosingresosIngresar').show();
                    Ext.Ajax.request({
                       //url: preurl + 'cuentacorriente/getCuentaCorriente/' + record.get('cuenta') + '/' + editor.value ,
                       url: preurl + 'cuentacorriente/getCorrelativo/',
                            params: {
                                tipoCorrelativo: 'OTROS INGRESOS CTA CTE'
                            },
                       success: function(response, opts) {                         
                          var obj = Ext.decode(response.responseText);
                          edit.down('#numeroId').setValue(obj.data[0].correlativo);
                          edit.down('#ctacteId').setValue(ctacteid);
                          edit.down('#clienteId').setValue(idcliente);
                                     // editor.record.set({saldo: obj.data[0].saldo});  
                       },
                       failure: function(response, opts) {
                          console.log('server-side failure with status code ' + response.status);
                       }
                    });  
                 },
                 failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                 }
              });




      }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;

      }        

    },

    cancelacioningresargrabar: function(){
        
        var view = this.getCancelacionesingresar();
        var win = this.getCancelacionesprincipal();
        var stItem = view.down("grid").getStore();
        var sumdebe = 0;
        var sumhaber = 0;
        //for(i=0;i<store.count();i++){
            //console.log(store.data.items[i].data);
            //console.log(store.data.items[i].data.debe)
            //console.log(store.data.items[i].data.haber)
          //  sumdebe += parseInt(store.data.items[i].data.debe);
          //  sumhaber += parseInt(store.data.items[i].data.haber);
        //}

        var dataItems = new Array();
        var sincuenta = 0;
        stItem.each(function(r){
            dataItems.push(r.data);
            sumdebe += (r.data.debe);
            sumhaber += (r.data.haber);
            if((r.data.debe != 0 || r.data.haber != 0) && (r.data.cuenta == null || r.data.cuenta == 0)){
              sincuenta++;
            }
        });        


        if(view.down('#numeroId').getValue() == null){
            Ext.Msg.alert('Alerta', 'Debe Ingresar un Número de Folio.');      
        }else if(view.down('#fechaId').getValue() == null){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Fecha de Cancelación.');      
        }else if(view.down('#tipoComprobante').getValue() == null){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Tipo de Comprobante.');      
        }else if(sumdebe == 0 && sumhaber == 0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar al menos un detalle de cancelacion.');                          
        }else if(sumdebe != sumhaber){
            Ext.Msg.alert('Alerta', 'Totales de Debe y Haber deben coincidir.');
        }else if(sincuenta > 0){
            Ext.Msg.alert('Alerta', 'Debe validar el ingreso de cuenta en cada linea.');
        }else{

            /*var form = view.down('form').getForm();  
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        console.log(action)
                       Ext.Msg.alert('Success', action.result.msg);
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result.msg);
                    }
                });
            }*/

            Ext.Ajax.request({
               url: preurl + 'cuentacorriente/saveCancelacion/',
                params: {
                    ctacteId: view.down('#ctacteId').getValue(),
                    fecha: view.down('#fechaId').getValue(),
                    numero: view.down('#numeroId').getValue(),
                    tipoComprobante: view.down('#tipoComprobante').getValue(),
                    detalle: view.down('#detalleId').getValue(),
                    items: Ext.JSON.encode(dataItems),
                    origen : 'CANCELACION'
                },               
               success: function(response, opts) {
                  win.store.reload();      

                     
               },
               failure: function(response, opts) {
                  console.log('server-side failure with status code ' + response.status);
               }
            })    

         view.close();   
       

             
        }
    // GUARDAR

    },




    otrosingresosingresargrabar: function(){
        
        var view = this.getOtrosingresosingresar();
        var win = this.getOtrosingresosprincipal();
        var stItem = view.down("grid").getStore();
        var sumdebe = 0;
        var sumhaber = 0;
        var sincuenta = 0;
        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data);
            sumdebe += (r.data.debe);
            sumhaber += (r.data.haber);
            if((r.data.debe != 0 || r.data.haber != 0) && (r.data.cuenta == null || r.data.cuenta == 0)){
              sincuenta++;
            }            
        });        

        
        if(view.down('#numeroId').getValue() == null){
            Ext.Msg.alert('Alerta', 'Debe Ingresar un Número de Folio.');      
        }else if(view.down('#fechaId').getValue() == null){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Fecha de Cancelación.');      
        }else if(view.down('#tipoComprobante').getValue() == null){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Tipo de Comprobante.');      
        }else if(sumdebe == 0 && sumhaber == 0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar al menos un detalle de cancelacion.');                          
        }else if(sumdebe != sumhaber){
            Ext.Msg.alert('Alerta', 'Totales de Debe y Haber deben coincidir.');
        }else if(sincuenta > 0){
            Ext.Msg.alert('Alerta', 'Debe validar el ingreso de cuenta en cada linea.');            
        }else{

            Ext.Ajax.request({
               url: preurl + 'cuentacorriente/saveCuentaCorriente/',
                params: {
                    fecha: view.down('#fechaId').getValue(),
                    numero: view.down('#numeroId').getValue(),
                    tipoComprobante: view.down('#tipoComprobante').getValue(),
                    detalle: view.down('#detalleId').getValue(),
                    items: Ext.JSON.encode(dataItems),
                    origen : 'OTRO'
                },               
               success: function(response, opts) {
                     win.store.reload();
                     
               },
               failure: function(response, opts) {
                  console.log('server-side failure with status code ' + response.status);
               }
            })    

         view.close();            

            //console.log(form)        
        }
    // GUARDAR

    },
    cerrarpantalla: function(){

        var viewport = this.getPanelprincipal();
        if(typeof viewport !== undefined){
          viewport.removeAll();
        }
        
     
     
    },    
  
});










