const upload = function(url = '/admin/upload', path = '', name = 'data.post' ,data = null, funcpro, funcres){
     var rendr = data;
     rendr = rendr.match(/.{1,150000}/g);
     var length = rendr.length;
     var start = 0;
     var itm = Date.now();
     function uploadProsses(){
          if (start < length) {
              funcpro(Math.round(((start+1) / length) * 100)+'%');
              $.ajax({
                  url: url,
                  method: 'POST',
                  dataType: 'text',
                  data: {
                      ok: rendr[start],
                      start: start,
                      path: path,
                      tipe: 'upload',
                      enm: itm
                  },
                  success: function(e){
                      start += 1;
                      uploadProsses();
                  }
              })
          }else{
              $.ajax({
                  url: url,
                  method: 'POST',
                  dataType: 'text',
                  data: {
                      _token: $('meta[name=csrf-token]').attr('content'),
                      path: path,
                      tipe: path+name,
                      enm: itm
                  },
                  success: function(e){
                     funcres(e);
                  }
              })
          }
     }
     uploadProsses()
}

const text2Binary = function( string) {
    string = JSON.stringify(string);
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2);
    }).join('2');
}

const binary2text = function(str = null)
{
    var array = str.split("2");
    var pop = array.map(code => String.fromCharCode(parseInt(code, 2))).join("");
    return JSON.parse(pop);
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

const db = function() {
	return {
	    urlsave : "https://indowebs.my.id/admin/api/save",
	    urlget: urlapp,
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

	        	if (query.indexOf("SELECT") != -1) {

                upload('?key=uploadapi', '', 'qr.data', btoa(query), (a)=>{}, (b)=>{
                  var res = JSON.parse(b);
                  func(res.data, res.count, ck)
                });

	        	}else{
              upload('?key=uploadapi', '', 'qr.data', btoa(query), (a)=>{}, (b)=>{
                var res = b;
                if(res.includes('simpan')){
                  func('disimpan', ck)
                }else{
                  res = JSON.parse(res)
                    func(res.data, res.count, ck)
                }
              });
	        	}
		        return this;
	    }
	 }
	}

  const query = function(a, func) {
    db().get(func, a);
  }
