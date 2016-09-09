Ext.define('Infosys_web.controller.Proveedores', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Proveedores',
             'Cod_activ',
             'TipoCiudades',
             'TipoComunas',
             'vendedores.Activo',
             'Contacto_clientes',
             'Sucursales_clientes'],

    models: ['Proveedor',
              'Contacto_clientes'],

    views: ['proveedores.Principal',
            'proveedores.BusquedaProveedor', 
            'proveedores.Ingresar',
            'proveedores.Desplegar',
            'proveedores.Eliminar',
            'proveedores.Desplieguecontactos',
            'proveedores.IngresarContactos',
            'proveedores.IngresarSucursales'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
    
       ref: 'proveedorprincipal',
        selector: 'proveedorprincipal'
    },{
        ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
    
        ref: 'proveedoringresar',
        selector: 'proveedoringresar'
    },{
    
        ref: 'busquedaproveedor',
        selector: 'busquedaproveedor'
    },{
    
        ref: 'proveedordesplegar',
        selector: 'proveedordesplegar'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{
        ref: 'desplegarcontactos',
        selector: 'desplegarcontactos'
    },{
        ref: 'contactoingresarproveedores',
        selector: 'contactoingresarproveedores'
    },{
        ref: 'desplegarsucursalesproveedores',
        selector: 'desplegarsucursalesproveedores'
    },{
        ref: 'sucursalesingresarproveedores',
        selector: 'sucursalesingresarproveedores'
    },{
        ref: 'eliminarproveedores',
        selector: 'eliminarproveedores'
    }


    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({

            'proveedorprincipal button[action=buscarproveedor]': {
                click: this.buscarproveedor
            },
            'proveedorprincipal button[action=despliegasucursalesproveedores]': {
                click: this.despliegasucursalesproveedores
            }, 
             
            'topmenus menuitem[action=mproveedores]': {
                click: this.mproveedores
            },
            
            'proveedorprincipal button[action=exportarexcelproveedor]': {
                click: this.exportarexcelproveedor
            },
            'proveedorprincipal button[action=despliegacontactos]': {
                click: this.despliegacontactos
            }, 
            
            'proveedoringresar button[action=grabarproveedor]': {
                click: this.grabarproveedor
            },
            'proveedoringresar button[action=validarut]': {
                click: this.validarut
            },
            'proveedorprincipal button[action=agregarproveedor]': {
                click: this.agregarproveedor
            },
            'proveedorprincipal button[action=editarproveedor]': {
                click: this.editarproveedor
            },
            'proveedorprincipal button[action=cerrarproveedor]': {
                click: this.cerrarproveedor
            },
            'proveedoringresar #rutId': {
                specialkey: this.special,
                blur: this.validarut
            },
            'proveedordesplegar button[action=grabareditarproveedor]': {
                click: this.grabareditarproveedor
            },
            'desplegarcontactos button[action=agregaContacto]': {
                click: this.agregaContacto
            },
             'contactoingresarproveedores button[action=grabarcontactos]': {
                click: this.grabarcontactos
            },
            'desplegarsucursalesproveedores button[action=agregaSucursalesproveedores]': {
                click: this.agregaSucursalesproveedores
            },
            'sucursalesingresarproveedores button[action=grabarsucursalesproveedores]': {
                click: this.grabarsucursalesproveedores
            },
            ' eliminarproveedores button[action=salirproveedores]': {
                click: this.salirproveedores
            },
            ' eliminarproveedores button[action=eliminar]': {
                click: this.eliminar
            },
            'proveedorprincipal button[action=eliminarproveedores]': {
                click: this.eliminarproveedores
            }       
        });
    },

    eliminarproveedores: function(){

        var view = this.getProveedorprincipal()
       
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit =   Ext.create('Infosys_web.view.proveedores.Eliminar').show();
            edit.down('#idproveedorID').setValue(row.data.id);
           
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
        
    },

    salirproveedores: function(){

       var view = this.getEliminarproveedores()
       view.close();

    },

    eliminar: function(){

        var view = this.getEliminarproveedores()
        var idproveedor = view.down('#idproveedorID').getValue()
        var st = this.getProveedoresStore();


        Ext.Ajax.request({
            url: preurl + 'proveedores/elimina',
            params: {

                idproveedor: idproveedor
                
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) {
                    view.close();
                    st.load(); 
                    Ext.Msg.alert('Datos Eliminados Exitosamente');
                    return; 
                                   

                 }else{

                    view.close();
                    st.load();
                    Ext.Msg.alert('Datos No Eliminados Proveedor con Movimientos');
                    return;
                     
                 };
        }
        });

        view.close();
        st.load();            
    },

    grabarsucursalesproveedores : function(){

        var viewIngresa = this.getSucursalesingresarproveedores();
        var idcliente = viewIngresa.down('#id_clienteID').getValue();
        var direccion = viewIngresa.down('#direccionId').getValue();
        var ciudad = viewIngresa.down('#tipoCiudadId').getValue();
        var comuna = viewIngresa.down('#tipoComunaId').getValue();
        var email = viewIngresa.down('#emailId').getValue();
        var contacto = viewIngresa.down('#contactoId').getValue();
        var fono = viewIngresa.down('#fonoId').getValue();

        Ext.Ajax.request({
            url: preurl + 'sucursales_clientes/save',
            params: {
                idcliente: idcliente,
                direccion: direccion,
                ciudad: ciudad,
                comuna: comuna,
                email: email,
                contacto: contacto,
                fono: fono
            },
            success: function(response){
                var text = response.responseText;
                Ext.Msg.alert('Informacion', 'Creada Exitosamente.');
                viewIngresa.close();
               
            }
        });

        var edit = this.getDesplegarsucursalesproveedores();
        edit.close();

       
    
    },

    agregaSucursalesproveedores : function(){

        var edit = Ext.create('Infosys_web.view.proveedores.IngresarSucursales').show();
        edit.close()
        var view = this.getDesplegarsucursalesproveedores();
        var idCliente = view.down('#id_clienteID').getValue();
        var viewedit = Ext.create('Infosys_web.view.proveedores.IngresarSucursales').show();
        viewedit.down("#id_clienteID").setValue(idCliente);

    },

    despliegasucursalesproveedores: function(){
        
        var view = this.getProveedorprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.proveedores.Desplieguesucursales').show();
            var nombre = (row.get('id'));
            var razon = (row.get('nombres'));
            edit.down("#id_clienteID").setValue(nombre);
            edit.down("#nombreId").setValue(razon);
            var st = this.getSucursales_clientesStore();
            st.proxy.extraParams = {nombre : nombre};
            st.load();      
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    grabarcontactos : function(){

        var viewIngresa = this.getContactoingresarproveedores();
        var idcliente = viewIngresa.down('#id_clienteID').getValue();
        var email = viewIngresa.down('#emailId').getValue();
        var nombre = viewIngresa.down('#nombreId').getValue();
        var fono = viewIngresa.down('#fonoId').getValue();

        Ext.Ajax.request({
            url: preurl + 'contacto_clientes/save',
            params: {
                idcliente: idcliente,
                email: email,
                nombre: nombre,
                fono: fono
            },
            success: function(response){
                var text = response.responseText;
                Ext.Msg.alert('Informacion', 'Creada Exitosamente.');
                viewIngresa.close();
               
            }
        });

        var edit = this.getDesplegarcontactos();
        edit.close();

       
    
    },

    agregaContacto : function(){

        var edit = Ext.create('Infosys_web.view.proveedores.IngresarContactos').show();
        edit.close()
        var view = this.getDesplegarcontactos();
        var idCliente = view.down('#id_clienteID').getValue();
        var viewedit = Ext.create('Infosys_web.view.proveedores.IngresarContactos').show();
        viewedit.down("#id_clienteID").setValue(idCliente);

    },

    despliegacontactos: function(){
        
        var view = this.getProveedorprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.proveedores.Desplieguecontactos').show();
            var nombre = (row.get('id'));
            var razon = (row.get('nombres'));
            edit.down("#id_clienteID").setValue(nombre);
            edit.down("#nombreId").setValue(razon);
            var st = this.getContacto_clientesStore();
            st.proxy.extraParams = {nombre : nombre};
            st.load();
           
                   
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    special: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.validarut()
        }
    },

    validarut: function(){

        var view =this.getProveedoringresar();
        var rut = view.down('#rutId').getValue();
        var rutdes = view.down('#rutId').getValue();
        var rutgraba = view.down('#rutId').getValue();
        var rutdef = view.down('#rutgrabaId').getValue();
        var numero = rut.length;
        var cero ="";

        if (numero == 10){
            var dig = (Ext.util.Format.substr(rut,8,1));
        };

        if (numero == 9){
            var dig = (Ext.util.Format.substr(rut,7,1));          

        };

        if (numero == 8){
            var dig = (Ext.util.Format.substr(rut,6,1));          

        };

        if (numero == 7){
            var dig = (Ext.util.Format.substr(rut,5,1));          

        };

        if (numero == 3){
            var dig = (Ext.util.Format.substr(rut,1,1));          

        };

        //console.log(dig);

        /*if (dig != "-"){

            Ext.Msg.alert('Rut Erroneo Ingrese Guion');
            view.down("#rutId").setValue(cero);
            return;           

        };*/
       
        Ext.Ajax.request({
            url: preurl + 'proveedores/validaRut?valida='+rut,
            params: {
                id: 1
            },
            
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
              
                if (resp.success == true) {
        
                    if(resp.proveedor){
                        var proveedor = resp.proveedor;
                        view.down("#id_proveedor").setValue(proveedor.id)
                        view.down("#nombre_id").setValue(proveedor.nombres)
                        view.down("#tipoCiudadId").setValue(proveedor.id_ciudad)
                        view.down("#tipoComunaId").setValue(proveedor.id_comuna)
                        view.down("#giroId").setValue(proveedor.id_giro)
                        view.down("#direccionId").setValue(proveedor.direccion)
                        view.down("#fonoId").setValue(proveedor.fono)
                        view.down("#e_mailId").setValue(proveedor.e_mail)
                        view.down("#tipoEstadoId").setValue(proveedor.estado)
                        //view.down("#fecha_incripcionId").setValue(proveedor.fecha_incripcion)
                        //view.down("#fecha_ult_actualizId").setValue(proveedor.fecha_ult_actualiz)
                        view.down("#rutId").setValue(rutdes)
                        view.down("#rutgrabaId").setValue(rutgraba)
                    }else{
                        view.down("#rutId").setValue(rutdes)
                        view.down("#rutgrabaId").setValue(rutgraba)
                        view.down("#nombre_id").focus()
                   }
                    
                }else{
                      Ext.Msg.alert('Informacion', 'Rut Incorrecto')
                      //view.down("#rutId").setValue(cero);
                      //view.down("#rutId").focus();
                      return false
                }

            }
              

        });       
      
    },


    exportarexcelproveedor: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getProveedorprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelProveedor?cols='+Ext.JSON.encode(jsonCol));

    },

    mproveedores: function(){
       
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'proveedorprincipal'});
    },


    buscarproveedor: function(){
        
        var view = this.getProveedorprincipal()
        var st = this.getProveedoresStore()
        var opcion = view.down('#tipoSeleccionId').getValue()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : opcion}
        st.load();

    },

    
    grabarproveedor: function(){

        var win    = this.getProveedoringresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        //var fecha1 = win.down('#fecha_incripcionId').getSubmitValue();
        var fecha2 = win.down('#fecha_ult_actualizId').getSubmitValue();
        var rutgraba = win.down('#rutgrabaId').getValue();
       
   
        if(!form.getForm().isValid()){
            Ext.Msg.alert('Informacion', 'Rellene todo los campos');
            return false
        }
        
        var st = this.getProveedoresStore();

        st.proxy.extraParams = {fecha2 : fecha2,
                                rutgraba: rutgraba}

        
        var nuevo = false;
        
        if (values.id > 0){

        var view = this.getProveedoringresar();
        var nombre = view.down('#nombre_id').getValue();
        var idcliente = view.down('#id_proveedor').getValue();
        var direccion = view.down('#direccionId').getValue();
        var ciudad = view.down('#tipoCiudadId').getValue();
        var comuna = view.down('#tipoComunaId').getValue();
        var giro = view.down('#giroId').getValue();
        var fono = view.down('#fonoId').getValue();
        var mail = view.down('#e_mailId').getValue();
        var fechaactualiza = view.down('#fecha_ult_actualizId').getValue();
        var estado = view.down('#tipoEstadoId').getValue();
        //var tipocliente = view.down('#tipoClienteId').getValue();        
        var st = this.getProveedoresStore();

         Ext.Ajax.request({
            url: preurl + 'proveedores/update',
            params: {               
                nombre: nombre,
                idcliente: idcliente,
                direccion: direccion,
                ciudad: ciudad,
                comuna: comuna,
                giro : giro,
                fono : fono,
                mail : mail,
                fechaactualiza : fechaactualiza,
                estado : estado
            },
            success: function(response){
            st.load();
            view.close();
            }
           
        });
        st.load();
            //record.set(values);
        }else{
            record = Ext.create('Infosys_web.model.Proveedor');
            record.set(values);
            st.add(record);
            nuevo = true;
        }
        
        win.close();
        st.load();
        st.sync({
            success: function(){
            st.load();
            }
        }

        );
    },

    grabareditarproveedor: function(){
        
        var view = this.getProveedordesplegar();
        var nombre = view.down('#nombre_id').getValue();
        var idcliente = view.down('#id_proveedor').getValue();
        var direccion = view.down('#direccionId').getValue();
        var ciudad = view.down('#tipoCiudadId').getValue();
        var comuna = view.down('#tipoComunaId').getValue();
        var giro = view.down('#giroId').getValue();
        var fono = view.down('#fonoId').getValue();
        var mail = view.down('#e_mailId').getValue();
        var fechaactualiza = view.down('#fecha_ult_actualizId').getValue();
        var estado = view.down('#tipoEstadoId').getValue();
        var tipocliente = view.down('#tipoClienteId').getValue();        
        var st = this.getProveedoresStore();

         Ext.Ajax.request({
            url: preurl + 'proveedores/update',
            params: {
               
                nombre: nombre,
                idcliente: idcliente,
                direccion: direccion,
                ciudad: ciudad,
                comuna: comuna,
                giro : giro,
                fono : fono,
                mail : mail,
                fechaactualiza : fechaactualiza,
                estado : estado,
                tipocliente : tipocliente
            },
            success: function(response){
            st.load();
            view.close();
            }
           
        });

        st.load();

    },

        
    editarproveedor: function(){
        
        var view = this.getProveedorprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.proveedores.Desplegar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    agregarproveedor: function(){
        Ext.create('Infosys_web.view.proveedores.Ingresar').show();
    },

    cerrarproveedor: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },
  
});










