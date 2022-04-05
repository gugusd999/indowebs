const db = function() {
	return {
	    urlsave : "https://indowebs.my.id/admin/api/save",
	    urlget: 'https://indowebs.my.id/onedu/',
	    getnew: "https://s-feed.com/simanis/api/regist",
	    token: "https://s-feed.com/simanis/api/getToken",
	    masterlink: "?key=master-api&value=",
	    data: {
	        regist: false,
	        table: "",
	        limit: "",
	        order: "",
	        select: " * ",
	        condition: "",
	        setCreate: 0,
	        leftJoin: "",
	        saveset: 0,
	        updatedata: null,
	        obj: null
	    },
	    table: function(a){
	      this.data.table = a;
	      return this;
	    },
	    regist: function(){
	    	this.data.regist = true;
	    	return this;
	    },
	    condition : function(a = []){
	       var sp = " WHERE ";
	       sp += a.map(function(x,i){
	           return ` ${x.opsi} ${x.data[0]} ${x.data[1]} ${x.data[2]} `;
	       }).join(" ")
	       this.data.condition = sp;
	       return this;
	    },
	    like : function(a = []){
	       var sp = " ";
	    	if (this.data.condition != "") {
	    		sp = "";
	    	}else{
	    		sp = " WHERE ";
	    	}
	       sp += a.map(function(x,i){
	           return ` ${x.opsi} ${x.data[0]} ${x.data[1]} ${x.data[2]} `;
	       }).join(" ")
	       if (this.data.condition != "") {
	       	this.data.condition += ' AND ('+sp+')';
	       }else{
	       	this.data.condition += sp;
	       }
	       return this;
	    },
	    select: function(a){
	       this.data.select = a;
	       return this;
	    },
		delete: function() {
			var up = " DELETE FROM "+this.data.table+" ";
	        up += this.data.condition;
			this.data.updatedata = up;
	        return this;
		},
	    update: function(a = {}){
			function escapeHtml(text) {
				return text
					.replace(/&/g, "&amp;")
					.replace(/</g, "&lt;")
					.replace(/>/g, "&gt;")
					.replace(/'/g, "&#039;");
			  }
	        var up = " UPDATE "+this.data.table+" SET ";
	        up += Object.keys(a).map(function(x, s){
	          return ` ${x} = '${a[x]}' `;
	        }).join(",")
	        up += this.data.condition;
	        this.data.updatedata = up;
	        return this;
	    },
	    leftJoin: function(a = []){
	        this.data.leftJoin = '';
	        var pp = this;
	        a.forEach(function(y,i){
	            pp.data.leftJoin += " LEFT JOIN "+y[0]+" ON "+y[1]+" "+y[2]+" "+y[3]+" ";
	        })
	        return this;
	    },
	    order: function(a,b = "DESC"){
	       this.data.order = ` ORDER BY ${a} ${b} `;
	       return this;
	    },
	    limit: function(a, b){
	       this.data.limit = ` LIMIT ${a}, ${b}  `;
	       return this;
	    },
	    save: function(obj = {}){

			function escapeHtml(text) {
				return text
				.replace(/&/g, "&amp;")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;")
				.replace(/'/g, "&#039;");
			}
	    	this.data.obj = obj;
	        var dat = Object.keys(obj);
	        var dd = dat.map(function(x,c){
	                return '\''+obj[x]+'\'';
	            }).join(",");

	        this.data.saveset = 1;
	        this.data.save = `INSERT INTO ${this.data.table} (${dat.join(",")}) VALUES (${dd}) `;
	        return this;
	    }
	    ,createTable: function(a = {}){
	        this.data.setCreate = 1;
	        this.data.createTable = "CREATE TABLE "+this.data.table+" (";
	        this.data.createTable += " id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, ";
	        var pp = this;
	        Object.keys(a).forEach(function(x, i){
	            if(i == (Object.keys(a).length - 1)){
	                pp.data.createTable += " "+x+" "+a[x]+" ";
	            }else{
	                pp.data.createTable += " "+x+" "+a[x]+" , ";
	            }
	        })
	        this.data.createTable += " ) ";
	        return this;
	    },
	    text2Binary : function( string) {
	        return string.split('').map(function (char) {
	            return char.charCodeAt(0).toString(2);
	        }).join('2');
	    },
	    nextIncrement : function(){
	    	this.data.nextIncrement = `SELECT auto_increment AS increment FROM INFORMATION_SCHEMA.TABLES WHERE table_name = '${this.data.table}'`;
	    	return this;
	    },
	    master: function(data, func){
	    	var loco = this;
	    	xdb('epost',['dataMaster'] ,7, function(s){
	        	s.read('dataMaster', 'master', function(s){
	        		if (s != null) {
				    	$.ajax({
				            url: loco.masterlink+'/'+loco.text2Binary(JSON.stringify(data)),
				            success:function(res){
				            		res = JSON.parse(res)
	        			            globalThis.dataMaster = res;
	        			            setTimeout(function(){
            	        				func()
            	        			})
					            	xdb('epostadmin',['dataMaster'] ,7, function(s){
							        	s.add('dataMaster',{id: 'master', data: res})
							        });

				            },
				            error: function (xhr, ajaxOptions, thrownError) {
				                console.log(xhr.status);
				                console.log(thrownError);
				            }
				        })
	        		}else{
				    	$.ajax({
				            url: loco.masterlink+'/'+loco.text2Binary(JSON.stringify(data)),
				            success:function(res){
				                console.log(res)
				            		res = JSON.parse(res)
				            		globalThis.dataMaster = res;
				            		func()
					            	xdb('epostadmin',['dataMaster'] ,7, function(s){
							        	s.add('dataMaster',{id: 'master', data: res})
							        });

				            },
				            error: function (xhr, ajaxOptions, thrownError) {
				                console.log(xhr.status);
				                console.log(thrownError);
				            }
				        })
	        		}
	        	})
	        });

	    }
	    ,getToken: function(a){
	    	$.ajax({
	            url: this.token+'/'+this.text2Binary(JSON.stringify(a)),
	            success:function(res){
	            	if(res.includes('nodata')){
	            		alert('maaf user tidak terdaftar')
	            	}else{
	            		res = JSON.parse(res);
	            		localStorage.setItem('loginCond', res.token);
	            		location.href = "#/";
	            	}
	            },
	            error: function (xhr, ajaxOptions, thrownError) {
	                console.log(xhr.status);
	                console.log(thrownError);
	            }
	        })
	        return this;
	    },
	    get: function(func, qr = null){

	        var ck = this;
	        var query = "";
	        query = ` SELECT ${this.data.select} FROM ${this.data.table} ${this.data.leftJoin} ${this.data.condition} ${this.data.order} ${this.data.limit} `;
	        //alert(query);
	        if(qr != null){
	            query = qr.replace(/\n/g, ' ');
	        }
	        if(this.data.setCreate == 1){
	            query = this.data.createTable;
	        }
	        if(this.data.saveset == 1){
	            query = this.data.save;
	        }

	        if(this.data.updatedata != null){
	          query = this.data.updatedata;
	        }

	        if(this.data.nextIncrement != null){
	          query = this.data.nextIncrement;
	        }

            query = query.replace(/\(/g,'_<<_');
            query = query.replace(/\)/g,'_>>_');
            query = query.replace(/\*/g,'_<->_');
            query = query.replace(/\'/g, "_<|_");
            query = query.replace(/\"/g, "_|>_");
            query = query.replace(/\\/g, "_|>_");
            query = query.replace(/\//g, "_||_");
            query = query.replace(/\%/g, "|~~|");
            query = query.replace(/ca/g, "~|ca|~");
            query = query.replace(/CA/g, "~|CA|~");
            query = encodeURIComponent(query);


	        	if (query.indexOf("SELECT") != -1) {

	        	    //onsole.log('pre')
	        	    fetch(this.urlget+'?key=api&value='+query+'&token='+localStorage.getItem('loginCond'))
                    .then(response => response.json())
                    .then(res => {
                        func(res.data, res.count, ck)
                    })

	        	}else{
			        $.ajax({
			            url: this.urlget+'?key=api',
			            method: 'POST',
			            data: {
			            	_token: $('meta[name=csrf-token]').attr('content'),
			            	table: this.data.table,
			            	token: query+'/'+localStorage.getItem('loginCond')
			            },
			            success:function(res){
			            	if(res.includes('simpan')){
			            		func('disimpan', ck)
			            	}else{
			            		res = JSON.parse(res)
			                	func(res.data, res.count, ck)
			            	}
			            },
			            error: function (xhr, ajaxOptions, thrownError) {
			                console.log(xhr.status);
			                console.log(thrownError);
			            }
			        })
	        	}

		        return this;
	    }
	 }
	}

const query = function(a, func) {
    db().get(func, a);
  }
  
globalThis.schema = function(table = 'table')
{
    return {
        temp: `
     SELECT
  	  ${table}
     FROM
  	 INFORMATION_SCHEMA.TABLES
        `
    ,
    make: function(){
        return this.temp.replace(/\n/g, ' ');
    }
    }
}

var t = schema("table").make()

console.log(t)