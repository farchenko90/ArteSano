var arrayPermiso = [];
var strModulo = "";
var session = {

	setUsuario: function(user){      
       sessionStorage.setItem("usuario",user);       
    },

    
    /// Obtiene todos los Datos del Usuario
    getUsuario: function(){      
        return this.validarObjectLocal("usuario")? JSON.parse(sessionStorage.getItem("usuario")) :  null;       
    },

    // Llenar Array con los permisos del Usuario
    getPermisos:function (){       
        var obj = JSON.parse(sessionStorage.getItem("usuario"));        
        if (obj){            
            arrayPermiso= obj[0].permisos.split(",");
        } else{
           location.href = "http://www.artesanocafe.com";
        }             
    }, 

    getModulos:function (){        
        var obj = JSON.parse(sessionStorage.getItem("usuario"));        
        if (obj){            
            strModulo= obj[0].modulo;
        }
    },

    getPermiso:function (){        
        var obj = JSON.parse(sessionStorage.getItem("usuario"));        
        if (obj){            
            strModulo= obj[0].permisos;
        }
    },

    getId: function(){
        var obj = JSON.parse(sessionStorage.getItem("usuario"));
        if (obj){            
            return obj[0].id;
        }
    },
    
    validarObjectLocal: function(string){        
        return sessionStorage.getItem(string) !== "" && sessionStorage.getItem(string) !== undefined && sessionStorage.getItem(string) !== null;        
    },

    cerrarSesion: function(){
        sessionStorage.setItem("usuario","");
        sessionStorage.removeItem("usuario");        
        location.href = "http://www.artesanocafe.com";
    }, 

    
    //obtenemos el nombre de usuario
    getUser:function(){
        var obj = JSON.parse(sessionStorage.getItem("usuario"));
        if (obj){            
            return obj[0].tipouser;
        }
    }, 

    //obtenemos el nombre y apellido del usuario
    getNomape:function(){
    	var obj = JSON.parse(sessionStorage.getItem("usuario"));
    	if (obj){            
            return obj[0].nombre_apellido;
        }
    },

    getTipo:function(){
        var obj = JSON.parse(sessionStorage.getItem("usuario"));
        if (obj){            
            return obj[0].tipo;
        }
    },

    getIdperfil:function(){
        var obj = JSON.parse(sessionStorage.getItem("usuario"));
        if (obj){            
            return obj[0].idperfil;
        }
    },

    getTipouser:function(){
        var obj = JSON.parse(sessionStorage.getItem("usuario"));
        if (obj){            
            return obj[0].tipouser;
        }
    },

    getCelular:function(){
        var obj = JSON.parse(sessionStorage.getItem("usuario"));
        if (obj){            
            return obj[0].celular;
        }
    },

    getDireccion:function(){
        var obj = JSON.parse(sessionStorage.getItem("usuario"));
        if (obj){            
            return obj[0].direccion;
        }
    },

    getCorreo:function(){
        var obj = JSON.parse(sessionStorage.getItem("usuario"));
        if (obj){            
            return obj[0].correo;
        }
    },

    getRuta:function(){
        var obj = JSON.parse(sessionStorage.getItem("usuario"));
        if (obj){            
            return obj[0].ruta;
        }
    }

}